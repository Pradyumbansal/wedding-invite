import { useCallback, useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { INVITATION } from "@/config/invitation";

const SCALE = [293.66, 329.63, 369.99, 415.3, 440, 493.88, 554.37];

function createAmbience() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.14;
  master.connect(ctx.destination);

  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = "lowpass";
  droneFilter.frequency.value = 320;
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.4;
  [73.42, 110.0, 146.83].forEach((f) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.connect(droneFilter);
    o.start();
  });
  droneFilter.connect(droneGain);
  droneGain.connect(master);

  let step = 3;
  const playNote = () => {
    if (ctx.state === "closed") return;
    step += [-2, -1, -1, 0, 1, 1, 2][Math.floor(Math.random() * 7)];
    step = Math.max(0, Math.min(SCALE.length - 1, step));
    const t = ctx.currentTime;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.45);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = SCALE[step];
    const vib = ctx.createOscillator();
    vib.frequency.value = 4.2;
    const vg = ctx.createGain();
    vg.gain.value = 3;
    vib.connect(vg);
    vg.connect(o.frequency);
    o.connect(g);
    g.connect(master);
    o.start(t);
    vib.start(t);
    o.stop(t + 2.8);
    vib.stop(t + 2.8);
  };

  const timer = setInterval(playNote, 2600);
  playNote();

  return {
    ctx,
    stop() {
      clearInterval(timer);
      ctx.close();
    },
  };
}

// Browsers refuse to start audio until the visitor interacts with the page,
// so a blocked autoplay attempt is retried on the first of these events.
const GESTURES = ["pointerdown", "touchend", "keydown", "click"];

export default function MusicToggle() {
  const { src, startAt = 0, autoplay = false, volume = 0.45 } = INVITATION.music;
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(autoplay);
  const synthRef = useRef(null);
  const audioRef = useRef(null);
  const fallbackToSynth = useRef(!src);
  const playbackGeneration = useRef(0);
  const autoplayPending = useRef(autoplay);

  const handlePlaybackError = useCallback((error) => {
    setPlaying(false);
    if (error.name === "NotAllowedError") {
      setWaiting(true);
      return;
    }
    setWaiting(false);
    console.error("Unable to start invitation music", error);
    toast.error("Music could not start. Please tap the music button to try again.");
  }, []);

  // Seek to startAt, or to 0 if the track is shorter than that offset.
  const seekToStart = useCallback(
    (a) => {
      const target = Number.isFinite(a.duration) && a.duration > startAt ? startAt : 0;
      try {
        a.currentTime = target;
      } catch {
        /* metadata not loaded yet — the loadedmetadata handler retries */
      }
    },
    [startAt]
  );

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const a = new Audio(src);
    a.preload = "auto";
    a.loop = false; // manual loop, so playback restarts at startAt rather than 0
    a.volume = volume;
    a.addEventListener("loadedmetadata", () => seekToStart(a));
    a.addEventListener("ended", () => {
      seekToStart(a);
      a.play().catch(() => {});
    });
    a.addEventListener("error", () => {
      fallbackToSynth.current = true;
    });
    audioRef.current = a;
    return a;
  }, [src, volume, seekToStart]);

  const startPlayback = useCallback(async () => {
    const generation = playbackGeneration.current;
    if (src && !fallbackToSynth.current) {
      const a = ensureAudio();
      if (a.readyState > 0) seekToStart(a);
      await a.play(); // rejects when the browser blocks un-gestured audio
      if (generation !== playbackGeneration.current) return;
      autoplayPending.current = false;
      setWaiting(false);
      setPlaying(true);
      return;
    }
    const inst = synthRef.current ?? createAmbience();
    synthRef.current = inst;
    if (inst.ctx.state === "suspended") await inst.ctx.resume();
    if (generation !== playbackGeneration.current) return;
    if (inst.ctx.state !== "running") throw new Error("audio blocked");
    autoplayPending.current = false;
    setWaiting(false);
    setPlaying(true);
  }, [src, ensureAudio, seekToStart]);

  const stopPlayback = useCallback(() => {
    playbackGeneration.current += 1;
    autoplayPending.current = false;
    if (audioRef.current) audioRef.current.pause();
    if (synthRef.current) {
      synthRef.current.stop();
      synthRef.current = null;
    }
    setPlaying(false);
    setWaiting(false);
  }, []);

  useEffect(() => {
    if (!autoplay) return undefined;
    let cancelled = false;
    autoplayPending.current = true;
    const attemptPlayback = () => {
      const generation = playbackGeneration.current;
      startPlayback().catch((error) => {
        if (!cancelled && generation === playbackGeneration.current) {
          handlePlaybackError(error);
        }
      });
    };
    const onGesture = (event) => {
      if (!autoplayPending.current) return;
      if (event.target instanceof Element &&
          event.target.closest('[data-testid="music-toggle-button"]')) return;
      attemptPlayback();
    };
    const detach = () => GESTURES.forEach((e) => window.removeEventListener(e, onGesture));

    // resume() can stay pending until a gesture rather than rejecting autoplay.
    GESTURES.forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true })
    );
    attemptPlayback();

    return () => {
      cancelled = true;
      detach();
    };
  }, [autoplay, startPlayback, handlePlaybackError]);

  useEffect(
    () => () => {
      playbackGeneration.current += 1;
      if (synthRef.current) {
        synthRef.current.stop();
        synthRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    },
    []
  );

  const toggle = () => {
    if (playing) stopPlayback();
    else {
      const generation = playbackGeneration.current;
      startPlayback().catch((error) => {
        if (generation === playbackGeneration.current) handlePlaybackError(error);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      data-testid="music-toggle-button"
      aria-pressed={playing}
      aria-label={playing ? "Turn music off" : "Turn music on"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-[#D4AF37]/60 bg-[#FDFBF7]/90 px-4 py-2.5 shadow-[0_8px_20px_rgba(27,59,43,0.15)] backdrop-blur transition-colors duration-300 hover:border-[#B8860B]"
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
          <span className="eq-bar" style={{ animationDelay: "0s" }} />
          <span className="eq-bar" style={{ animationDelay: "0.25s" }} />
          <span className="eq-bar" style={{ animationDelay: "0.5s" }} />
        </span>
      ) : (
        <VolumeX size={15} className="text-[#B8860B]" aria-hidden="true" />
      )}
      <span className="font-label text-[9px] text-[#1B3B2B]">
        {playing ? "PLAYING" : waiting ? "TAP FOR MUSIC" : "MUSIC"}
      </span>
      <Music size={13} className="text-[#B8860B]" aria-hidden="true" />
    </button>
  );
}
