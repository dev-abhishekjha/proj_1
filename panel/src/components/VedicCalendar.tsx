"use client";

import { format, isAfter, parseISO } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { vaishnavaHighlights } from "@/lib/temple-data";

export default function VedicCalendar() {
  const today = new Date();
  const currentFocus =
    [...vaishnavaHighlights]
      .reverse()
      .find((item) => !isAfter(parseISO(item.date), today)) ||
    vaishnavaHighlights[0];
  const nextHighlight =
    vaishnavaHighlights.find((item) => isAfter(parseISO(item.date), today)) ||
    vaishnavaHighlights[vaishnavaHighlights.length - 1];
  const [displayMonth, setDisplayMonth] = useState(
    parseISO(nextHighlight.date),
  );

  return (
    <section id="vedic-calendar" className="bg-[var(--bg)] py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="font-cinzel text-sm uppercase tracking-[0.12em] text-[var(--accent-saffron)]">
            Vaishnava Calendar
          </p>
          <h2 className="mt-3 font-cinzel text-3xl font-semibold lg:text-4xl">
            Ekadashi, festivals, and auspicious reminders
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
            A weekly-return section for devotees to check the current devotional
            rhythm, plan fasting, and prepare for the next major observance.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--elevated)] p-4">
              <Calendar
                mode="single"
                month={displayMonth}
                onMonthChange={setDisplayMonth}
                selected={parseISO(nextHighlight.date)}
                className="mx-auto bg-transparent"
              />
            </div>

            <div className="mt-6 rounded-[20px] border border-[var(--border)] bg-[linear-gradient(135deg,#fff9ef_0%,#f3e2c7_100%)] p-5">
              <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Today
              </div>
              <div className="mt-2 font-cinzel text-2xl text-[var(--text-primary)]">
                {format(today, "EEEE, d MMMM yyyy")}
              </div>
              <p className="mt-3 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                The highlighted observance is the next temple focus. Exact
                parana timing should still be confirmed with the local temple
                noticeboard.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-[#ef4444]/20 bg-[#fff5f3] p-6 shadow-[var(--shadow-soft)]">
                <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[#b91c1c]">
                  Current Focus
                </div>
                <h3 className="mt-3 font-cinzel text-2xl text-[var(--text-primary)]">
                  {currentFocus.title}
                </h3>
                <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.08em] text-[#b91c1c]">
                  {format(parseISO(currentFocus.date), "d MMM yyyy")}
                </p>
                <p className="mt-3 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                  {currentFocus.note}
                </p>
              </div>

              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
                <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-gold)]">
                  Next Major Date
                </div>
                <h3 className="mt-3 font-cinzel text-2xl text-[var(--text-primary)]">
                  {nextHighlight.title}
                </h3>
                <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--accent-gold)]">
                  {format(parseISO(nextHighlight.date), "d MMM yyyy")}
                </p>
                <p className="mt-3 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                  {nextHighlight.note}
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-gold)]">
                    Upcoming Observances
                  </div>
                  <h3 className="mt-2 font-cinzel text-2xl text-[var(--text-primary)]">
                    Plan your next visit, fast, or seva
                  </h3>
                </div>
                <a
                  href="#donate"
                  className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-saffron)]"
                >
                  Sponsor a festival seva ↗
                </a>
              </div>

              <div className="space-y-3">
                {vaishnavaHighlights.map((item) => (
                  <div
                    key={`${item.date}-${item.title}`}
                    className="grid gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--elevated)] p-5 md:grid-cols-[120px_1fr]"
                  >
                    <div className="rounded-[16px] bg-[rgba(183,121,31,0.08)] px-4 py-3 text-center">
                      <div className="font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
                        {format(parseISO(item.date), "MMM")}
                      </div>
                      <div className="mt-1 font-cinzel text-3xl text-[var(--accent-gold)]">
                        {format(parseISO(item.date), "dd")}
                      </div>
                    </div>
                    <div>
                      <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-saffron)]">
                        {item.type}
                      </div>
                      <h4 className="mt-2 font-cinzel text-xl text-[var(--text-primary)]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
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
