"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { sectionSearchEntries } from "@/lib/temple-data";

const navLinks = [
  { label: "About Temple", href: "#about" },
  { label: "Prabhupada", href: "#founder" },
  { label: "Darshan Timings", href: "#timings" },
  { label: "Visit Guide", href: "#visit-guide" },
  { label: "Programs", href: "#programs" },
  { label: "Vedic Calendar", href: "#vedic-calendar" },
];

export default function MainNav() {
  const { language, setLanguage } = useLanguage();
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return sectionSearchEntries.filter((entry) =>
      entry.label.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query]);

  return (
    <header
      id="mainNav"
      className="nav fixed top-0 left-0 z-[9000] flex h-[var(--nav-h)] w-full items-center border-b border-[var(--border)] bg-[rgba(255,252,246,0.9)] backdrop-blur-[16px]"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-5 md:px-7">
        <a href="#home" className="logo flex items-center gap-2">
          <span className="logo-mark flex h-10 w-10 items-center justify-center overflow-hidden rounded-[10px] border border-[var(--border-gold)] bg-gradient-to-br from-[#fff8ea] to-[#f1e0c3] shadow-[var(--shadow-soft)]">
            <Image
              src="/logo.jpg"
              alt="ISKCON Greater Noida logo"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-cinzel text-[1rem] font-semibold tracking-wider text-[var(--accent-gold)]">
              ISKCON
            </span>
            <span className="font-cinzel text-[0.6rem] uppercase tracking-widest text-[var(--text-muted)]">
              Greater Noida
            </span>
          </span>
        </a>

        <nav className="nav-links hidden h-full items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 font-cinzel text-[11px] tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent-saffron)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden 2xl:block">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections"
              className="w-[210px] rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-crimson text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
            />
            {results.length > 0 ? (
              <div className="absolute right-0 mt-2 w-[280px] rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow-soft)]">
                {results.slice(0, 6).map((result) => (
                  <a
                    key={result.href}
                    href={result.href}
                    onClick={() => setQuery("")}
                    className="block rounded-[10px] px-3 py-2 font-crimson text-sm text-[var(--text-secondary)] hover:bg-[rgba(217,119,6,0.06)] hover:text-[var(--accent-saffron)]"
                  >
                    {result.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div className="hidden items-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-1 md:flex">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-[8px] px-3 py-1.5 font-cinzel text-[0.68rem] uppercase tracking-[0.08em] ${
                language === "en"
                  ? "bg-[var(--accent-gold)] text-white"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`rounded-[8px] px-3 py-1.5 font-cinzel text-[0.68rem] uppercase tracking-[0.08em] ${
                language === "hi"
                  ? "bg-[var(--accent-gold)] text-white"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              HI
            </button>
          </div>
          <a
            href="#connect"
            className="hidden rounded-[8px] border border-[var(--accent-saffron)] px-4 py-2 font-cinzel text-[0.75rem] font-medium uppercase tracking-wider text-[var(--accent-saffron)] hover:bg-[var(--saffron-glow)] md:inline-flex"
          >
            {language === "hi" ? "संपर्क" : "Connect"}
          </a>
          <a
            href="#donate"
            className="rounded-[8px] bg-[var(--accent-saffron)] px-4 py-2 font-cinzel text-[0.75rem] font-medium uppercase tracking-wider text-white shadow-[0_12px_24px_rgba(217,119,6,0.22)] hover:-translate-y-0.5 hover:brightness-105"
          >
            {language === "hi" ? "अभी दान करें" : "Donate Now"}
          </a>
        </div>
      </div>
    </header>
  );
}
