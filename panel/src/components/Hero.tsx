"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const heroSlides = [
  "/deities_1.jpeg",
  "/deities_2.jpeg",
  "/deities_3.jpeg",
  "/deities_4.jpeg",
  "/deities_5.jpeg",
  "/deities_6.jpeg",
  "/deities_7.jpeg",
  "/deities_8.jpeg",
];

const parseTimeToMinutes = (timeStr: string) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (!minutes) minutes = 0;
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

export default function Hero() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const isTempleOpen = useMemo(() => {
    const morningOpen = parseTimeToMinutes("4:30 AM");
    const morningClose = parseTimeToMinutes("12:00 PM");
    const eveningOpen = parseTimeToMinutes("4:00 PM");
    const eveningClose = parseTimeToMinutes("9:30 PM");

    return (
      (currentMinutes >= morningOpen && currentMinutes <= morningClose) ||
      (currentMinutes >= eveningOpen && currentMinutes <= eveningClose)
    );
  }, [currentMinutes]);

  return (
    <section
      id="home"
      className="hero relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-[120px] text-center"
      style={{
        background: "var(--gradient-hero)",
      }}
    >
      <div className="absolute inset-0 z-0">
        {heroSlides.map((src, index) => (
          <div
            key={src}
            className="hero-slide absolute inset-0"
            style={{ animationDelay: `${index * 4}s` }}
          >
            <Image
              src={src}
              alt="ISKCON Greater Noida deity darshan"
              fill
              priority={index < 2}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Improved Gradient Overlays */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(45,31,14,0.4)_0%,rgba(45,31,14,0.15)_25%,rgba(253,248,240,0.6)_70%,rgba(253,248,240,1)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--bg)] to-transparent z-0" />

      <div className="hero-content z-20 mx-auto flex max-w-[880px] flex-col items-center px-6">
        {/* Live Status Badge */}
        <div className="animate-fadeDown inline-flex items-center gap-3 rounded-full border border-[var(--border-gold)] bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm mb-6">
          <div
            className={`h-2 w-2 rounded-full ${isTempleOpen ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500"} animate-pulse`}
          />
          <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--text-primary)]">
            {isTempleOpen ? "Temple Open Now" : "Temple Currently Closed"}
            <span className="mx-2 opacity-30">|</span>
            <span className="text-[var(--accent-gold)]">
              {isTempleOpen
                ? currentMinutes < 720
                  ? "Closes 12:00 PM"
                  : "Closes 9:30 PM"
                : currentMinutes < 270
                  ? "Opens 4:30 AM"
                  : "Opens 4:00 PM"}
            </span>
          </span>
        </div>

        <h1 className="animate-fadeUp delay-200 bg-gradient-to-b from-[var(--text-primary)] to-[var(--accent-saffron)] bg-clip-text font-display text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[1.1] text-transparent tracking-tight">
          ISKCON
          <br />
          Greater Noida
        </h1>

        <div className="animate-fadeUp delay-350 mt-6 font-display text-[clamp(1.2rem,2.5vw,1.8rem)] italic text-[var(--accent-gold)] font-medium">
          Experience Divine Bliss Through Devotion
        </div>

        <div className="animate-fadeUp delay-500 mx-auto mt-6 max-w-[620px] text-[1.15rem] leading-relaxed text-[var(--text-secondary)] font-medium">
          A spiritual oasis in the heart of Greater Noida, dedicated to
          spreading the message of peace, love, and devotion.
        </div>

        <div className="hero-ctas animate-fadeUp delay-650 mt-10 flex flex-wrap justify-center gap-5">
          <a
            href="#visit-guide"
            className="min-w-[200px] rounded-xl bg-[var(--accent-saffron)] px-8 py-4 font-display text-[0.9rem] font-bold uppercase tracking-widest text-white shadow-xl hover:-translate-y-1 hover:brightness-110 active:scale-95 transition-all"
          >
            Plan Your Visit
          </a>
          <a
            href="#donate"
            className="min-w-[200px] rounded-xl border-2 border-[var(--accent-gold)] bg-white/50 px-8 py-4 font-display text-[0.9rem] font-bold uppercase tracking-widest text-[var(--accent-gold)] shadow-md hover:-translate-y-1 hover:bg-[var(--accent-gold)] hover:text-white active:scale-95 transition-all"
          >
            Donate Now
          </a>
          <a
            href="#programs"
            className="w-full sm:w-auto font-display text-[0.85rem] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors py-2"
          >
            Upcoming Programs ↗
          </a>
        </div>

        {/* Improved Mantra Strip */}
        <div className="hero-mantra-strip animate-fadeUp delay-800 mt-12 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-white/60 py-5 shadow-inner backdrop-blur-[2px]">
          <div className="mantra-scroll flex gap-16 whitespace-nowrap animate-scrollMantra">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="font-display text-[1.1rem] tracking-[0.1em] font-medium text-[var(--text-secondary)]">
                  HARE KRISHNA HARE KRISHNA
                </span>
                <span className="font-display text-[1.1rem] tracking-[0.1em] font-bold text-[var(--accent-saffron)]">
                  KRISHNA KRISHNA HARE HARE
                </span>
                <span className="font-display text-[1.1rem] tracking-[0.1em] font-medium text-[var(--text-secondary)]">
                  HARE RAMA HARE RAMA
                </span>
                <span className="font-display text-[1.1rem] tracking-[0.1em] font-bold text-[var(--accent-gold)]">
                  RAMA RAMA HARE HARE
                </span>
                <span className="text-[var(--accent-rose)] opacity-40">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-slide {
          opacity: 0;
          animation: heroFade 32s infinite;
        }
        @keyframes heroFade {
          0% { opacity: 0; transform: scale(1.08); }
          5% { opacity: 1; }
          20% { opacity: 1; transform: scale(1); }
          25% { opacity: 0; }
          100% { opacity: 0; }
        }
        .animate-fadeDown {
          animation: fadeDown 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-350 { animation-delay: 0.35s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-650 { animation-delay: 0.65s; }
        .delay-800 { animation-delay: 0.8s; }
        
        @keyframes fadeDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-scrollMantra {
          animation: scrollMantra 40s linear infinite;
        }
        @keyframes scrollMantra {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
