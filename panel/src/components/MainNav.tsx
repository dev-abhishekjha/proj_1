"use client";

import { ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { sectionSearchEntries } from "@/lib/temple-data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Founder", href: "#founder" },
  { label: "Timings", href: "#timings" },
  { label: "Programs", href: "#programs" },
  { label: "Seva", href: "#donate" },
  { label: "Calendar", href: "#vedic-calendar" },
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
      className="nav fixed top-[36px] left-0 z-[9000] flex h-[var(--nav-h)] w-full items-center border-b border-[var(--border)] bg-white/90 backdrop-blur-xl transition-all duration-300 md:top-[36px]"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-5 md:px-7">
        <a href="#home" className="logo flex items-center gap-3">
          <span className="logo-mark flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-gold)] bg-white shadow-sm">
            <Image
              src="/logo.jpg"
              alt="ISKCON Greater Noida logo"
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.2rem] font-bold tracking-tight text-[var(--text-primary)]">
              ISKCON
            </span>
            <span className="mt-0.5 font-display text-[10px] uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">
              Greater Noida
            </span>
          </span>
        </a>

        <nav className="nav-links hidden h-full items-center gap-2 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 font-display text-[12px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-saffron)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden 2xl:block">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-[180px] rounded-xl border border-[var(--border)] bg-[var(--bg)] pl-9 pr-4 py-2 font-body text-sm text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none transition-all focus:w-[240px]"
              />
            </div>
            {results.length > 0 && (
              <div className="absolute right-0 mt-3 w-[300px] overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border)]/30 mb-1">
                  Found {results.length} sections
                </div>
                {results.slice(0, 6).map((result) => (
                  <a
                    key={result.href}
                    href={result.href}
                    onClick={() => setQuery("")}
                    className="flex items-center justify-between group rounded-xl px-4 py-3 font-display text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg)] hover:text-[var(--accent-saffron)] transition-all"
                  >
                    {result.label}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Language Toggle */}
          <div className="hidden items-center rounded-xl border border-[var(--border)] bg-[var(--bg)] p-1 md:flex">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`flex items-center gap-1 rounded-[8px] px-3 py-1.5 font-display text-[10px] font-bold tracking-widest transition-all ${
                language === "en"
                  ? "bg-white text-[var(--accent-gold)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`flex items-center gap-1 rounded-[8px] px-3 py-1.5 font-display text-[10px] font-bold tracking-widest transition-all ${
                language === "hi"
                  ? "bg-white text-[var(--accent-gold)] shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              HI
            </button>
          </div>

          <a
            href="#donate"
            className="rounded-xl bg-[var(--accent-saffron)] px-6 py-2.5 font-display text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-saffron-500/20 hover:-translate-y-0.5 hover:brightness-110 active:scale-95 transition-all"
          >
            {language === "hi" ? "दान करें" : "Donate"}
          </a>
        </div>
      </div>
    </header>
  );
}
