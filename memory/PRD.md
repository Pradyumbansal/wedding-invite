# PRD — Arushi & Piyush Wedding Invitation

## Original Problem Statement
Premium, elegant, single-link, mobile-first scrolling digital wedding invitation for ARUSHI & PIYUSH (Sunday, October 25, 2026, Hotel Trident, Fatehabad Road, Agra). South Indian-inspired watercolour aesthetic (banana leaves, marigold, jasmine, temple bells) on warm ivory, based on the couple's printed invitation PDF. Sections: Hero, Formal Invitation, Live Countdown, Our Story carousel, Wedding Journey timeline, Wardrobe style guide, Venue + Google Maps, Closing blessing. No invented facts — editable placeholders for story content.

## User Decisions (confirmed)
- 3 events only (Section 2 timings): Mehandi & Haldi (Oct 24, 12 noon), Cocktail & Ring Ceremony (Oct 24, 7 PM), Baraat & Pheras (Oct 25, 11 AM) — all at Hotel Trident, Agra
- PDF used as aesthetic reference only
- RSVP form: YES (guests confirm attendance)
- Background music: YES (floating ♪ toggle)
- AI-generated watercolour illustrations, no faces

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + embla-carousel + sonner, single-page long-scroll at `/app/frontend/src/`
  - `src/config/invitation.js` — CENTRAL CONFIG: names, dates, events, story slides, wardrobe, images, maps links, music source
  - `src/components/invitation/` — Hero, InvitationCard, Countdown, Story, Journey, Wardrobe, Venue, Rsvp, Closing, Petals, MusicToggle, Reveal
- Backend: FastAPI `/app/backend/server.py` — `POST /api/rsvp`, `GET /api/rsvp/summary`
- DB: MongoDB `rsvps` collection
- Illustrations: `/app/frontend/public/images/` — 7 AI watercolour PNGs (story-1/2/3/6, event-mehandi, event-cocktail, wardrobe-2) + 8 hand-crafted watercolour-style SVG fallbacks (hero-frame, couple, story-4, story-5, event-wedding, wardrobe-1, wardrobe-3, closing)
- Regeneration script: `/app/scripts/generate_images.py` (Gemini Nano Banana via EMERGENT_LLM_KEY; skips existing files)

## Implemented (Sep 7, 2026)
- Cinematic hero: invocation, watercolour garland toran, couple illustration in gold arch (replaceable via config), names, date, venue, scroll indicator
- Formal invitation card with exact Gahlot/Madnani wording
- Live countdown to Oct 25, 2026 11:00 AM IST, updating every second
- Our Story: 6-card swipe/drag carousel with arrows + dots (placeholder texts)
- Wedding Journey: 3-event vertical timeline with illustrations
- Wardrobe: 3 style-guide cards with palettes (not dress codes)
- Venue: Google Maps embed + GET DIRECTIONS (opens Google Maps in new tab)
- RSVP: name, phone, accept/decline, guests, events, message → saved to MongoDB, toast confirmation (verified end-to-end)
- Music: floating ♪ toggle playing generated Indian classical ambience (tanpura drone + flute melody via Web Audio); `music.src` in config swaps in a real audio file
- Falling petal canvas animation, paper-grain texture, gold double-frame cards
- SEO + Open Graph tags for WhatsApp link preview

## Updates (Sep 7, 2026 — iteration 2)
- All arch (rounded-top) frames converted to rectangular gold double frames: hero, story cards, event cards, wardrobe cards
- User-supplied artwork integrated: couple's feet + gathbandhan watercolour (decor-feet.jpg) as hero centrepiece (still swappable via config `couple.photo`); courtyard with brass lamps, banana plants and urli bowls (decor-courtyard.jpg) as soft watercolour wash behind the formal invitation card

## Known Limitations
- Universal key image budget exhausted ($0.40 cap): 8 illustrations are crafted SVG stand-ins. After top-up (Profile → Manage plan → Universal Key → Add Balance), run `python3 /app/scripts/generate_images.py` to generate the missing PNGs, then point config back to the .png paths
- Couple photo is an illustration placeholder — replace `couple.photo` in config with the real photo
- No guest list admin view (only summary endpoint)

## Backlog
- P0: Regenerate 8 AI illustrations after key top-up; add real couple photo
- P1: Real royalty-free music file; replace story placeholder texts with real story
- P2: RSVP admin view / export; Add-to-Calendar buttons per event; guest name personalisation via ?to= query param

## Next Tasks
1. Top up universal key, rerun image script, swap config paths
2. Replace couple.svg with real photograph
3. Collect real story content from couple
