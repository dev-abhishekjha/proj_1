"use client";

import { BookOpen, Heart, Music, Utensils } from "lucide-react";
import Image from "next/image";

const practices = [
  {
    title: "Maha-mantra Chanting",
    desc: "Experience peace through congregational chanting (Kirtan) and personal meditation.",
    icon: Music,
  },
  {
    title: "Deity Worship",
    desc: "Witness the divine arati ceremonies and beautifully dressed deities throughout the day.",
    icon: Heart,
  },
  {
    title: "Scriptural Wisdom",
    desc: "Dive deep into the teachings of Bhagavad-gita and Srimad-Bhagavatam classes.",
    icon: BookOpen,
  },
  {
    title: "Prasadam Seva",
    desc: "Nourish your soul with sanctified vegetarian meals distributed daily with love.",
    icon: Utensils,
  },
];

export default function About() {
  return (
    <section id="about" className="about section bg-[var(--bg)] py-20">
      <div className="container mx-auto px-7">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] items-center">
          {/* Left: Image Container */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-[var(--accent-gold)] opacity-[0.08] blur-2xl rounded-full" />
            <div className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-xl">
              <Image
                src="/gallery1.jpeg"
                alt="ISKCON Greater Noida Temple Altar"
                width={600}
                height={800}
                className="h-[600px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,31,14,0.6)] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-display text-white text-2xl font-semibold">
                  A Sanctuary of Peace
                </div>
                <div className="mt-2 h-1 w-12 bg-[var(--accent-gold)]" />
              </div>
            </div>
          </div>

          {/* Right: Content Container */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[var(--accent-gold)]" />
                <span className="font-display text-[12px] uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">
                  Established 2015
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-[var(--text-primary)] leading-tight">
                About ISKCON <br />
                <span className="text-[var(--accent-saffron)]">
                  Greater Noida
                </span>
              </h2>
              <p className="font-body text-[1.1rem] leading-relaxed text-[var(--text-secondary)]">
                Inaugurated on 14 July 2015 by HH Lokanath Swami Maharaj, ISKCON
                Greater Noida serves as a vibrant center for spiritual awakening
                and community welfare in the heart of the city.
              </p>
            </div>

            {/* Icon Grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {practices.map((item) => (
                <div
                  key={item.title}
                  className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[var(--accent-gold)] hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg)] text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#connect"
                className="rounded-xl bg-[var(--accent-saffron)] px-8 py-4 font-display text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                Join Our Community ↗
              </a>
              <a
                href="#founder"
                className="rounded-xl border-2 border-[var(--border-gold)] bg-transparent px-8 py-4 font-display text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-gold)] hover:text-white active:scale-95"
              >
                Meet Our Founder
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
