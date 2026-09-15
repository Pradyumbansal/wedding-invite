export const INVITATION = {
  invocation: "|| SHREE GANESHAY NAMAH ||",

  couple: {
    bride: "ARUSHI",
    groom: "PIYUSH",
    hosts: "Smt. & Shri Vijay Singh Gahlot",
    brideParents: "Surabhi & Rajiv Gahlot",
    groomParents: "Smt. Sunita & Rajendra Madnani",
    groomHome: "Agra",
    // Replace with the couple's real photograph, e.g. "/images/couple-photo.jpg"
    photo: "/images/decor-feet.jpg",
  },

  wedding: {
    day: "SUNDAY",
    date: "OCTOBER 25",
    year: "2026",
    full: "SUNDAY, OCTOBER 25, 2026",
    countdownTarget: "2026-10-25T11:00:00+05:30",
  },

  venue: {
    name: "HOTEL TRIDENT",
    group: "THE OBEROI GROUP",
    address: "FATEHABAD ROAD, AGRA",
    mapsEmbed: "https://www.google.com/maps?q=Trident+Agra&output=embed",
    mapsDirections:
      "https://www.google.com/maps/dir/?api=1&destination=Trident+Agra,+Fatehabad+Road,+Agra,+Uttar+Pradesh",
  },

  images: {
    heroFrame: "/images/hero-frame.svg",
    closing: "/images/closing.svg",
  },

  // Background music.
  //   src      — audio file under frontend/public, e.g. "/audio/our-song.mp3".
  //              When null, a gentle generated Indian classical ambience plays.
  //   startAt  — seconds into the track to begin, and to loop back to. 210 = 3:30.
  //   autoplay — begin as soon as the browser permits. Browsers block un-gestured
  //              audio, so MusicToggle also starts on the visitor's first tap/scroll.
  music: { src: null, startAt: 210, autoplay: true, volume: 0.45 },

  events: [
    {
      id: "mehandi",
      num: "01",
      day: "SATURDAY",
      date: "OCTOBER 24, 2026",
      time: "12:00 NOON",
      title: "MEHANDI & HALDI",
      venue: ["Hotel Trident (The Oberoi Group)", "Fatehabad Road, Agra"],
      image: "/images/event-mehandi.png",
    },
    {
      id: "cocktail",
      num: "02",
      day: "SATURDAY",
      date: "OCTOBER 24, 2026",
      time: "07:00 PM",
      title: "COCKTAIL & RING CEREMONY",
      venue: ["Hotel Trident (The Oberoi Group)", "Fatehabad Road, Agra"],
      image: "/images/event-cocktail.png",
    },
    {
      id: "wedding",
      num: "03",
      day: "SUNDAY",
      date: "OCTOBER 25, 2026",
      time: "11:00 AM",
      title: "BARAAT & PHERE",
      venue: ["Hotel Trident (The Oberoi Group)", "Fatehabad Road, Agra"],
      image: "/images/event-wedding.svg",
    },
  ],

  // Placeholder chapters — replace text/image with the couple's real story.
  story: [
    {
      num: "01",
      title: "THE BEGINNING",
      text: "Every beautiful story has a quiet first page. Ours is waiting to be written here — replace this with how it truly began.",
      image: "/images/story-1.png",
    },
    {
      num: "02",
      title: "THE FIRST CHAPTER",
      text: "A first conversation, a first hello. Add the memory that started it all.",
      image: "/images/story-2.png",
    },
    {
      num: "03",
      title: "THE JOURNEY",
      text: "Roads travelled, cities wandered, laughter collected along the way. Add your favourite journey together.",
      image: "/images/story-3.png",
    },
    {
      num: "04",
      title: "THE LITTLE MOMENTS",
      text: "The in-between moments that became everything. Add yours here.",
      image: "/images/story-4.svg",
    },
    {
      num: "05",
      title: "THE PROMISE",
      text: "A question asked, a promise made. Replace this with the story of the yes.",
      image: "/images/story-5.svg",
    },
    {
      num: "06",
      title: "FOREVER BEGINS",
      text: "And now, forever begins — Sunday, October 25, 2026, surrounded by everyone we love.",
      image: "/images/story-6.png",
    },
  ],

  wardrobe: [
    {
      id: "haldi",
      event: "HALDI & MEHNDI",
      date: "24 OCTOBER, 2026",
      time: "11:00 AM",
      theme: "RANGI SAARI",
      dressCode: "GOLD & IVORY",
      image: "/images/wardrobe-2.png",
      palette: ["#D4AF37", "#F3E9D2", "#FAF6F0", "#B8860B"],
    },
    {
      id: "sangeet",
      event: "SANGEET",
      date: "24 OCTOBER, 2026",
      time: "7:00 PM",
      theme: "BOOGIE WOOGIE",
      dressCode: "CHATAK CHAMKEELA",
      image: "/images/wardrobe-3.svg",
      palette: ["#E0115F", "#FF7A00", "#00A0B0", "#FFD700"],
    },
    {
      id: "wedding",
      event: "WEDDING",
      date: "25 OCTOBER, 2026",
      time: "12:00 PM",
      theme: "LAGAN LAAGI RE",
      dressCode: "SASSY & CLASSY",
      image: "/images/wardrobe-1.svg",
      palette: ["#5C1A1B", "#1B3B2B", "#D4AF37", "#262626"],
    },
  ],
};
