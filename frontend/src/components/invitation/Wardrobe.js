import { Reveal, SectionHead } from "./Reveal";
import { INVITATION } from "@/config/invitation";

export default function Wardrobe() {
  return (
    <section data-testid="wardrobe-section" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHead
            eyebrow="WHAT TO WEAR"
            title="Dress for the Celebration"
            sub="Themes, timings and colours for each celebration — a little wardrobe planner to help you pack."
          />
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {INVITATION.wardrobe.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.12}>
              <div className="gold-frame flex h-full flex-col bg-[#FDFBF7] p-4" data-testid={`wardrobe-card-${w.id}`}>
                <div className="overflow-hidden border border-[#D4AF37]/35">
                  <img
                    src={w.image}
                    alt={w.event}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <p className="font-label mt-6 text-center text-[9px] text-[#D4AF37]">{w.date}</p>
                <h3 className="font-name mt-2 text-center text-sm tracking-[0.14em] text-[#1B3B2B] sm:text-base">
                  {w.event}
                </h3>
                <p className="font-display mt-2 text-center text-base text-[#525252]">
                  {w.time} <span className="text-[#D4AF37]">|</span> {w.theme}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {w.palette.map((c) => (
                    <span
                      key={c}
                      className="h-5 w-5 rounded-full border border-[#262626]/15"
                      style={{ backgroundColor: c }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="font-label mt-auto pt-4 pb-2 text-center text-[10px] leading-relaxed text-[#B8860B]">
                  | {w.dressCode} |
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
