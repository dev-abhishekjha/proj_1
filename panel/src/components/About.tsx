"use client";

import { useState } from "react";

const practices = [
  "Chanting the Hare Krishna maha-mantra",
  "Daily deity worship and arati ceremonies",
  "Study of Bhagavad-gita and Srimad-Bhagavatam",
  "Prasadam distribution and community seva",
];

const timings = [
  { label: "Morning", value: "4:30 AM - 12:00 PM" },
  { label: "Evening", value: "4:00 PM - 9:30 PM" },
  { label: "Main Arati", value: "Mangala 4:30 AM · Sandhya 6:45 PM" },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="about section bg-[var(--bg)]">
      <div className="container mx-auto px-7">
        <div className="mx-auto max-w-5xl rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)] md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="flex flex-col gap-5">
              <span className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-gold)]">
                Our Temple
              </span>
              <h2 className="font-cinzel text-[clamp(1.9rem,3.2vw,2.6rem)] font-medium text-[var(--text-primary)]">
                About ISKCON Greater Noida
              </h2>
              <p className="font-crimson text-[1.05rem] leading-8 text-[var(--text-secondary)]">
                ISKCON Greater Noida is a center for devotional practice,
                spiritual learning, kirtan, prasadam distribution, and community
                service. Founded in the Gaudiya Vaishnava tradition, the temple
                welcomes everyone seeking peace, wisdom, and a deeper connection
                with Krishna.
              </p>
              <p className="font-crimson text-[1.05rem] leading-8 text-[var(--text-secondary)]">
                The Greater Noida center was inaugurated on{" "}
                <strong className="text-[var(--accent-gold)]">
                  14 July 2015
                </strong>{" "}
                by{" "}
                <strong className="text-[var(--accent-gold)]">
                  His Holiness Lokanath Swami Maharaj
                </strong>
                , and continues to serve devotees and visitors through daily
                darshan, classes, festivals, and outreach activities.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {practices.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[12px] border border-[var(--border)] bg-[var(--elevated)] px-4 py-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent-gold)]" />
                    <span className="font-crimson text-[0.98rem] text-[var(--text-secondary)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              {expanded ? (
                <div className="space-y-4 rounded-[18px] border border-[var(--border)] bg-[#fffaf3] p-5">
                  <p className="font-crimson text-[1rem] leading-8 text-[var(--text-secondary)]">
                    The International Society for Krishna Consciousness was
                    founded in{" "}
                    <strong className="text-[var(--accent-gold)]">1966</strong>{" "}
                    by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.
                    ISKCON teaches bhakti-yoga, a life of loving devotional
                    service centered on hearing, chanting, studying scripture,
                    and honoring prasadam.
                  </p>
                  <p className="font-crimson text-[1rem] leading-8 text-[var(--text-secondary)]">
                    At ISKCON Greater Noida, devotees gather for Mangala Arati,
                    Bhagavatam and Gita classes, Sunday programs, youth
                    engagement, festivals, and Food for Life service. The temple
                    strives to make spiritual culture approachable for families,
                    students, and first-time visitors alike.
                  </p>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  className="rounded-[8px] border border-[var(--accent-gold)] px-6 py-3 font-cinzel text-[0.78rem] font-medium uppercase tracking-wider text-[var(--accent-gold)] hover:bg-[var(--accent-glow)]"
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
                <a
                  href="#founder"
                  className="rounded-[8px] border border-[var(--border-gold)] px-6 py-3 font-cinzel text-[0.78rem] font-medium uppercase tracking-wider text-[var(--accent-gold)] hover:bg-[var(--accent-glow)]"
                >
                  Meet Our Founder ↗
                </a>
                <a
                  href="#connect"
                  className="rounded-[8px] bg-[var(--accent-saffron)] px-6 py-3 font-cinzel text-[0.78rem] font-medium uppercase tracking-wider text-white shadow-[0_12px_24px_rgba(217,119,6,0.22)] hover:-translate-y-0.5 hover:brightness-105"
                >
                  Join Our Community ↗
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-5 rounded-[20px] border border-[var(--border)] bg-[#fffaf2] p-6">
              <div>
                <span className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-saffron)]">
                  Temple Timings
                </span>
                <h3 className="mt-2 font-cinzel text-[1.5rem] text-[var(--text-primary)]">
                  Visit for Darshan
                </h3>
              </div>
              <div className="space-y-3">
                {timings.map((timing) => (
                  <div
                    key={timing.label}
                    className="rounded-[14px] border border-[var(--border)] bg-[var(--elevated)] px-4 py-4"
                  >
                    <div className="font-cinzel text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                      {timing.label}
                    </div>
                    <div className="mt-1 font-crimson text-[1.05rem] text-[var(--text-primary)]">
                      {timing.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-[14px] border border-[var(--border)] bg-[rgba(217,119,6,0.08)] px-4 py-4">
                <div className="font-cinzel text-[11px] uppercase tracking-widest text-[var(--accent-gold)]">
                  Quick Note
                </div>
                <p className="mt-2 font-crimson text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                  All are welcome. For the full daily schedule and ceremony
                  details, open the temple timings section below.
                </p>
              </div>
              <a
                href="#timings"
                className="inline-flex items-center justify-center rounded-[8px] bg-[var(--accent-gold)] px-6 py-3 font-cinzel text-[0.78rem] font-medium uppercase tracking-wider text-white shadow-[0_12px_24px_rgba(183,121,31,0.18)] hover:-translate-y-0.5 hover:brightness-105"
              >
                View Full Timings ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
