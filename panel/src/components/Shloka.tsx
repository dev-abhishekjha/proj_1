"use client";
import React, { useState } from "react";

const shlokas = [
  {
    label: "Bhagavad-gita",
    sanskrit:
      "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। / अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    translation:
      "Abandon all varieties of dharma and simply surrender unto Me. I shall liberate you from all sinful reactions. Do not fear.",
    source: "— Bhagavad-gita 18.66 · Spoken by Lord Sri Krishna to Arjuna",
  },
  {
    label: "Srimad-Bhagavatam",
    sanskrit:
      "नायमात्मा प्रवचनेन लभ्यो न मेधया न बहुना श्रुतेन। / यमेवैष वृणुते तेन लभ्यस्तस्यैष आत्मा विवृणुते तनूं स्वाम्॥",
    translation:
      "The Supreme cannot be attained by speech, by the mind, or by much learning. He is attained only by the one whom He Himself chooses.",
    source: "— Srimad-Bhagavatam 1.2.12 · Suta Goswami speaking",
  },
  {
    label: "Nectar of Devotion",
    sanskrit:
      "तं दुर्दर्शं गूढमनुप्रविष्टं गुहाहितं गह्वरेष्ठं पुराणम्। / अध्यात्मयोगाधिगमेन देवं मत्वा धीरो हर्षशोकौ जहाति॥",
    translation:
      "He who, by realising the ancient and self-luminous Atman hidden in the cave of the heart, abandons both joy and sorrow — that wise person attains liberation.",
    source: "— Nectar of Devotion · Srila Rupa Goswami",
  },
];

export default function Shloka() {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(false);

  function handleToggle(idx: number) {
    if (idx === active) return;
    setFade(true);
    setTimeout(() => {
      setActive(idx);
      setFade(false);
    }, 220);
  }

  return (
    <section
      id="shloka"
      className="bg-[var(--surface)] border-t border-b border-[var(--border)] py-[72px] overflow-hidden relative"
    >
      {/* OM symbol pseudo */}
      <span
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-[14rem] opacity-[0.03] text-[var(--accent-gold)] pointer-events-none select-none"
        style={{ fontFamily: "Cinzel" }}
      >
        ॐ
      </span>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-[72px] items-center px-7">
        {/* Left */}
        <div className="flex flex-col gap-5">
          <span className="font-cinzel text-[10px] tracking-widest uppercase text-[var(--accent-saffron)]">
            Verse of the Day
          </span>
          <h2 className="font-cinzel text-[clamp(1.9rem,3.2vw,2.4rem)] font-medium text-[var(--text-primary)]">
            Daily{" "}
            <span className="bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text text-transparent">
              Spiritual Wisdom
            </span>
          </h2>
          <div className="font-crimson text-[1.05rem] text-[var(--text-secondary)]">
            Begin each day with a verse from the sacred scriptures — the
            Bhagavad-gita and Srimad-Bhagavatam offer timeless guidance for
            modern life.
          </div>
          <div className="flex gap-2 mt-2">
            {shlokas.map((s, i) => (
              <button
                key={s.label}
                className={`shloka-btn font-cinzel text-xs px-4 py-2 rounded-full border transition-all duration-150 ${active === i ? "border-[var(--accent-gold)] text-[var(--accent-gold)] bg-[#00F5FF0A]" : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"}`}
                onClick={() => handleToggle(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        {/* Right — Shloka Card */}
        <div
          className={`shloka-card bg-[var(--elevated)] border border-[#1E2A3A] rounded-[14px] p-8 relative transition-all duration-200 ${fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
        >
          {/* Top cyan line */}
          <span className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent" />
          <div className="shloka-sanskrit font-crimson italic text-[1.25rem] text-[var(--accent-gold)] leading-[1.9] border-b border-[var(--border)] mb-4">
            {shlokas[active].sanskrit}
          </div>
          <div className="font-crimson text-[1rem] text-[var(--text-secondary)] leading-[1.85] mb-3">
            {shlokas[active].translation}
          </div>
          <div className="font-cinzel text-[10px] text-[#555] uppercase tracking-widest">
            {shlokas[active].source}
          </div>
        </div>
      </div>
    </section>
  );
}
