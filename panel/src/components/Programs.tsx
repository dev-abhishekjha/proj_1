"use client";
import {
  Bell,
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  Heart,
  Music,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

const programs = [
  {
    icon: Music,
    tag: { label: "Weekly", color: "saffron" },
    title: "Sunday Love Feast",
    desc: "An evening of kirtan, discourse on Bhagavad-gita, arati, and delicious prasadam. The highlight of our weekly temple gathering.",
    meta: "Every Sunday · 7:00 – 9:30 PM",
    featured: true,
  },
  {
    icon: Star,
    tag: { label: "Weekly", color: "gold" },
    title: "Sunday Harinam",
    desc: "Experience the bliss of public kirtan as we chant through the streets of Greater Noida. Join our weekly street procession.",
    meta: "Every Sunday · 5:00 – 7:00 PM",
  },
  {
    icon: GraduationCap,
    tag: { label: "Weekly", color: "green" },
    title: "Prahlad School",
    desc: "Vedic education for children — Sanskrit, stories from Bhagavatam, art, music, and moral values. Building conscious citizens.",
    meta: "Sundays · 10:00 AM – 12:00 PM",
  },
  {
    icon: Heart,
    tag: { label: "Weekly", color: "saffron" },
    title: "Bhakti Vriksha",
    desc: "Small home-based devotional groups for spiritual growth. Study Vedic scriptures in a personal, intimate setting with devotees.",
    meta: "Weekdays (Contact for schedule)",
  },
  {
    icon: Users,
    tag: { label: "Monthly", color: "blue" },
    title: "IYF — Youth Forum",
    desc: "Connecting students and young professionals through events, seminars, and outreach in a supportive spiritual community.",
    meta: "Monthly events · NCR-wide",
  },
  {
    icon: BookOpen,
    tag: { label: "Daily", color: "green" },
    title: "Bhagavad Gita Class",
    desc: "In-depth scriptural study with verse-by-verse explanation. Open to all levels — from beginners to advanced students.",
    meta: "Daily · 7:00 – 8:00 AM",
  },
];

const tagColors: Record<string, string> = {
  saffron:
    "bg-[var(--accent-saffron)]/10 text-[var(--accent-saffron)] border-[var(--accent-saffron)]/20",
  gold: "bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] border-[var(--accent-gold)]/20",
  green: "bg-green-100 text-green-700 border-green-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function Programs() {
  const featuredProgram = programs.find((p) => p.featured);
  const regularPrograms = programs.filter((p) => !p.featured);

  return (
    <section id="programs" className="bg-[var(--bg)] py-20">
      <div className="container mx-auto px-7">
        <div className="mb-12 text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
            <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--accent-gold)] font-bold">
              Spiritual Activities
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-[var(--text-primary)] leading-tight">
            Programs &{" "}
            <span className="text-[var(--accent-saffron)]">Events</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-body text-[1.1rem] text-[var(--text-secondary)]">
            Engaging activities for devotees of all ages — from vibrant kirtan
            to deep Vedic wisdom.
          </p>
        </div>

        {/* Featured Program Card */}
        {featuredProgram && (
          <div className="mb-10 overflow-hidden rounded-[32px] border border-[var(--accent-gold)] bg-gradient-to-br from-white to-[#fff9f0] shadow-xl">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${tagColors[featuredProgram.tag.color]}`}
                  >
                    {featuredProgram.tag.label}
                  </span>
                  <div className="flex items-center gap-1 text-[var(--accent-gold)]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Featured
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                  {featuredProgram.title}
                </h3>
                <p className="font-body text-[1.1rem] leading-relaxed text-[var(--text-secondary)] mb-8">
                  {featuredProgram.desc}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span className="font-display text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                      {featuredProgram.meta}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-xl bg-[var(--accent-saffron)] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:shadow-lg active:scale-95"
                    >
                      <Bell className="w-3 h-3" />
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-[var(--accent-gold)]/10 z-10" />
                <Image
                  src="/gallery2.jpeg"
                  alt="Sunday Love Feast at ISKCON Greater Noida"
                  fill
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>
        )}

        {/* Regular Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPrograms.map((p) => (
            <div
              key={p.title}
              className="group bg-white border border-[var(--border)] rounded-2xl p-8 transition-all duration-300 hover:border-[var(--accent-gold)] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg)] text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-white transition-colors">
                  <p.icon className="w-6 h-6" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${tagColors[p.tag.color]}`}
                >
                  {p.tag.label}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                {p.title}
              </h3>
              <p className="font-body text-[0.95rem] leading-relaxed text-[var(--text-secondary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                {p.desc}
              </p>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-[var(--accent-gold)]" />
                  <span className="font-display text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {p.meta}
                  </span>
                </div>
                <button
                  type="button"
                  className="text-[var(--accent-gold)] opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
