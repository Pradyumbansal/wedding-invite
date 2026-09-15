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
            sub="A gentle style guide, never a dress code — wear what makes you feel celebratory."
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
                <p className="font-label mt-6 text-center text-[9px] text-[#D4AF37]">{w.tag}</p>
                <h3 className="font-name mt-2 text-center text-sm tracking-[0.14em] text-[#1B3B2B] sm:text-base">
                  {w.event}
                </h3>
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
                <p className="font-display mt-4 px-1 pb-2 text-center text-base italic leading-relaxed text-[#525252]">
                  {w.suggestion}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
