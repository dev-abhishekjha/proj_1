"use client";

import { format, isAfter, isSameDay, parseISO } from "date-fns";
import { Bell, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { vaishnavaHighlights } from "@/lib/temple-data";

export default function VedicCalendar() {
  const today = new Date();

  // Logic to find the current/most recent observance and the next one
  const { currentFocus, nextHighlight } = useMemo(() => {
    const sorted = [...vaishnavaHighlights].sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    let nextIndex = sorted.findIndex(
      (item) =>
        isAfter(parseISO(item.date), today) ||
        isSameDay(parseISO(item.date), today),
    );

    if (nextIndex === -1) nextIndex = sorted.length - 1;

    const next = sorted[nextIndex];
    const current = nextIndex > 0 ? sorted[nextIndex - 1] : sorted[0];

    return { currentFocus: current, nextHighlight: next };
  }, [today]);

  const [displayMonth, setDisplayMonth] = useState(
    parseISO(nextHighlight.date),
  );

  const highlightedDates = useMemo(() => {
    return vaishnavaHighlights.map((h) => parseISO(h.date));
  }, []);

  return (
    <section id="vedic-calendar" className="bg-[var(--bg)] py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <CalendarIcon className="w-4 h-4 text-[var(--accent-saffron)]" />
            <p className="font-cinzel text-sm uppercase tracking-[0.12em] text-[var(--accent-saffron)] font-bold">
              Vaishnava Calendar
            </p>
          </div>
          <h2 className="font-cinzel text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold lg:leading-tight">
            Sacred Rhythm & Observances
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1.1rem] leading-relaxed text-[var(--text-secondary)]">
            Plan your fasting, festivals, and seva around the Vaishnava
            calendar.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Calendar Widget */}
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--elevated)] p-4 shadow-inner">
              <Calendar
                mode="single"
                month={displayMonth}
                onMonthChange={setDisplayMonth}
                selected={parseISO(nextHighlight.date)}
                className="mx-auto"
                modifiers={{
                  highlighted: highlightedDates,
                }}
                modifiersStyles={{
                  highlighted: {
                    fontWeight: "bold",
                    color: "var(--accent-saffron)",
                    textDecoration: "underline decoration-2 underline-offset-4",
                  },
                }}
              />
            </div>

            <div className="mt-8 rounded-[24px] border border-[var(--border-gold)] bg-gradient-to-br from-[#fff9f0] to-[#fdf2e2] p-6">
              <div className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                Today
              </div>
              <div className="mt-2 font-cinzel text-2xl text-[var(--text-primary)]">
                {format(today, "EEEE, d MMMM yyyy")}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--accent-gold)]">
                <MapPin className="w-4 h-4" />
                <span>Greater Noida, India (IST)</span>
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--text-secondary)] italic">
                Dates and parana timings are calculated for Greater Noida
                coordinates.
              </p>
            </div>
          </div>

          {/* Highlights & Upcoming */}
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-[#ef4444]/20 bg-[#fff5f3] p-7 shadow-sm transition-transform hover:scale-[1.02]">
                <div className="font-cinzel text-[10px] uppercase tracking-widest text-[#b91c1c] font-bold">
                  Recent Focus
                </div>
                <h3 className="mt-3 font-cinzel text-2xl text-[var(--text-primary)]">
                  {currentFocus.title}
                </h3>
                <p className="mt-2 font-cinzel text-xs uppercase tracking-widest text-[#b91c1c]">
                  {format(parseISO(currentFocus.date), "d MMM yyyy")}
                </p>
                <p className="mt-4 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                  {currentFocus.note}
                </p>
              </div>

              <div className="relative rounded-[28px] border border-[var(--accent-gold)] bg-white p-7 shadow-lg transition-transform hover:scale-[1.02] overflow-hidden">
                <div className="absolute top-0 right-0 bg-[var(--accent-gold)] text-white px-4 py-1 font-cinzel text-[10px] uppercase tracking-tighter rounded-bl-xl">
                  Upcoming
                </div>
                <div className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                  Next Major Date
                </div>
                <h3 className="mt-3 font-cinzel text-2xl text-[var(--text-primary)]">
                  {nextHighlight.title}
                </h3>
                <p className="mt-2 font-cinzel text-xs uppercase tracking-widest text-[var(--accent-gold)]">
                  {format(parseISO(nextHighlight.date), "d MMM yyyy")}
                </p>
                <p className="mt-4 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                  {nextHighlight.note}
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-cinzel text-2xl text-[var(--text-primary)]">
                    Upcoming Observances
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Plan your next visit or fast
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-[var(--accent-saffron)] px-5 py-2 text-[var(--accent-saffron)] transition-all hover:bg-[var(--accent-saffron)] hover:text-white group"
                >
                  <Bell className="w-4 h-4 group-hover:animate-ring" />
                  <span className="font-cinzel text-[10px] uppercase tracking-widest font-bold">
                    Notify Me
                  </span>
                </button>
              </div>

              <div className="grid gap-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                {vaishnavaHighlights.map((item) => (
                  <div
                    key={`${item.date}-${item.title}`}
                    className="group grid gap-6 rounded-2xl border border-[var(--border)] bg-[var(--elevated)] p-5 transition-all hover:border-[var(--border-gold)] hover:shadow-md md:grid-cols-[100px_1fr]"
                  >
                    <div className="flex flex-col items-center justify-center rounded-xl bg-[rgba(183,121,31,0.06)] px-4 py-3 text-center group-hover:bg-[rgba(183,121,31,0.12)] transition-colors">
                      <div className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        {format(parseISO(item.date), "MMM")}
                      </div>
                      <div className="mt-1 font-cinzel text-3xl font-bold text-[var(--accent-gold)]">
                        {format(parseISO(item.date), "dd")}
                      </div>
                    </div>
                    <div>
                      <div className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-saffron)] font-bold">
                        {item.type}
                      </div>
                      <h4 className="mt-2 font-cinzel text-xl text-[var(--text-primary)]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
