"use client";

import Link from "next/link";
import TemplePhoto from "@/components/TemplePhoto";

const galleryItems = [
  {
    src: "/deities_3.jpeg",
    caption: "Sri Sri Gaur Nataraj Dayal Nitai Darshan",
    detail: "Authentic altar photography from the temple darshan archive.",
    position: "center 24%",
  },
  {
    src: "/gallery2.jpeg",
    caption: "Mangala Arati",
    detail: "Morning worship and the first devotional moments of the day.",
  },
  {
    src: "/gallery3.jpeg",
    caption: "Sunday Harinam",
    detail: "Street kirtan and public chanting in Greater Noida.",
  },
  {
    src: "/gallery4.jpeg",
    caption: "Prasadam Distribution",
    detail: "Temple service, feeding programs, and community outreach.",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[var(--bg)] py-24">
      <div className="container mx-auto px-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-gold)]">
              Temple Life
            </span>
            <h2 className="mt-2 mb-2 font-cinzel text-[clamp(1.9rem,3.2vw,2.4rem)] font-medium text-[var(--text-primary)]">
              Real Temple Photography
            </h2>
            <div className="max-w-2xl font-crimson text-[1.05rem] text-[var(--text-secondary)]">
              Darshan, arati, outreach, and festival moments from the actual
              temple. Each card keeps fixed dimensions and falls back gracefully
              if a replacement image is added later and fails to load.
            </div>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-[8px] bg-[var(--accent-saffron)] px-6 py-3 font-cinzel text-[0.8rem] font-medium uppercase tracking-wider text-white shadow-[0_12px_24px_rgba(217,119,6,0.22)] hover:-translate-y-0.5 hover:brightness-105"
          >
            View Full Gallery ↗
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {galleryItems.map((item, i) => (
            <div
              key={item.src}
              className={`group relative overflow-hidden rounded-[14px] border border-[var(--border)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-gold)] ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <div className="relative h-[260px] w-full lg:h-[320px]">
                <TemplePhoto
                  src={item.src}
                  alt={item.caption}
                  fallbackLabel="Temple Photo Placeholder"
                  fallbackDescription={item.detail}
                  className="h-full"
                  imageClassName="object-cover transition-transform duration-300 group-hover:scale-105"
                  objectPosition={item.position ?? "center"}
                  priority={i === 0}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,35,16,0.85)] via-[rgba(58,35,16,0.12)] to-transparent opacity-75 transition-opacity duration-200 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-cinzel text-[10px] uppercase tracking-widest text-[#f5d7a6]">
                  ISKCON Greater Noida
                </span>
                <div className="mt-1 font-crimson text-[1.02rem] text-white">
                  {item.caption}
                </div>
                <div className="mt-1 max-w-md font-crimson text-[0.92rem] text-[#f7ecd9]">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
