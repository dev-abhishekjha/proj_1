"use client";

import {
  aratiWindows,
  LIVE_EMBED_URL,
  YOUTUBE_LIVE_URL,
} from "@/lib/temple-data";

export default function LiveDarshan() {
  const hasEmbed = Boolean(LIVE_EMBED_URL);

  return (
    <section
      id="live-darshan"
      className="border-y border-[var(--border)] bg-[linear-gradient(180deg,#fff8ef_0%,#f7ecdc_100%)] py-24"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ef4444]/20 bg-[#fff1ee] px-4 py-1.5">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#dc2626] animate-pulse" />
              <span className="font-cinzel text-[11px] uppercase tracking-[0.12em] text-[#b91c1c]">
                Live Darshan
              </span>
            </div>
            <h2 className="mt-5 font-cinzel text-3xl font-semibold lg:text-4xl">
              Watch arati and darshan from anywhere
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
              Devotees who cannot visit physically can still join the temple
              mood during mangala, raj bhog, and evening arati through our live
              stream.
            </p>
          </div>

          <a
            href={YOUTUBE_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#dc2626] px-6 py-3 font-cinzel text-sm uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_rgba(220,38,38,0.24)] hover:-translate-y-0.5 hover:bg-[#b91c1c]"
          >
            Watch Live on YouTube
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
            {hasEmbed ? (
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={LIVE_EMBED_URL}
                  title="ISKCON Greater Noida live darshan"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex min-h-[360px] flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_42%),linear-gradient(135deg,#fffaf4_0%,#f4e5cf_100%)] p-8">
                <div className="max-w-lg">
                  <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[#b91c1c]">
                    Embed Ready
                  </div>
                  <h3 className="mt-3 font-cinzel text-2xl text-[var(--text-primary)]">
                    Add the stream URL once and the iframe goes live
                    automatically.
                  </h3>
                  <p className="mt-4 text-[1.05rem] leading-8 text-[var(--text-secondary)]">
                    Set <code>NEXT_PUBLIC_YOUTUBE_LIVE_EMBED_URL</code> to your
                    YouTube embed link to show the live player here. Until then,
                    devotees still get a prominent watch-live path through the
                    sticky CTA and section button.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={YOUTUBE_LIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#dc2626] px-5 py-3 font-cinzel text-sm uppercase tracking-[0.08em] text-white"
                  >
                    Open Live Stream
                  </a>
                  <a
                    href="#connect"
                    className="rounded-full border border-[var(--border-gold)] bg-[var(--elevated)] px-5 py-3 font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--accent-gold)]"
                  >
                    Share Daily Timing Updates
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)]">
            <div className="font-cinzel text-xs uppercase tracking-[0.14em] text-[var(--accent-gold)]">
              Best Times To Tune In
            </div>
            <div className="mt-6 space-y-4">
              {aratiWindows.map((window) => (
                <div
                  key={window.name}
                  className="rounded-[20px] border border-[var(--border)] bg-[var(--elevated)] p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-cinzel text-lg text-[var(--text-primary)]">
                      {window.name}
                    </h3>
                    <span className="rounded-full bg-[rgba(183,121,31,0.1)] px-3 py-1 font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--accent-gold)]">
                      {window.time}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                    {window.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[20px] border border-[#ef4444]/15 bg-[#fff5f3] p-5">
              <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[#b91c1c]">
                Temple Notice
              </div>
              <p className="mt-3 text-[0.98rem] leading-7 text-[var(--text-secondary)]">
                Streaming depends on temple schedule and festival days. When a
                live arati is not on air, devotees can still open the YouTube
                channel directly from the red live button.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
