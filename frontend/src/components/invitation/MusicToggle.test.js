import React, { act } from "react";
import { createRoot } from "react-dom/client";
import MusicToggle from "./MusicToggle";
import { INVITATION } from "@/config/invitation";

jest.mock("@/config/invitation", () => ({
  INVITATION: { music: { src: null, autoplay: true } },
}));
jest.mock("sonner", () => ({ toast: { error: jest.fn() } }));

let container;
let root;
let contexts;
let allowAudio;
const originalAudioContext = window.AudioContext;
const originalAudio = window.Audio;

function createNode() {
  return {
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    frequency: { value: 0 },
    gain: {
      value: 0,
      setValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn(),
    },
  };
}

beforeEach(() => {
  jest.useFakeTimers();
  global.IS_REACT_ACT_ENVIRONMENT = true;
  contexts = [];
  allowAudio = false;
  INVITATION.music = { src: null, autoplay: true };
  window.AudioContext = jest.fn(() => {
    const pending = [];
    const ctx = {
      state: "suspended",
      currentTime: 0,
      destination: {},
      createGain: createNode,
      createOscillator: createNode,
      createBiquadFilter: createNode,
      resume: jest.fn(() => {
        if (allowAudio) {
          ctx.state = "running";
          pending.splice(0).forEach((resolve) => resolve());
          return Promise.resolve();
        }
        return new Promise((resolve) => pending.push(resolve));
      }),
      close: jest.fn(() => {
        ctx.state = "closed";
        return Promise.resolve();
      }),
    };
    contexts.push(ctx);
    return ctx;
  });
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  window.AudioContext = originalAudioContext;
  window.Audio = originalAudio;
  jest.useRealTimers();
  delete global.IS_REACT_ACT_ENVIRONMENT;
});

async function click(target = document.body) {
  await act(async () => {
    target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

test("starts on the first click even when autoplay resume stays pending", async () => {
  await act(async () => root.render(<MusicToggle />));
  expect(container.textContent).toContain("TAP FOR MUSIC");
  allowAudio = true;
  await click();
  expect(contexts[0].resume).toHaveBeenCalledTimes(2);
  expect(container.querySelector("button").getAttribute("aria-pressed")).toBe("true");
});

test("starts automatically when the browser permits audio", async () => {
  allowAudio = true;
  await act(async () => root.render(<MusicToggle />));
  expect(container.textContent).toContain("PLAYING");
});

test("keeps listening after a gesture is blocked by the browser", async () => {
  await act(async () => root.render(<MusicToggle />));
  contexts[0].resume.mockRejectedValueOnce(
    new DOMException("A user gesture is required", "NotAllowedError")
  );
  await click();
  expect(container.textContent).toContain("TAP FOR MUSIC");
  allowAudio = true;
  await click();
  expect(container.textContent).toContain("PLAYING");
});

test("scrolling does not consume the gesture needed to start music", async () => {
  await act(async () => root.render(<MusicToggle />));
  await act(async () => window.dispatchEvent(new Event("scroll")));
  expect(contexts[0].resume).toHaveBeenCalledTimes(1);
  allowAudio = true;
  await click();
  expect(container.textContent).toContain("PLAYING");
});

test("the music button starts playback and keeps music off after it is toggled off", async () => {
  await act(async () => root.render(<MusicToggle />));
  allowAudio = true;
  const button = container.querySelector("button");
  await click(button);
  expect(button.getAttribute("aria-pressed")).toBe("true");
  await click(button);
  await click();
  expect(button.getAttribute("aria-pressed")).toBe("false");
  expect(contexts).toHaveLength(1);
  expect(contexts[0].close).toHaveBeenCalledTimes(1);
});

test("StrictMode recreates audio instead of reusing the closed context", async () => {
  await act(async () => root.render(
    <React.StrictMode><MusicToggle /></React.StrictMode>
  ));
  expect(contexts).toHaveLength(2);
  expect(contexts[0].state).toBe("closed");
  allowAudio = true;
  await click();
  expect(contexts[1].state).toBe("running");
  expect(container.textContent).toContain("PLAYING");
});

test("plays the supplied song from 3:30 and loops back to that offset", async () => {
  INVITATION.music = {
    src: "/audio/tamil-wedding.mp3",
    startAt: 210,
    autoplay: true,
    volume: 0.45,
  };
  const audio = new EventTarget();
  Object.assign(audio, {
    duration: 380.712,
    readyState: 1,
    currentTime: 0,
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
  });
  window.Audio = jest.fn(() => audio);

  await act(async () => root.render(<MusicToggle />));
  expect(window.Audio).toHaveBeenCalledWith("/audio/tamil-wedding.mp3");
  expect(audio.currentTime).toBe(210);
  expect(audio.volume).toBe(0.45);
  expect(audio.loop).toBe(false);
  expect(contexts).toHaveLength(0);
  expect(container.textContent).toContain("PLAYING");

  audio.currentTime = audio.duration;
  await act(async () => audio.dispatchEvent(new Event("ended")));
  expect(audio.currentTime).toBe(210);
  expect(audio.play).toHaveBeenCalledTimes(2);
  await click(container.querySelector("button"));
  expect(audio.pause).toHaveBeenCalledTimes(1);
  expect(container.querySelector("button").getAttribute("aria-pressed")).toBe("false");
});
