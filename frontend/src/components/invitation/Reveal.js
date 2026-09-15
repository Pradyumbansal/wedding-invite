import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ eyebrow, title, sub }) => (
  <div className="mb-12 text-center sm:mb-16">
    {eyebrow && (
      <p className="font-label mb-4 text-[11px] text-[#B8860B] sm:text-xs">{eyebrow}</p>
    )}
    <h2 className="font-display text-3xl tracking-wide text-[#1B3B2B] sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    <div className="mt-5 flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-14 bg-[#D4AF37]/60" />
      <span className="text-sm text-[#B8860B]">&#x0950;</span>
      <span className="h-px w-14 bg-[#D4AF37]/60" />
    </div>
    {sub && (
      <p className="font-display mx-auto mt-5 max-w-md text-base italic text-[#525252] sm:text-lg">
        {sub}
      </p>
    )}
  </div>
);
