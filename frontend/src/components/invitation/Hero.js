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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-16 text-center sm:px-6 sm:pt-20"
    >
      <img
        src={images.heroBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[#0B301D]/45"
        aria-hidden="true"
      />

      <motion.p
        {...rise(0.15)}
        className="relative font-label text-[10px] text-[#F4D06F] drop-shadow-sm sm:text-xs"
        data-testid="hero-invocation"
      >
        {invocation}
      </motion.p>

      <motion.div {...rise(0.35)} className="relative mt-7 w-56 sm:mt-8 sm:w-80 lg:w-96">
        <div className="gold-frame bg-[#FDFBF7]/95 p-2.5 sm:p-3">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={couple.photo}
              alt="Arushi and Piyush"
              data-testid="couple-photo"
              className="animate-slow-zoom h-full w-full object-contain"
            />
          </div>
        </div>
      </motion.div>

      <motion.h1 {...rise(0.6)} className="relative font-name mt-8 leading-none text-[#FFF8E8] drop-shadow-md sm:mt-10">
        <span className="block text-4xl tracking-[0.2em] sm:text-6xl sm:tracking-[0.3em] lg:text-7xl">
          {couple.bride}
        </span>
        <span className="font-display my-3 block text-3xl italic tracking-normal text-[#F4D06F] sm:text-4xl">
          &amp;
        </span>
        <span className="block text-4xl tracking-[0.2em] sm:text-6xl sm:tracking-[0.3em] lg:text-7xl">
          {couple.groom}
        </span>
      </motion.h1>

      <motion.div {...rise(0.85)} className="relative mt-8 sm:mt-10">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <span className="font-label text-[9px] text-[#FFF8E8]/90 sm:text-xs">{wedding.day}</span>
          <span className="h-3 w-px bg-[#F4D06F]/80" aria-hidden="true" />
          <span className="font-label text-[9px] text-[#FFF8E8] sm:text-xs">{wedding.date}</span>
          <span className="h-3 w-px bg-[#F4D06F]/80" aria-hidden="true" />
          <span className="font-label text-[9px] text-[#FFF8E8]/90 sm:text-xs">{wedding.year}</span>
        </div>
        <p className="font-display mt-5 text-lg tracking-[0.18em] text-[#FFF8E8] drop-shadow-sm sm:mt-6 sm:text-xl">
          {venue.name}
        </p>
        <p className="font-label mt-1 text-[8px] text-[#F4D06F] sm:text-[10px]">{venue.group}</p>
        <p className="font-label mt-1 text-[8px] text-[#FFF8E8]/80 sm:text-[10px]">{venue.address}</p>
      </motion.div>

      <motion.a
        href="#invitation"
        data-testid="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-7"
      >
        <span className="font-label text-[8px] text-[#F4D06F] sm:text-[9px]">SCROLL TO BEGIN</span>
        <span className="relative block h-9 w-px overflow-hidden bg-[#FFF8E8]/30">
          <span className="scroll-dot absolute left-0 top-0 block h-2.5 w-px bg-[#F4D06F]" />
        </span>
      </motion.a>
    </section>
  );
}
