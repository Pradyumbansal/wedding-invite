import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { INVITATION } from "@/config/invitation";

export default function Story() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section data-testid="story-section" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <SectionHead
            eyebrow="OUR STORY"
            title="Two Journeys, One Beautiful Beginning"
            sub="Swipe through the chapters — each an illustrated page from our story."
          />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="relative mx-auto max-w-5xl px-10 sm:px-14">
          <div className="overflow-hidden" ref={emblaRef} data-testid="story-carousel">
            <div className="flex">
              {INVITATION.story.map((card) => (
                <div
                  key={card.num}
                  className="min-w-0 flex-[0_0_88%] px-2 sm:flex-[0_0_58%] sm:px-3 lg:flex-[0_0_44%]"
                >
                  <div className="gold-frame flex h-full flex-col bg-[#FDFBF7] p-4 sm:p-5">
                    <div className="overflow-hidden border border-[#D4AF37]/35">
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <p className="font-label mt-6 text-center text-[10px] text-[#D4AF37]">{card.num}</p>
                    <h3 className="font-name mt-2 text-center text-lg tracking-[0.18em] text-[#1B3B2B] sm:text-xl">
                      {card.title}
                    </h3>
                    <p className="font-display mt-3 px-2 pb-3 text-center text-base italic leading-relaxed text-[#525252]">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            data-testid="story-prev-button"
            aria-label="Previous story"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#FDFBF7]/90 text-[#1B3B2B] shadow-sm transition-colors duration-300 hover:bg-[#1B3B2B] hover:text-[#FAF6F0]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            data-testid="story-next-button"
            aria-label="Next story"
            onClick={() => emblaApi && emblaApi.scrollNext()}
            className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#FDFBF7]/90 text-[#1B3B2B] shadow-sm transition-colors duration-300 hover:bg-[#1B3B2B] hover:text-[#FAF6F0]"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          {INVITATION.story.map((card, i) => (
            <button
              key={card.num}
              type="button"
              data-testid={`story-dot-${i}`}
              aria-label={`Go to story ${card.num}`}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === selected ? "w-7 bg-[#B8860B]" : "w-1.5 bg-[#D4AF37]/40 hover:bg-[#D4AF37]"
              }`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
