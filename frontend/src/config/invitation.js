export const INVITATION = {
  invocation: "|| SHREE GANESHAY NAMAH ||",

  couple: {
    bride: "ARUSHI",
    groom: "PIYUSH",
    hosts: "Smt. & Shri Rajendra Madnani",
    brideParents: "Surabhi & Rajiv Gahlot",
    groomParents: "Smt. Sunita & Rajendra Madnani",
    groomHome: "Agra",
    photo: "/images/welcome-art.jpg",
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
    heroBackground: "/images/hero-background.jpg",
    invitationBackground: "/images/invitation-background.jpg",
    closing: "/images/closing.svg",
  },

  // Background music.
  //   src      — audio file under frontend/public, e.g. "/audio/our-song.mp3".
  //              When null, a gentle generated Indian classical ambience plays.
  //   startAt  — seconds into the track to begin, and to loop back to. 210 = 3:30.
  //   autoplay — begin as soon as the browser permits. Browsers block un-gestured
  //              audio, so MusicToggle also starts on the visitor's first tap/click.
  music: { src: "/audio/tamil-wedding.mp3", startAt: 210, autoplay: true, volume: 0.45 },

  events: [
    {
      id: "mehandi",
      num: "01",
      day: "SATURDAY",
      date: "OCTOBER 24, 2026",
      time: "12:30 PM",
      title: "MEHANDI & HALDI",
      venue: ["Hotel Trident (The Oberoi Group)", "Fatehabad Road, Agra"],
      image: "/images/journey-event-1.jpg",
    },
    {
      id: "cocktail",
      num: "02",
      day: "SATURDAY",
      date: "OCTOBER 24, 2026",
      time: "07:00 PM",
      title: "COCKTAIL & RING CEREMONY",
      venue: ["Hotel Trident (The Oberoi Group)", "Fatehabad Road, Agra"],
      image: "/images/journey-event-2.jpg",
    },
    {
      id: "wedding",
      num: "03",
      day: "SUNDAY",
      date: "OCTOBER 25, 2026",
      time: "11:00 AM",
      title: "BARAAT & PHERE",
      venue: ["Hotel Trident (The Oberoi Group)", "Fatehabad Road, Agra"],
      image: "/images/journey-event-3.jpg",
    },
  ],

  story: [
    {
      num: "01",
      title: "THE BEGINNING",
      text: "Every beautiful story has a quiet first page. Ours began when our eyes met at the chai ki thadi in front of the college on the very first day.",
      image: "/images/story-1.png",
    },
    {
      num: "02",
      title: "THE FIRST CHAPTER",
      text: "The guy tried to look cool with long, wavy hair, rapping to impress, while the girl made fun of him — and the rest is history.",
      image: "/images/story-new-02.jpg",
    },
    {
      num: "03",
      title: "THE JOURNEY",
      text: "From Agra to Meerut, Bangalore to Mumbai, and Noida to Delhi — physically apart, but emotionally closer every day.",
      image: "/images/story-3.png",
    },
    {
      num: "04",
      title: "THE LITTLE MOMENTS",
      text: "In the age of WhatsApp, we shared handwritten letters for years, with every word creating the story of a lifetime.",
      image: "/images/story-2.png",
    },
    {
      num: "05",
      title: "THE PROMISE",
      text: "She said yes without him ever having to ask the question.",
      image: "/images/story-new-05.jpg",
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
      image: "/images/wardrobe-haldi.jpg",
      palette: ["#D4AF37", "#F3E9D2", "#FAF6F0", "#B8860B"],
    },
    {
      id: "sangeet",
      event: "SANGEET",
      date: "24 OCTOBER, 2026",
      time: "7:00 PM",
      theme: "BOOGIE WOOGIE",
      dressCode: "CHATAK CHAMKEELA",
      image: "/images/wardrobe-sangeet.jpg",
      palette: ["#262626", "#FAF6F0", "#5C1A1B", "#8A8A8A"],
    },
    {
      id: "wedding",
      event: "WEDDING",
      date: "25 OCTOBER, 2026",
      time: "12:00 PM",
      theme: "LAGAN LAAGI RE",
      dressCode: "SASSY & CLASSY",
      image: "/images/wardrobe-wedding.jpg",
      palette: ["#C53030", "#E8943A", "#D4AF37", "#4A7A5C", "#2E6E8E"],
    },
  ],
};
