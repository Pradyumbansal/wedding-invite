import { useEffect, useState } from "react";
import { Reveal, SectionHead } from "./Reveal";
import { INVITATION } from "@/config/invitation";

const TARGET = new Date(INVITATION.wedding.countdownTarget).getTime();

const units = (diff) => [
  { label: "DAYS", value: Math.floor(diff / 86400000), id: "days" },
  { label: "HOURS", value: Math.floor(diff / 3600000) % 24, id: "hours" },
  { label: "MINUTES", value: Math.floor(diff / 60000) % 60, id: "minutes" },
  { label: "SECONDS", value: Math.floor(diff / 1000) % 60, id: "seconds" },
];

export default function Countdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, TARGET - now);

  return (
    <section data-testid="countdown-section" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionHead eyebrow="THE COUNTDOWN" title="Until We Say I Do" sub={INVITATION.wedding.full} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {units(diff).map((u) => (
              <div key={u.id} className="gold-frame bg-[#FDFBF7] px-2 py-8 sm:py-10">
                <p
                  data-testid={`countdown-${u.id}-value`}
                  className="font-display text-5xl font-medium text-[#1B3B2B] sm:text-6xl lg:text-7xl"
                >
                  {String(u.value).padStart(2, "0")}
                </p>
                <p className="font-label mt-3 text-[9px] text-[#B8860B] sm:text-[10px]">{u.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-display mt-10 text-lg italic text-[#525252] sm:text-xl">
            {INVITATION.venue.name}, {INVITATION.venue.address}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
