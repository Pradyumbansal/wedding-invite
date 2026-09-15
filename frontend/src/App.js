import "@/App.css";
import { Toaster } from "sonner";
import Hero from "@/components/invitation/Hero";
import InvitationCard from "@/components/invitation/InvitationCard";
import Countdown from "@/components/invitation/Countdown";
import Story from "@/components/invitation/Story";
import Journey from "@/components/invitation/Journey";
import Wardrobe from "@/components/invitation/Wardrobe";
import Venue from "@/components/invitation/Venue";
import Rsvp from "@/components/invitation/Rsvp";
import Closing from "@/components/invitation/Closing";
import Petals from "@/components/invitation/Petals";
import MusicToggle from "@/components/invitation/MusicToggle";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#FAF6F0] text-[#262626]">
      <Petals />
      <MusicToggle />
      <main className="relative z-10">
        <Hero />
        <InvitationCard />
        <Countdown />
        <Story />
        <Journey />
        <Wardrobe />
        <Venue />
        <Rsvp />
        <Closing />
      </main>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FDFBF7",
            border: "1px solid rgba(212,175,55,0.55)",
            color: "#262626",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.05rem",
          },
        }}
      />
    </div>
  );
}
