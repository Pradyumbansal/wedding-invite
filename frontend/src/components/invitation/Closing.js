import { Reveal } from "./Reveal";
import { INVITATION } from "@/config/invitation";

export default function Closing() {
  const { couple, invocation, images } = INVITATION;

  return (
    <section
      data-testid="closing-section"
      className="relative overflow-hidden px-6 pb-64 pt-24 text-center sm:pb-80"
    >
      <Reveal>
        <p className="font-label text-[10px] text-[#B8860B] sm:text-xs">{invocation}</p>
        <h2 className="font-display mx-auto mt-8 max-w-xl text-2xl leading-snug text-[#1B3B2B] sm:text-4xl">
          We await your gracious presence
          <br />
          and your blessings
        </h2>
        <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-12 bg-[#D4AF37]/60" />
          <span className="text-sm text-[#B8860B]">&#x0950;</span>
          <span className="h-px w-12 bg-[#D4AF37]/60" />
        </div>
        <p className="font-label mt-10 text-[10px] text-[#525252]">WITH LOVE,</p>
        <p className="font-name mt-3 text-2xl tracking-[0.22em] text-[#B91C1C] sm:text-4xl">
          {couple.bride} <span className="font-display italic tracking-normal text-[#B8860B]">&amp;</span>{" "}
          {couple.groom}
        </p>
        <p className="font-label mt-8 text-[9px] text-[#525252]/70">
          25 . 10 . 2026 &nbsp;&middot;&nbsp; AGRA
        </p>
      </Reveal>

      <img
        src={images.closing}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none object-cover object-bottom opacity-95 [mask-image:linear-gradient(to_top,black_55%,transparent_98%)]"
      />
    </section>
  );
}
