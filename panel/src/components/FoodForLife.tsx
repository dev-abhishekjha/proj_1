"use client";

import { Heart, Users, Utensils } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const statTargets = [
  { label: "Meals Daily", value: 200, suffix: "+", icon: Utensils },
  { label: "Volunteers", value: 30, suffix: "+", icon: Users },
];

const foodImages = [
  { src: "/food_for_life_1.jpeg", alt: "Food for Life - Meal Distribution" },
  { src: "/food_for_life_2.jpeg", alt: "Food for Life - Community Service" },
  { src: "/food_for_life_3.jpeg", alt: "Food for Life - Volunteer Work" },
  { src: "/food_for_life_4.jpeg", alt: "Food for Life - Serving Prasadam" },
  {
    src: "/food_for_life_5.jpeg",
    alt: "Food for Life - Outreach Distribution",
  },
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
      const duration = 2000;
      setCounts(statTargets.map(() => 0));

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Easing function for smoother count-up
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);

        setCounts(
          statTargets.map((item) => Math.round(item.value * easedProgress)),
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
      { threshold: 0.15 },
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
      className="border-y border-[var(--border)] bg-[var(--surface)] py-20"
    >
      <div className="container mx-auto grid grid-cols-1 items-start gap-16 px-7 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[var(--accent-saffron)]" />
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-bold">
              Community Service
            </span>
          </div>
          <h2 className="bg-gradient-to-r from-[#5e3711] via-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text font-cinzel text-[clamp(2rem,4vw,3rem)] font-semibold text-transparent leading-tight">
            Food for Life
          </h2>
          <div className="font-crimson text-[1.2rem] italic text-[var(--accent-gold)]">
            Nourishing the body, uplifting the soul.
          </div>
          <div className="space-y-4 font-crimson text-[1.1rem] leading-8 text-[var(--text-secondary)]">
            <p>
              Food for Life (Anna-daan) is a sacred seva of preparing and
              distributing sanctified vegetarian meals (prasadam) with care and
              devotion.
            </p>
            <p>
              Every donation directly impacts lives. A contribution of just ₹501
              can provide meals for 10 people, ensuring that no one in our
              community goes hungry. Through daily meal service, we reach
              workers, families, and children across Greater Noida.
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {statTargets.map((stat, index) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--elevated)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--border-gold)] hover:shadow-md"
              >
                <stat.icon className="w-5 h-5 text-[var(--accent-gold)] mb-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="font-cinzel text-3xl font-bold text-[var(--accent-saffron)]">
                  {counts[index]}
                  {stat.suffix}
                </div>
                <div className="mt-1 font-cinzel text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#connect"
              className="rounded-xl bg-[var(--accent-saffron)] px-8 py-4 font-cinzel text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            >
              Volunteer Now ↗
            </a>
            <a
              href="#donate"
              className="rounded-xl border-2 border-[var(--accent-gold)] bg-transparent px-8 py-4 font-cinzel text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-gold)] hover:text-white active:scale-95"
            >
              Sponsor a Meal
            </a>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--elevated)] shadow-xl">
            <Image
              src="/food_for_life_4.jpeg"
              alt="Food for Life seva"
              width={700}
              height={780}
              className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,35,16,0.8)] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <blockquote className="font-crimson text-xl italic text-white leading-relaxed">
                “When you offer food to God and then distribute it, the whole
                world becomes a temple.”
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-8 bg-[var(--accent-gold)]" />
                <span className="font-cinzel text-sm uppercase tracking-widest text-[#f9ddb1]">
                  Srila Prabhupada
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="container mx-auto px-7">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-cinzel text-xl text-[var(--accent-gold)]">
              Our Impact in Action
            </h3>
            <div className="h-px flex-1 bg-[var(--border)] opacity-50" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {foodImages.map((img) => (
              <div
                key={img.src}
                className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--border)] shadow-sm"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[var(--accent-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
