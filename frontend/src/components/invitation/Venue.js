import { MapPin } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { INVITATION } from "@/config/invitation";

export default function Venue() {
  const { venue } = INVITATION;

  return (
    <section data-testid="venue-section" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionHead eyebrow="THE DESTINATION" title="Where We Celebrate" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-name text-2xl tracking-[0.2em] text-[#1B3B2B] sm:text-3xl">{venue.name}</p>
          <p className="font-label mt-2 text-[10px] text-[#B8860B] sm:text-xs">{venue.group}</p>
          <p className="font-display mt-3 flex items-center justify-center gap-2 text-lg italic text-[#525252]">
            <MapPin size={16} className="text-[#B91C1C]" aria-hidden="true" />
            Fatehabad Road, Agra
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="gold-frame mx-auto mt-10 max-w-3xl bg-[#FDFBF7] p-2 sm:p-3">
            <iframe
              title="Map to Hotel Trident, Agra"
              data-testid="venue-map"
              src={venue.mapsEmbed}
              className="h-72 w-full border-0 sm:h-96"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href={venue.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="get-directions-button"
            className="font-label mt-8 inline-flex items-center gap-3 rounded-full bg-[#1B3B2B] px-8 py-3.5 text-[11px] text-[#FAF6F0] shadow-[0_10px_24px_rgba(27,59,43,0.25)] transition-colors duration-300 hover:bg-[#B8860B]"
          >
            <MapPin size={14} aria-hidden="true" />
            GET DIRECTIONS
          </a>
          <p className="font-display mt-12 text-2xl italic text-[#1B3B2B] sm:text-3xl">
            We can&rsquo;t wait to celebrate with you
          </p>
        </Reveal>
      </div>
    </section>
  );
}
