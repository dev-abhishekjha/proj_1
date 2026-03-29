import React from "react";

const programs = [
  {
    icon: "🎵",
    tag: { label: "Sunday", color: "saffron" },
    title: "Sunday Love Feast",
    desc: "An evening of kirtan, discourse on Bhagavad-gita, arati, and prasadam distribution. The highlight of our weekly calendar.",
    meta: "Every Sunday · 7:00 – 9:30 PM",
  },
  {
    icon: "🎶",
    tag: { label: "Sunday", color: "gold" },
    title: "Sunday Harinam",
    desc: "Congregational chanting through the streets of Greater Noida. Experience the bliss of public kirtan. Join us for this weekly street procession.",
    meta: "Every Sunday · 5:00 – 7:00 PM",
  },
  {
    icon: "📚",
    tag: { label: "Youth", color: "saffron" },
    title: "Prahlad School",
    desc: "Vedic education for children — Sanskrit, stories from Bhagavatam, art, music, and moral values. Building the next generation of conscious citizens.",
    meta: "Sundays · 10:00 AM – 12:00 PM",
  },
  {
    icon: "🌺",
    tag: { label: "Weekly", color: "gold" },
    title: "Bhakti Vriksha",
    desc: "Small home-based devotional group sessions for spiritual growth. Study of Vedic scriptures in a personal, intimate setting.",
    meta: "Weekdays (contact for schedule)",
  },
  {
    icon: "🌟",
    tag: { label: "Youth", color: "saffron" },
    title: "IYF — Youth Forum",
    desc: "ISCON Youth Forum connects college students and young professionals with Krishna consciousness through events, seminars, and outreach.",
    meta: "Monthly events · NCR-wide",
  },
  {
    icon: "📖",
    tag: { label: "Daily", color: "gold" },
    title: "Bhagavad Gita Class",
    desc: "In-depth Bhagavad-gita study class with verse-by-verse explanation. Open to all levels — beginners to advanced students of Vedic philosophy.",
    meta: "Daily · 7:00 – 8:00 AM",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="bg-[var(--bg)] py-24">
      <div className="container mx-auto px-7">
        <span className="font-cinzel text-[10px] tracking-widest uppercase text-[var(--accent-gold)]">
          Spiritual Activities
        </span>
        <h2 className="mt-2 mb-2 bg-gradient-to-r from-[#5e3711] via-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text font-cinzel text-[clamp(1.9rem,3.2vw,2.4rem)] font-medium text-transparent">
          Our Programs & Events
        </h2>
        <div className="font-crimson text-[1.05rem] text-[var(--text-secondary)] mb-10">
          Engaging activities for devotees of all ages and backgrounds — from
          kirtan to Vedic education
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programs.map((p, i) => (
            <div
              key={p.title}
              className="prog-card bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6 pb-8 relative overflow-hidden hover:border-[var(--accent-gold)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-200"
            >
              {/* Top bar line on hover */}
              <span className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-2xl ${p.tag.color === "gold" ? "text-[var(--accent-gold)]" : "text-[var(--accent-saffron)]"}`}
                >
                  {p.icon}
                </span>
                <span
                  className={`prog-tag px-2 py-1 rounded-full text-xs font-cinzel border ${p.tag.color === "gold" ? "text-[var(--accent-gold)] border-[#00F5FF44] bg-[#001A1E]" : "text-[var(--accent-saffron)] border-[#8B5CF644] bg-[#160B2E]"}`}
                >
                  {p.tag.label}
                </span>
              </div>
              <h3 className="font-cinzel text-[0.95rem] font-semibold text-[var(--text-primary)] mb-1">
                {p.title}
              </h3>
              <div className="font-crimson text-[0.95rem] text-[var(--text-secondary)] mb-2">
                {p.desc}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-1 h-1 rounded-full bg-[var(--accent-gold)]" />
                <span className="font-cinzel text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">
                  {p.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
