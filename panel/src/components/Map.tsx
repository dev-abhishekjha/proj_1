"use client";

export default function Map() {
  return (
    <section id="map" className="bg-[var(--bg)] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 font-cinzel text-sm uppercase tracking-[0.12em] text-[var(--accent-saffron)]">
            Visit the Temple
          </p>
          <h2 className="mb-6 font-cinzel text-3xl font-semibold text-[var(--text-primary)] lg:text-4xl">
            Open the temple location in Google Maps
          </h2>
          <a
            href="https://maps.google.com/?q=A-49+Block+N+Zeta+I+Greater+Noida+201310"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-saffron)] px-7 py-4 font-cinzel text-sm uppercase tracking-[0.08em] text-white shadow-[0_14px_28px_rgba(217,119,6,0.24)] hover:-translate-y-0.5 hover:brightness-105"
          >
            Open Google Maps ↗
          </a>
        </div>
      </div>
    </section>
  );
}
