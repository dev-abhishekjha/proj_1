"use client";

export default function CTABanner() {
  return (
    <section className="cta-banner bg-[var(--elevated)] border-t border-b border-[var(--border)] py-20 text-center overflow-hidden relative">
      {/* Rotating OM Symbol */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          animation: "slowSpin 40s linear infinite",
        }}
      >
        <span className="text-[20rem] text-[#00F5FF] opacity-[0.03] font-serif">
          ॐ
        </span>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="font-[Crimson_Pro] text-[#00F5FF] italic text-xl mb-6">
            Hare Krishna Hare Krishna Krishna Krishna Hare Hare · Hare Rama Hare
            Rama Rama Rama Hare Hare
          </div>
          <h2 className="font-[Cinzel] text-4xl lg:text-5xl font-semibold text-white mb-4">
            Come, Experience the Divine
          </h2>
          <p className="text-[#888] text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            All are welcome — regardless of background, faith, or origin.
            Krishna's temple is open for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] hover:from-[#00F5FF]/90 hover:to-[#8B5CF6]/90 text-white px-8 py-4 rounded-lg font-[Cinzel] text-sm uppercase tracking-[0.08em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
            >
              Visit the Temple ↗
            </a>
            <a
              href="#donate"
              className="inline-flex items-center justify-center gap-2 bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white px-8 py-4 rounded-lg font-[Cinzel] text-sm uppercase tracking-[0.08em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            >
              Support Our Mission
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
