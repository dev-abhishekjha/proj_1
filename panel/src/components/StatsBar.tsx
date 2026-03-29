import React from "react";

const stats = [
  { label: "Meals Daily", value: "500+", color: "var(--accent-gold)" },
  { label: "Active Volunteers", value: "50+", color: "var(--accent-saffron)" },
  { label: "Years of Service", value: "10+", color: "var(--accent-gold)" },
  { label: "Weekly Programs", value: "6+", color: "var(--accent-saffron)" },
];

export default function StatsBar() {
  return (
    <section className="stats-bar w-full bg-[#0C0910] border-t border-b border-[var(--border)] py-12 grid grid-cols-2 md:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col items-center justify-center px-2 relative reveal ${i === 0 ? "" : ""}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {/* Divider between items except last */}
          {i < stats.length - 1 && (
            <span className="hidden md:block absolute right-0 top-[20%] h-[60%] w-[1px] bg-[var(--border)]" />
          )}
          <span
            className="font-cinzel text-[2.4rem] font-semibold"
            style={{ color: stat.color }}
          >
            {stat.value}
          </span>
          <span className="font-cinzel text-[11px] text-[#555] uppercase tracking-widest mt-1">
            {stat.label}
          </span>
        </div>
      ))}
      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
