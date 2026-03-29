"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const statTargets = [
  { label: "Meals Daily", value: 500, suffix: "+" },
  { label: "Volunteers", value: 50, suffix: "+" },
];

const foodImages = [
  { src: "/food_for_life_1.jpeg", alt: "Food for Life - Meal Distribution" },
  { src: "/food_for_life_2.jpeg", alt: "Food for Life - Community Service" },
  { src: "/food_for_life_3.jpeg", alt: "Food for Life - Volunteer Work" },
  { src: "/food_for_life_4.jpeg", alt: "Food for Life - Serving Prasadam" },
  { src: "/food_for_life_5.jpeg", alt: "Food for Life - Outreach Distribution" },
  { src: "/food_for_life_6.jpeg", alt: "Food for Life - Community Meals" },
];

export default function FoodForLife() {
  const [counts, setCounts] = useState(statTargets.map(() => 0));
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const startAnimation = () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      let startTime = 0;
      const duration = 1600;
      setCounts(statTargets.map(() => 0));

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        setCounts(
          statTargets.map((item) => Math.round(item.value * progress)),
        );

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(animate);
        } else {
          frameRef.current = null;
        }
      };

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ffl"
      className="border-y border-[var(--border)] bg-[var(--surface)] py-24"
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-[56px] px-7 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <span className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-gold)]">
            Community Service
          </span>
          <h2 className="mt-2 mb-2 bg-gradient-to-r from-[#5e3711] via-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text font-cinzel text-[clamp(1.9rem,3.2vw,2.4rem)] font-medium text-transparent">
            Food for Life
          </h2>
          <div className="font-crimson text-[1.05rem] text-[var(--text-secondary)]">
            Nourishing the body, uplifting the soul.
          </div>
          <div className="font-crimson text-[1.05rem] leading-8 text-[var(--text-secondary)]">
            Food for Life (Anna-daan) is a sacred seva of preparing and
            distributing prasadam with care and devotion. Through daily meal
            service, the temple reaches workers, families, children, and people
            in need across Greater Noida.
          </div>
          <blockquote className="my-3 border-l-2 border-[var(--accent-gold)] bg-gradient-to-r from-[#fff1dc] to-transparent py-3 pl-5 font-crimson text-[1.05rem] italic text-[var(--accent-gold)]">
            “When you offer food to God and then distribute it, the whole world
            becomes a temple.”
            <br />
            <span className="font-cinzel text-[0.9rem] text-[var(--text-secondary)]">
              — Srila Prabhupada
            </span>
          </blockquote>
          <div className="mt-2 mb-4 grid gap-4 sm:grid-cols-2">
            {statTargets.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-[16px] border border-[var(--border)] bg-[var(--elevated)] px-5 py-4 shadow-[var(--shadow-soft)]"
              >
                <div className="font-cinzel text-[1.8rem] text-[var(--accent-saffron)]">
                  {counts[index]}
                  {stat.suffix}
                </div>
                <div className="mt-1 font-cinzel text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="#connect"
              className="rounded-[8px] bg-[var(--accent-saffron)] px-7 py-3 font-cinzel text-[0.8rem] font-medium uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(217,119,6,0.22)] hover:-translate-y-0.5 hover:brightness-105"
            >
              Volunteer Now ↗
            </a>
            <a
              href="#donate"
              className="rounded-[8px] bg-gradient-to-r from-[var(--accent-gold)] to-[#d9a441] px-7 py-3 font-cinzel text-[0.8rem] font-medium uppercase tracking-wider text-[#fffaf3] shadow-[0_12px_28px_rgba(183,121,31,0.18)] hover:-translate-y-0.5 hover:brightness-105"
            >
              Sponsor a Meal
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--elevated)] shadow-[var(--shadow-soft)]">
          <Image
            src="/food_for_life_4.jpeg"
            alt="Food for Life seva"
            width={700}
            height={780}
            className="h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,35,16,0.62)] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="font-cinzel text-[10px] uppercase tracking-widest text-[#f9ddb1]">
              Daily Seva
            </div>
            <h3 className="mt-2 font-cinzel text-[1.5rem] text-white">
              Serving prasadam with devotion
            </h3>
            <p className="mt-2 max-w-lg font-crimson text-[1rem] leading-7 text-[#f6e7d2]">
              Every meal is prepared with care and shared as an offering of
              compassion, dignity, and spiritual nourishment.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="mb-6 text-center font-cinzel text-[1.2rem] text-[var(--accent-gold)]">
          Our Impact in Action
        </h3>
        <div className="container mx-auto grid grid-cols-1 gap-4 px-7 md:grid-cols-3">
          {foodImages.map((img) => (
            <div
              key={img.src}
              className="group relative overflow-hidden rounded-[12px] border border-[var(--border)] shadow-[var(--shadow-soft)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={250}
                className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5a3412] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
