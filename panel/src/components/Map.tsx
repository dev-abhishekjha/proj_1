"use client";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import Image from "next/image";

export default function TempleMapSection() {
  return (
    <section id="map" className="bg-[var(--bg)] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            {/* Map Visual */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-[var(--accent-gold)] opacity-[0.05] blur-2xl rounded-full" />
              <div className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-xl aspect-video md:aspect-auto md:h-[450px]">
                <Image
                  src="/map.png"
                  alt="ISKCON Greater Noida Location Map"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                <a
                  href="https://maps.google.com/?q=ISKCON+Greater+Noida+A-49+Block+N+Zeta+I+Greater+Noida+201310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]"
                >
                  <div className="bg-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                    <ExternalLink className="w-4 h-4" />
                    Open Google Maps
                  </div>
                </a>
              </div>
            </div>

            {/* Address Details */}
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[var(--accent-saffron)]" />
                  <span className="font-display text-[12px] uppercase tracking-[0.2em] text-[var(--accent-saffron)] font-bold">
                    Temple Location
                  </span>
                </div>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3rem)] font-bold text-[var(--text-primary)] leading-tight">
                  Find Your Way <br />
                  <span className="text-[var(--accent-gold)]">
                    to the Temple
                  </span>
                </h2>

                <div className="p-8 rounded-3xl border border-[var(--border)] bg-white shadow-sm space-y-6">
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">
                      Address
                    </h4>
                    <p className="font-display text-xl leading-relaxed text-[var(--text-primary)]">
                      A-49, Block N, Zeta I,
                      <br />
                      Greater Noida, Uttar Pradesh
                      <br />
                      201310, India
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--border)]">
                    <h4 className="font-display text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold mb-2">
                      Nearby Landmark
                    </h4>
                    <p className="font-body text-[1.05rem] text-[var(--text-secondary)]">
                      Near Pari Chowk / Alpha 2 Sector
                    </p>
                  </div>

                  <a
                    href="https://maps.google.com/?q=ISKCON+Greater+Noida+A-49+Block+N+Zeta+I+Greater+Noida+201310"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--accent-saffron)] px-8 py-4 font-display text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
