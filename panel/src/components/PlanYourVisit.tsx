"use client";

const visitCards = [
  {
    title: "How To Reach",
    body: "Reach via Greater Noida road network or plan the last-mile ride from the nearest metro corridor. Auto, cab, and private vehicle drop-off are all practical for first-time visitors.",
  },
  {
    title: "Parking & Entry",
    body: "Parking is easiest outside peak festival windows. Arrive 15 to 20 minutes before arati if you want calmer entry, shoe deposit time, and a comfortable place in the temple hall.",
  },
  {
    title: "Dress Code",
    body: "Modest clothing is best. Shoulders and knees should be covered. Traditional attire is welcome but not required, and clean, respectful clothing is ideal for darshan.",
  },
  {
    title: "Shoes & Photography",
    body: "Footwear should be left at the designated deposit area before entering the temple space. Photography is generally fine in public areas, but flash and altar-close shots should follow temple guidance.",
  },
  {
    title: "Families & Accessibility",
    body: "Families, children, and elders are welcome. If you are visiting with seniors or need extra access support, contact the temple ahead of time so the team can help smoothly.",
  },
  {
    title: "Best First Visit",
    body: "For a complete first experience, plan around Sandhya Arati, kirtan, and prasadam. Sunday programs are especially friendly for newcomers meeting the temple community.",
  },
];

export default function PlanYourVisit() {
  return (
    <section
      id="visit-guide"
      className="border-y border-[var(--border)] bg-[var(--surface)] py-24"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-cinzel text-sm uppercase tracking-[0.12em] text-[var(--accent-saffron)]">
              Plan Your Visit
            </p>
            <h2 className="mt-3 font-cinzel text-3xl font-semibold lg:text-4xl">
              Practical guidance for first-time visitors
            </h2>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
              Everything devotees usually ask before coming for darshan, arati,
              or a Sunday program, gathered into one place instead of being
              buried inside the FAQ.
            </p>
          </div>
          <a
            href="#map"
            className="inline-flex items-center justify-center rounded-[10px] bg-[var(--accent-saffron)] px-6 py-3 font-cinzel text-sm uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(217,119,6,0.22)] hover:-translate-y-0.5 hover:brightness-105"
          >
            Open Directions ↗
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visitCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[22px] border border-[var(--border)] bg-[var(--elevated)] p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-gold)]">
                Visitor Guide
              </div>
              <h3 className="mt-3 font-cinzel text-xl text-[var(--text-primary)]">
                {card.title}
              </h3>
              <p className="mt-3 font-crimson text-[1rem] leading-7 text-[var(--text-secondary)]">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-[var(--border)] bg-[linear-gradient(135deg,#fff9ef_0%,#f3e2c7_100%)] p-6 shadow-[var(--shadow-soft)]">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Helpful Reminder
              </div>
              <p className="mt-3 font-crimson text-[1.04rem] leading-8 text-[var(--text-secondary)]">
                Festival schedules, special queues, and photography rules can
                change on major observance days. If you are bringing a group or
                planning a first visit around a big celebration, message the
                temple in advance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href="#connect"
                className="rounded-[10px] border border-[var(--border-gold)] bg-[var(--elevated)] px-5 py-3 font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-gold)]"
              >
                Ask Before Visiting
              </a>
              <a
                href="#timings"
                className="rounded-[10px] bg-[var(--accent-gold)] px-5 py-3 font-cinzel text-xs uppercase tracking-[0.12em] text-white"
              >
                Check Darshan Timings
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
