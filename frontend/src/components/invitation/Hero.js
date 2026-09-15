import { motion } from "framer-motion";
import { INVITATION } from "@/config/invitation";

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const { couple, wedding, venue, invocation, images } = INVITATION;

  return (
    <section
      data-testid="hero-section"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-20 text-center"
    >
      <img
        src={images.heroFrame}
        alt=""
        aria-hidden="true"
        className="animate-sway pointer-events-none absolute inset-x-0 top-0 w-full select-none object-cover object-top opacity-95 [mask-image:linear-gradient(to_bottom,black_45%,transparent_96%)]"
      />

      <motion.p
        {...rise(0.15)}
        className="font-label text-[11px] text-[#B8860B] sm:text-xs"
        data-testid="hero-invocation"
      >
        {invocation}
      </motion.p>

      <motion.div {...rise(0.35)} className="relative mt-8 w-60 sm:w-80 lg:w-96">
        <div className="gold-frame bg-[#FDFBF7] p-2.5 sm:p-3">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={couple.photo}
              alt="Arushi and Piyush"
              data-testid="couple-photo"
              className="animate-slow-zoom h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </motion.div>

      <motion.h1 {...rise(0.6)} className="font-name mt-10 leading-none text-[#1B3B2B]">
        <span className="block text-4xl tracking-[0.26em] sm:text-6xl sm:tracking-[0.3em] lg:text-7xl">
          {couple.bride}
        </span>
        <span className="font-display my-3 block text-3xl italic tracking-normal text-[#B8860B] sm:text-4xl">
          &amp;
        </span>
        <span className="block text-4xl tracking-[0.26em] sm:text-6xl sm:tracking-[0.3em] lg:text-7xl">
          {couple.groom}
        </span>
      </motion.h1>

      <motion.div {...rise(0.85)} className="mt-10">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <span className="font-label text-[10px] text-[#525252] sm:text-xs">{wedding.day}</span>
          <span className="h-3 w-px bg-[#D4AF37]/70" aria-hidden="true" />
          <span className="font-label text-[10px] text-[#262626] sm:text-xs">{wedding.date}</span>
          <span className="h-3 w-px bg-[#D4AF37]/70" aria-hidden="true" />
          <span className="font-label text-[10px] text-[#525252] sm:text-xs">{wedding.year}</span>
        </div>
        <p className="font-display mt-6 text-lg tracking-[0.18em] text-[#1B3B2B] sm:text-xl">
          {venue.name}
        </p>
        <p className="font-label mt-1 text-[9px] text-[#B8860B] sm:text-[10px]">{venue.group}</p>
        <p className="font-label mt-1 text-[9px] text-[#525252] sm:text-[10px]">{venue.address}</p>
      </motion.div>

      <motion.a
        href="#invitation"
        data-testid="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-label text-[9px] text-[#B8860B]">SCROLL TO BEGIN</span>
        <span className="relative block h-9 w-px overflow-hidden bg-[#D4AF37]/30">
          <span className="scroll-dot absolute left-0 top-0 block h-2.5 w-px bg-[#B8860B]" />
        </span>
      </motion.a>
    </section>
  );
}
