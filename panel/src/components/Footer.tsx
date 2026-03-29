"use client";

import { Instagram, MessageCircle, Youtube } from "lucide-react";
import Image from "next/image";
import { WHATSAPP_SUPPORT_URL } from "@/lib/temple-data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#f3e2c7] pt-16 pb-0 text-[var(--text-primary)]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-gold)] bg-gradient-to-br from-[#fff8ea] to-[#e8c98d] shadow-[var(--shadow-soft)]">
                <Image
                  src="/logo.jpg"
                  alt="ISKCON Greater Noida logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-cinzel text-lg font-semibold tracking-[0.06em] text-[var(--accent-gold)]">
                  ISKCON
                </div>
                <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Greater Noida
                </div>
              </div>
            </div>
            <p className="font-crimson text-sm leading-relaxed text-[var(--text-secondary)]">
              Sri Sri Gaur Nataraj Dayal Nitai Temple — Spreading Krishna
              Consciousness through devotional service, cultural programs, and
              community welfare since 2015.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/iskcon.gn/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@iskcongreaternoida"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={WHATSAPP_SUPPORT_URL}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[#25D366] hover:text-[#25D366]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-cinzel text-xs uppercase tracking-[0.14em] text-[var(--accent-gold)]">
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                ["Temple Information", "#about"],
                ["Srila Prabhupada", "#founder"],
                ["Darshan Timings", "#timings"],
                ["Plan Your Visit", "#visit-guide"],
                ["Programs & Events", "#programs"],
                ["Food for Life", "#ffl"],
                ["Donate", "#donate"],
                ["Vedic Calendar", "#vedic-calendar"],
                ["Connect with Us", "#connect"],
              ].map(([link, href]) => (
                <a
                  key={link}
                  href={href}
                  className="block font-crimson text-sm text-[var(--text-secondary)] hover:text-[var(--accent-saffron)]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-cinzel text-xs uppercase tracking-[0.14em] text-[var(--accent-gold)]">
              Contact
            </h4>
            <div className="space-y-2 font-crimson text-sm text-[var(--text-secondary)]">
              <div>A-49, Block N, Zeta I</div>
              <div>Greater Noida – 201310</div>
              <div>Uttar Pradesh, India</div>
              <div>+91 98716 47891</div>
              <div>info@iskcongreaternoida.org</div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-cinzel text-xs uppercase tracking-[0.14em] text-[var(--accent-gold)]">
              Darshan Timings
            </h4>
            <div className="space-y-2">
              {[
                { name: "Mangala Arati", time: "4:30 AM" },
                { name: "Guru Puja", time: "7:00 AM" },
                { name: "Morning", time: "8:30 – 12:00" },
                { name: "Raj Bhog", time: "12:30 PM" },
                { name: "Evening", time: "4:30 – 6:30" },
                { name: "Sandhya", time: "6:45 PM" },
                { name: "Shayana", time: "8:00 PM" },
              ].map((timing) => (
                <div
                  key={timing.name}
                  className="flex justify-between items-center"
                >
                  <span className="font-crimson text-sm text-[var(--text-secondary)]">
                    {timing.name}
                  </span>
                  <span className="font-cinzel text-xs text-[var(--accent-gold)]">
                    {timing.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-5 pb-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="font-cinzel text-sm tracking-[0.05em] text-[var(--text-secondary)]">
              © 2026 ISKCON Greater Noida. All rights reserved.
            </div>
            <div className="font-cinzel text-sm text-[var(--text-secondary)]">
              Hare Krishna 🙏
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
