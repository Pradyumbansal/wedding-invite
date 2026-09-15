import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { INVITATION } from "@/config/invitation";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = { name: "", phone: "", attendance: "accept", guests: 1, events: [], message: "" };

const inputCls =
  "font-display w-full border-b border-[#D4AF37]/40 bg-transparent py-2.5 text-lg text-[#262626] placeholder:italic placeholder:text-[#525252]/50 focus:border-[#B8860B] focus:outline-none transition-colors duration-300";

export default function Rsvp() {
  const [form, setForm] = useState(initial);
  const [sending, setSending] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleEvent = (id) =>
    setForm((f) => ({
      ...f,
      events: f.events.includes(id) ? f.events.filter((e) => e !== id) : [...f.events, id],
    }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please share your name so we know who's coming.");
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/rsvp`, { ...form, name: form.name.trim() });
      toast.success(
        form.attendance === "accept"
          ? "We can't wait to celebrate with you!"
          : "You'll be missed — thank you for letting us know."
      );
      setForm(initial);
    } catch {
      toast.error("Something went wrong — please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section data-testid="rsvp-section" className="relative px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <SectionHead
            eyebrow="KINDLY RESPOND"
            title="Will You Join Us?"
            sub="Your presence is the greatest gift. Let us know if you can celebrate with us."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="gold-frame gold-speckle bg-[#FDFBF7] p-6 sm:p-10">
            <div className="space-y-7">
              <input
                type="text"
                data-testid="rsvp-name-input"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
                aria-label="Your full name"
              />
              <input
                type="tel"
                data-testid="rsvp-phone-input"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
                aria-label="Phone number"
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  data-testid="rsvp-attend-accept"
                  onClick={() => set("attendance", "accept")}
                  className={`font-label flex-1 rounded-full border px-4 py-3 text-[10px] transition-colors duration-300 ${
                    form.attendance === "accept"
                      ? "border-[#1B3B2B] bg-[#1B3B2B] text-[#FAF6F0]"
                      : "border-[#D4AF37]/50 text-[#525252] hover:border-[#B8860B]"
                  }`}
                >
                  JOYFULLY ACCEPT
                </button>
                <button
                  type="button"
                  data-testid="rsvp-attend-decline"
                  onClick={() => set("attendance", "decline")}
                  className={`font-label flex-1 rounded-full border px-4 py-3 text-[10px] transition-colors duration-300 ${
                    form.attendance === "decline"
                      ? "border-[#B91C1C] bg-[#B91C1C] text-[#FAF6F0]"
                      : "border-[#D4AF37]/50 text-[#525252] hover:border-[#B8860B]"
                  }`}
                >
                  REGRETFULLY DECLINE
                </button>
              </div>

              {form.attendance === "accept" && (
                <>
                  <div>
                    <p className="font-label mb-3 text-[9px] text-[#B8860B]">NUMBER OF GUESTS</p>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button
                          key={n}
                          type="button"
                          data-testid={`rsvp-guests-${n}`}
                          onClick={() => set("guests", n)}
                          className={`h-10 w-10 rounded-full border text-base transition-colors duration-300 ${
                            form.guests === n
                              ? "border-[#B8860B] bg-[#B8860B] text-[#FAF6F0]"
                              : "border-[#D4AF37]/50 text-[#525252] hover:border-[#B8860B]"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-label mb-3 text-[9px] text-[#B8860B]">CELEBRATIONS YOU'LL ATTEND</p>
                    <div className="flex flex-wrap gap-2">
                      {INVITATION.events.map((ev) => (
                        <button
                          key={ev.id}
                          type="button"
                          data-testid={`rsvp-event-${ev.id}`}
                          onClick={() => toggleEvent(ev.id)}
                          className={`font-label rounded-full border px-4 py-2.5 text-[9px] transition-colors duration-300 ${
                            form.events.includes(ev.id)
                              ? "border-[#1B3B2B] bg-[#1B3B2B] text-[#FAF6F0]"
                              : "border-[#D4AF37]/50 text-[#525252] hover:border-[#B8860B]"
                          }`}
                        >
                          {ev.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <textarea
                data-testid="rsvp-message-input"
                placeholder="Blessings or a note for Arushi & Piyush (optional)"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                rows={3}
                className={`${inputCls} resize-none`}
                aria-label="Message for the couple"
              />

              <button
                type="submit"
                data-testid="rsvp-submit-button"
                disabled={sending}
                className="font-label flex w-full items-center justify-center gap-3 rounded-full bg-[#B91C1C] px-8 py-4 text-[11px] text-[#FAF6F0] shadow-[0_10px_24px_rgba(185,28,28,0.22)] transition-colors duration-300 hover:bg-[#1B3B2B] disabled:opacity-60"
              >
                <Heart size={14} aria-hidden="true" />
                {sending ? "SENDING..." : "SEND RSVP"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
