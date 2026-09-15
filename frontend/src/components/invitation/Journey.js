import { Reveal, SectionHead } from "./Reveal";
import { INVITATION } from "@/config/invitation";

export default function Journey() {
  return (
    <section data-testid="journey-section" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHead
            eyebrow="THE CELEBRATIONS"
            title="The Wedding Journey"
            sub="Three celebrations. One beautiful beginning."
          />
        </Reveal>

        <div className="relative">
          <div
            className="absolute bottom-2 left-[13px] top-2 w-px bg-[#D4AF37]/45 md:left-1/2"
            aria-hidden="true"
          />
          {INVITATION.events.map((ev, i) => (
            <Reveal key={ev.id} className="relative mb-16 last:mb-0 md:grid md:grid-cols-2 md:gap-16">
              <span
                className="absolute left-[13px] top-3 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[#B8860B] ring-4 ring-[#FAF6F0] md:left-1/2"
                aria-hidden="true"
              />
              <div className={`pl-12 md:pl-0 ${i % 2 === 1 ? "md:col-start-2" : ""}`}>
                <div
                  className={`gold-frame bg-[#FDFBF7] p-5 sm:p-7 ${
                    i % 2 === 0 ? "md:text-right" : ""
                  }`}
                  data-testid={`event-card-${ev.id}`}
                >
                  <div className="overflow-hidden border border-[#D4AF37]/35">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </div>
                  <p className="font-label mt-6 text-[10px] text-[#D4AF37]">EVENT {ev.num}</p>
                  <p className="font-label mt-3 text-[10px] text-[#525252]">
                    {ev.day} &nbsp;|&nbsp; {ev.date}
                  </p>
                  <p className="font-display mt-1 text-2xl text-[#B91C1C] sm:text-3xl">{ev.time}</p>
                  <h3 className="font-name mt-3 text-lg tracking-[0.14em] text-[#1B3B2B] sm:text-xl">
                    {ev.title}
                  </h3>
                  <p className="font-display mt-3 text-base italic leading-snug text-[#525252]">
                    {ev.venue[0]}
                    <br />
                    {ev.venue[1]}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
