"use client";

import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";
import { eventCalendarEntries } from "@/lib/temple-data";

export default function Festivals() {
  const [month, setMonth] = useState(parseISO(eventCalendarEntries[0].date));
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = useMemo(() => {
    const result: Date[] = [];
    const cursor = new Date(calendarStart);

    while (cursor <= calendarEnd) {
      result.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    return result;
  }, [calendarEnd, calendarStart]);

  const monthEvents = eventCalendarEntries.filter((entry) =>
    isSameMonth(parseISO(entry.date), month),
  );

  const selectedDay =
    monthEvents[0] != null ? parseISO(monthEvents[0].date) : monthStart;

  return (
    <section id="festivals" className="bg-[var(--bg)] py-24">
      <div className="container mx-auto px-7">
        <span className="font-cinzel text-[10px] tracking-widest uppercase text-[var(--accent-gold)]">
          Sacred Celebrations
        </span>
        <h2 className="font-cinzel text-[clamp(1.9rem,3.2vw,2.4rem)] font-medium text-[var(--text-primary)] mt-2 mb-2">
          Interactive Events Calendar
        </h2>
        <div className="font-crimson text-[1.05rem] text-[var(--text-secondary)] mb-10">
          Browse Ekadashis, Sunday programs, classes, and major temple festivals
          month by month.
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setMonth((current) => addMonths(current, -1))}
                className="rounded-full border border-[var(--border)] bg-[var(--elevated)] px-4 py-2 font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--text-secondary)]"
              >
                ← Prev
              </button>
              <div className="font-cinzel text-xl text-[var(--text-primary)]">
                {format(month, "MMMM yyyy")}
              </div>
              <button
                type="button"
                onClick={() => setMonth((current) => addMonths(current, 1))}
                className="rounded-full border border-[var(--border)] bg-[var(--elevated)] px-4 py-2 font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--text-secondary)]"
              >
                Next →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="pb-2 text-center font-cinzel text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]"
                >
                  {day}
                </div>
              ))}
              {days.map((day) => {
                const dayEvents = eventCalendarEntries.filter((entry) =>
                  isSameDay(parseISO(entry.date), day),
                );

                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-[92px] rounded-[16px] border p-3 ${
                      isSameMonth(day, month)
                        ? "border-[var(--border)] bg-[var(--elevated)]"
                        : "border-transparent bg-[rgba(255,255,255,0.32)] text-[var(--text-muted)]"
                    } ${dayEvents.length > 0 ? "shadow-[var(--shadow-soft)]" : ""}`}
                  >
                    <div className="font-cinzel text-sm text-[var(--text-primary)]">
                      {format(day, "d")}
                    </div>
                    <div className="mt-2 space-y-1">
                      {dayEvents.slice(0, 2).map((entry) => (
                        <div
                          key={`${entry.date}-${entry.title}`}
                          className="rounded-full bg-[rgba(217,119,6,0.1)] px-2 py-1 font-cinzel text-[10px] uppercase tracking-[0.08em] text-[var(--accent-saffron)]"
                        >
                          {entry.type}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
            <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-gold)]">
              Events In {format(month, "MMMM")}
            </div>
            <div className="mt-5 space-y-3">
              {monthEvents.length > 0 ? (
                monthEvents.map((event) => (
                  <div
                    key={`${event.date}-${event.title}`}
                    className={`rounded-[18px] border p-5 ${
                      isSameDay(parseISO(event.date), selectedDay)
                        ? "border-[var(--accent-gold)] bg-[rgba(183,121,31,0.08)]"
                        : "border-[var(--border)] bg-[var(--elevated)]"
                    }`}
                  >
                    <div className="font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--accent-saffron)]">
                      {event.type}
                    </div>
                    <h3 className="mt-2 font-cinzel text-lg text-[var(--text-primary)]">
                      {event.title}
                    </h3>
                    <p className="mt-1 font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
                      {format(parseISO(event.date), "EEEE, d MMMM yyyy")}
                    </p>
                    <p className="mt-3 font-crimson text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                      {event.summary}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[18px] border border-[var(--border)] bg-[var(--elevated)] p-5 font-crimson text-[1rem] leading-7 text-[var(--text-secondary)]">
                  No listed events for this month yet. Use the previous or next
                  controls to browse temple observances.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
