"use client";

import { Quote } from "lucide-react";
import Image from "next/image";

const prabhupadaMilestones = [
  "Founded ISKCON in 1966 to share Krishna-bhakti globally.",
  "Translated and commented on the Bhagavad-gita and Srimad-Bhagavatam.",
  "Established the standards of kirtan, deity worship, and daily sadhana.",
];

export default function FounderAcharya() {
  return (
    <section id="founder" className="bg-[var(--bg)] py-20 overflow-hidden">
      <div className="container mx-auto px-7">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-center">
          {/* Left: Circular Portrait */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-8 bg-[radial-gradient(circle,var(--accent-gold)_0%,transparent 70%)] opacity-[0.05] animate-slowSpin" />
            <div className="relative h-[320px] w-[320px] md:h-[420px] md:w-[420px] flex-shrink-0">
              {/* Decorative Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-gold)] border-dashed opacity-20 animate-slowSpin" />
              <div className="absolute inset-4 rounded-full border border-[var(--border)] opacity-40" />

              <div className="absolute inset-8 overflow-hidden rounded-full border-4 border-white shadow-2xl">
                <Image
                  src="/prabhupada.jpeg"
                  alt="Srila Prabhupada - Founder-Acharya of ISKCON"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 right-12 md:right-16 bg-white border border-[var(--border)] rounded-2xl p-4 shadow-lg z-20">
                <div className="font-display text-[10px] uppercase tracking-widest text-[var(--accent-saffron)] font-bold">
                  Founder-Acharya
                </div>
                <div className="mt-1 font-display text-sm font-bold text-[var(--text-primary)]">
                  His Divine Grace
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[var(--accent-gold)]" />
                <span className="font-display text-[12px] uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">
                  Our Tradition
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,4.5vw,3.5rem)] font-bold text-[var(--text-primary)] leading-tight">
                Srila{" "}
                <span className="text-[var(--accent-saffron)]">Prabhupada</span>
              </h2>
              <p className="font-body text-[1.1rem] leading-relaxed text-[var(--text-secondary)]">
                His Divine Grace A.C. Bhaktivedanta Swami Prabhupada carried the
                mission of Krishna-bhakti from the ancient soil of Vrindavan to
                every corner of the world. Every temple, class, and kirtan in
                ISKCON Greater Noida stands on the spiritual foundation he
                established.
              </p>
            </div>

            {/* Large Pull Quote */}
            <div className="relative pl-10 py-4 border-l-4 border-[var(--accent-saffron)] bg-white/40 rounded-r-2xl shadow-sm">
              <Quote className="absolute top-2 left-2 w-6 h-6 text-[var(--accent-saffron)] opacity-20" />
              <blockquote className="font-display text-[1.4rem] md:text-[1.8rem] italic leading-relaxed text-[var(--text-primary)] font-medium">
                “Please come here, chant Hare Krishna, take prasadam, and your
                life will become sublime.”
              </blockquote>
            </div>

            {/* Milestones / Timeline-lite */}
            <div className="grid gap-4">
              {prabhupadaMilestones.map((milestone) => (
                <div key={milestone} className="flex items-start gap-4">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[var(--accent-gold)] shadow-[0_0_8px_var(--accent-gold)] flex-shrink-0" />
                  <p className="font-body text-[1rem] leading-relaxed text-[var(--text-secondary)]">
                    {milestone}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#about"
                className="rounded-xl bg-[var(--accent-gold)] px-8 py-4 font-display text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                Learn Our Tradition ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
