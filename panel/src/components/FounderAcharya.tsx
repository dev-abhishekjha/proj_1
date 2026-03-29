"use client";

import Image from "next/image";

const prabhupadaMilestones = [
  "Founded ISKCON in 1966 to share Krishna-bhakti around the world.",
  "Translated and commented on Bhagavad-gita and Srimad-Bhagavatam.",
  "Established the standard of kirtan, prasadam, deity worship, and daily sadhana in ISKCON temples.",
];

export default function FounderAcharya() {
  return (
    <section id="founder" className="bg-[var(--bg)] py-24">
      <div className="container mx-auto px-7">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(160deg,#fffaf2_0%,#f0e0c1_100%)] p-8 shadow-[var(--shadow-soft)] lg:p-10">
            <div className="relative mb-6 overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.45)] bg-[#f8ecd7]">
              <div className="relative aspect-[5/4] w-full">
                <Image
                  src="/prabhupada.jpeg"
                  alt="Srila Prabhupada"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="font-cinzel text-[11px] uppercase tracking-[0.14em] text-[var(--accent-saffron)]">
              Founder-Acharya
            </div>
            <h2 className="mt-4 font-cinzel text-[clamp(2rem,3.4vw,2.8rem)] font-semibold text-[var(--text-primary)]">
              Srila Prabhupada
            </h2>
            <p className="mt-4 font-crimson text-[1.06rem] leading-8 text-[var(--text-secondary)]">
              His Divine Grace A.C. Bhaktivedanta Swami Prabhupada is the
              founder-acharya of ISKCON. Every temple, class, kirtan, book
              table, and prasadam distribution effort stands on the mission he
              carried from Vrindavan to the world.
            </p>
            <blockquote className="mt-6 rounded-[22px] border border-[var(--border)] bg-[rgba(255,253,248,0.84)] p-6 font-crimson text-[1.12rem] italic leading-8 text-[var(--text-primary)]">
              “Please come here, chant Hare Krishna, take prasadam, and your
              life will become sublime.”
            </blockquote>
            <a
              href="#about"
              className="mt-6 inline-flex rounded-[10px] bg-[var(--accent-gold)] px-6 py-3 font-cinzel text-[0.78rem] uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(183,121,31,0.18)] hover:-translate-y-0.5 hover:brightness-105"
            >
              Learn Our Tradition ↗
            </a>
          </div>

          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)] lg:p-10">
            <div className="font-cinzel text-[11px] uppercase tracking-[0.14em] text-[var(--accent-gold)]">
              Why This Matters
            </div>
            <h3 className="mt-4 font-cinzel text-2xl text-[var(--text-primary)]">
              A living connection to guru, sadhu, and sastra
            </h3>
            <div className="mt-6 space-y-4">
              {prabhupadaMilestones.map((milestone) => (
                <div
                  key={milestone}
                  className="rounded-[18px] border border-[var(--border)] bg-[var(--elevated)] px-5 py-4"
                >
                  <div className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent-gold)]" />
                    <p className="font-crimson text-[1rem] leading-7 text-[var(--text-secondary)]">
                      {milestone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[20px] border border-[var(--border)] bg-[#fffaf3] p-5">
              <div className="font-cinzel text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                In This Temple
              </div>
              <p className="mt-3 font-crimson text-[1rem] leading-7 text-[var(--text-secondary)]">
                Visitors will hear Srila Prabhupada’s teachings in classes, find
                his books in outreach and gift areas, and experience the
                devotional culture he established for congregational worship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
