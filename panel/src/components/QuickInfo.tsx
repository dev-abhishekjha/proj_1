import React from "react";

const quickCards = [
  {
    icon: "🕐",
    iconClass: "icon-gold",
    title: "Daily Darshan",
    body: "Morning: 4:30 AM – 12:00 PM · Evening: 4:00 PM – 9:30 PM",
    link: { label: "View All Timings →", href: "#timings" },
  },
  {
    icon: "🎵",
    iconClass: "icon-saffron",
    title: "Sunday Love Feast",
    body: "Kirtan, Discourse & Prasadam · Every Sunday: 7:00 – 9:30 PM",
    link: { label: "View Programs →", href: "#programs" },
  },
  {
    icon: "🍱",
    iconClass: "icon-gold",
    title: "Food for Life",
    body: "500+ meals served daily · Join as a volunteer",
    link: { label: "Learn More →", href: "#ffl" },
  },
];

export default function QuickInfo() {
  return (
    <section className="quick-section z-5 w-full border-t border-b border-[var(--border)] bg-[var(--border)] grid grid-cols-1 md:grid-cols-3 gap-[1px]">
      {quickCards.map((card, i) => (
        <div
          key={card.title}
          className="quick-card group bg-[var(--surface)] p-8 flex flex-col gap-3 items-start hover:bg-[var(--elevated)] transition-colors duration-200 relative overflow-hidden cursor-pointer"
          onClick={() => {
            if (typeof window !== "undefined")
              window.location.hash = card.link.href;
          }}
        >
          <div
            className={`icon-box ${card.iconClass} w-[38px] h-[38px] rounded-[9px] flex items-center justify-center text-[1.1rem] mb-2 border ${card.iconClass === "icon-gold" ? "bg-[#001A1E] border-[#00F5FF44]" : "bg-[#160B2E] border-[#8B5CF644]"}`}
          >
            {card.icon}
          </div>
          <h3 className="font-cinzel text-[1.1rem] font-semibold text-[var(--text-primary)] mb-1">
            {card.title}
          </h3>
          <div className="font-crimson text-[0.98rem] text-[var(--text-secondary)] mb-2">
            {card.body}
          </div>
          <a
            href={card.link.href}
            className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-gold)] mt-auto hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {card.link.label}
          </a>
          {/* Bottom border reveal on hover */}
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[var(--accent-gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
      ))}
    </section>
  );
}
