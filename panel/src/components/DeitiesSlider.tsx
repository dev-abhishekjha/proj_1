"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const deities = [
  { src: "/deities_1.jpeg", alt: "Sri Sri Gaur Nataraj Dayal Nitai" },
  { src: "/deities_2.jpeg", alt: "Lord Sri Krishna" },
  { src: "/deities_3.jpeg", alt: "Sri Sri Radha Krishna" },
  { src: "/deities_4.jpeg", alt: "Lord Chaitanya Mahaprabhu" },
  { src: "/deities_5.jpeg", alt: "Sri Sri Gaur Nataraj Dayal Nitai Darshan" },
  { src: "/deities_6.jpeg", alt: "Divine Temple Darshan" },
  { src: "/deities_7.jpeg", alt: "Festival Deities Darshan" },
  { src: "/deities_8.jpeg", alt: "Sacred Altar Darshan" },
];

export default function DeitiesSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % deities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % deities.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + deities.length) % deities.length);

  return (
    <section className="deities-slider bg-[var(--bg)] py-16 relative overflow-hidden">
      <div className="container mx-auto px-7">
        <div className="text-center mb-8">
          <span className="font-cinzel text-[10px] tracking-widest uppercase text-[var(--accent-gold)]">
            Divine Darshan
          </span>
          <h2 className="font-cinzel text-[clamp(1.9rem,3.2vw,2.4rem)] font-medium bg-gradient-to-r from-[#5e3711] via-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text text-transparent mt-2">
            Sri Sri Gaur Nataraj Dayal Nitai
          </h2>
          <div className="font-crimson text-[1.05rem] text-[var(--text-secondary)]">
            Experience the divine presence of our presiding deities
          </div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-[16px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-[var(--border)]">
            <Image
              src={deities[current].src}
              alt={deities[current].alt}
              width={800}
              height={500}
              className="w-full h-[400px] md:h-[500px] object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60" />
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-[var(--bg)] transition-all duration-200"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-[var(--bg)] transition-all duration-200"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
