"use client";
import Image from "next/image";
import { useEffect } from "react";

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

function createParticles() {
  if (typeof window === "undefined") return;
  const container = document.getElementById("particles");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < 24; i++) {
    const p = document.createElement("div");
    const size = Math.random() * 3 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `${Math.random() * 20}%`;
    p.style.animationDuration = `${10 + Math.random() * 12}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    p.className = "particle";
    container.appendChild(p);
  }
}

export default function Hero() {
  useEffect(() => {
    const runParticles = () => createParticles();

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(runParticles);
      return;
    }

    const timeoutId = globalThis.setTimeout(runParticles, 1);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

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
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(59,32,10,0.45)_0%,rgba(77,45,13,0.2)_26%,rgba(245,232,205,0.74)_72%,rgba(247,240,226,0.96)_100%)]" />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(183,121,31,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(183,121,31,0.06) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div
        id="particles"
        className="absolute left-0 bottom-0 w-full h-full z-10"
      />
      <div className="absolute left-[-8rem] top-[8rem] h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(217,119,6,0.18)_0%,_rgba(217,119,6,0)_70%)] blur-2xl" />
      <div className="absolute bottom-[-4rem] right-[-6rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(183,121,31,0.16)_0%,_rgba(183,121,31,0)_72%)] blur-2xl" />
      <div className="hero-content z-20 mx-auto flex max-w-[840px] flex-col items-center px-6">
        <div className="animate-fadeDown inline-flex items-center gap-2 rounded-full border border-[var(--border-gold)] bg-[rgba(255,252,247,0.88)] px-4 py-1.5 shadow-[var(--shadow-soft)] backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-gold)] shadow-[0_0_10px_rgba(183,121,31,0.45)]" />
          <span className="font-cinzel text-[10px] tracking-widest uppercase text-[var(--accent-gold)]">
            Sri Sri Gaur Nataraj Dayal Nitai Temple · Greater Noida
          </span>
        </div>
        <h1 className="animate-fadeUp delay-200 mt-6 bg-gradient-to-r from-[#5e3711] via-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text font-cinzel text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-tight text-transparent">
          ISKCON
          <br />
          Greater Noida
        </h1>
        <div className="hero-deity animate-fadeUp delay-350 mt-3 font-crimson text-[clamp(1.1rem,2vw,1.4rem)] italic text-[var(--accent-gold)] opacity-85">
          Experience Divine Bliss Through Devotion, Kirtan & Prasadam
        </div>
        <div className="hero-sub animate-fadeUp delay-500 mx-auto mt-4 max-w-[560px] text-[1.1rem] leading-[1.8] text-[var(--text-secondary)]">
          Spreading Krishna consciousness through devotional service, cultural
          programs, and community welfare since 2015
        </div>
        <div className="hero-ctas animate-fadeUp delay-650 mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#visit-guide"
            className="rounded-[10px] border border-[var(--border-gold)] bg-[rgba(255,252,247,0.9)] px-7 py-3 font-cinzel text-[0.8rem] font-medium uppercase tracking-wider text-[var(--accent-gold)] shadow-[0_12px_28px_rgba(183,121,31,0.12)] hover:-translate-y-0.5 hover:bg-[#fff7ea]"
          >
            Plan Your Visit
          </a>
          <a
            href="#programs"
            className="rounded-[10px] bg-[var(--accent-saffron)] px-7 py-3 font-cinzel text-[0.8rem] font-medium uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(217,119,6,0.25)] hover:-translate-y-0.5 hover:brightness-105"
          >
            Upcoming Programs ↗
          </a>
          <a
            href="#donate"
            className="rounded-[10px] bg-gradient-to-r from-[var(--accent-gold)] to-[#d9a441] px-7 py-3 font-cinzel text-[0.8rem] font-medium uppercase tracking-wider text-[#fffaf3] shadow-[0_12px_28px_rgba(183,121,31,0.22)] hover:-translate-y-0.5 hover:brightness-105"
          >
            Donate Now
          </a>
        </div>
        <div className="hero-mantra-strip animate-fadeUp delay-800 mt-10 w-full overflow-hidden rounded-full border border-[var(--border)] bg-[rgba(255,252,247,0.74)] py-4 shadow-[var(--shadow-soft)]">
          <div className="mantra-scroll flex gap-12 whitespace-nowrap animate-scrollMantra">
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--text-muted)]">
              Hare Krishna
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--accent-gold)]">
              | Hare Krishna |
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--text-muted)]">
              Krishna Krishna
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--accent-gold)]">
              | Hare Hare |
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--text-muted)]">
              Hare Rama
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--accent-gold)]">
              | Hare Rama |
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--text-muted)]">
              Rama Rama
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--accent-gold)]">
              | Hare Hare | ✦
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--text-muted)]">
              Hare Krishna
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--accent-gold)]">
              | Hare Krishna |
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--text-muted)]">
              Krishna Krishna
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--accent-gold)]">
              | Hare Hare |
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--text-muted)]">
              Hare Rama
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--accent-gold)]">
              | Hare Rama |
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--text-muted)]">
              Rama Rama
            </span>
            <span className="font-cinzel text-[0.82rem] tracking-widest uppercase text-[var(--accent-gold)]">
              | Hare Hare | ✦
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero-slide {
          opacity: 0;
          animation: heroFade 32s infinite;
          transform: scale(1.03);
        }
        .particle {
          position: absolute;
          background: var(--accent-gold);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(183, 121, 31, 0.35);
          animation: floatUp linear infinite;
          opacity: 0.35;
        }
        @keyframes heroFade {
          0% {
            opacity: 0;
            transform: scale(1.06);
          }
          6% {
            opacity: 1;
          }
          18% {
            opacity: 1;
            transform: scale(1);
          }
          25% {
            opacity: 0;
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.7);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
          }
        }
        .animate-fadeDown {
          animation: fadeDown 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fadeUp {
          animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-350 { animation-delay: 0.35s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-650 { animation-delay: 0.65s; }
        .delay-800 { animation-delay: 0.8s; }
        @keyframes fadeDown {
          0% { opacity: 0; transform: translateY(-22px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(22px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-scrollMantra {
          animation: scrollMantra 22s linear infinite;
        }
        @keyframes scrollMantra {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .hero-mantra-strip {
            border-radius: 24px;
          }
        }
      `}</style>
    </section>
  );
}
