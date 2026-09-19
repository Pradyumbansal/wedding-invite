import { Reveal, SectionHead } from "./Reveal";
import { INVITATION } from "@/config/invitation";

export default function InvitationCard() {
  const { couple, images } = INVITATION;

  return (
    <section id="invitation" data-testid="invitation-section" className="relative overflow-hidden px-4 py-24 sm:py-32">
      <img
        src={images.invitationBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-bottom opacity-[0.85]"
      />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <SectionHead eyebrow="THE INVITATION" title="With Joy in Our Hearts" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="gold-frame gold-speckle relative bg-[#FAF6F0]/25 px-6 py-12 text-center backdrop-blur-[1px] sm:px-14 sm:py-16">
            <span className="pointer-events-none absolute left-3 top-3 text-lg text-[#B8860B]/60" aria-hidden="true">&#x0950;</span>
            <span className="pointer-events-none absolute bottom-3 right-3 text-lg text-[#B8860B]/60" aria-hidden="true">&#x0950;</span>

            <p className="font-display text-xl font-medium leading-relaxed text-[#404040] sm:text-2xl sm:leading-relaxed">
              {couple.hosts} request your presence on the auspicious occasion of the
              marriage of their Son
            </p>
            <p className="font-name mt-7 text-2xl tracking-[0.22em] text-[#1B3B2B] sm:text-3xl">
              {couple.groom}
            </p>
            <p className="font-display mt-2 text-base italic text-[#525252] sm:text-lg">
              (S/o {couple.groomParents})
            </p>
            <p className="font-display my-4 text-xl italic text-[#B8860B]">with</p>
            <p className="font-name text-2xl tracking-[0.22em] text-[#B91C1C] sm:text-3xl">
              {couple.bride}
            </p>
            <p className="font-display mt-2 text-base italic text-[#525252] sm:text-lg">
              (D/o {couple.brideParents})
            </p>

            <div className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-[#D4AF37]/50" />
              <span className="text-xs tracking-[0.3em] text-[#B8860B]">&#x2766;</span>
              <span className="h-px flex-1 bg-[#D4AF37]/50" />
            </div>
            <p className="font-label mt-6 text-[10px] text-[#1A1A1A] sm:text-xs">
              YOU ARE CORDIALLY INVITED
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
