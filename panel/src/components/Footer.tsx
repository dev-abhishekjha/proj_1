"use client";

import {
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { WHATSAPP_SUPPORT_URL } from "@/lib/temple-data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#fdf2e2] pt-20 text-[var(--text-primary)]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[var(--border-gold)] bg-white shadow-sm">
                <Image
                  src="/logo.jpg"
                  alt="ISKCON Greater Noida logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)] leading-none">
                  ISKCON
                </div>
                <div className="mt-1 font-display text-[10px] uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">
                  Greater Noida
                </div>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)] opacity-80">
              Sri Sri Gaur Nataraj Dayal Nitai Temple — Spreading Krishna
              Consciousness through devotional service, cultural programs, and
              community welfare since 2015.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/iskcon.gn/",
                  color: "hover:text-[#E4405F]",
                },
                {
                  icon: Youtube,
                  href: "https://www.youtube.com/@iskcongreaternoida",
                  color: "hover:text-[#FF0000]",
                },
                {
                  icon: MessageCircle,
                  href: WHATSAPP_SUPPORT_URL,
                  color: "hover:text-[#25D366]",
                },
              ].map((social, _i) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-10 w-10 flex items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--text-muted)] transition-all hover:border-[var(--accent-gold)] shadow-sm ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-display text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold">
              Quick Links
            </h4>
            <div className="space-y-4">
              {[
                ["About Temple", "#about"],
                ["Srila Prabhupada", "#founder"],
                ["Darshan Timings", "#timings"],
                ["Programs & Events", "#programs"],
                ["Food for Life", "#ffl"],
                ["Vedic Calendar", "#vedic-calendar"],
                ["Seva Booking", "#donate"],
              ].map(([link, href]) => (
                <a
                  key={link}
                  href={href}
                  className="block font-body text-[0.9rem] text-[var(--text-secondary)] hover:text-[var(--accent-saffron)] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-display text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--accent-gold)] mt-1 flex-shrink-0" />
                <span className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                  A-49, Block N, Zeta I,
                  <br />
                  Greater Noida - 201310
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--accent-gold)] flex-shrink-0" />
                <span className="font-body text-sm text-[var(--text-secondary)]">
                  +91 98716 47891
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--accent-gold)] flex-shrink-0" />
                <span className="font-body text-sm text-[var(--text-secondary)]">
                  info@iskcongreaternoida.org
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-display text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold">
              Daily Arati
            </h4>
            <div className="space-y-3">
              {[
                { name: "Mangala Arati", time: "4:30 AM" },
                { name: "Raj Bhog Arati", time: "12:30 PM" },
                { name: "Sandhya Arati", time: "6:45 PM" },
                { name: "Shayana Arati", time: "8:00 PM" },
              ].map((timing) => (
                <div
                  key={timing.name}
                  className="flex justify-between items-center border-b border-[var(--border)]/30 pb-2"
                >
                  <span className="font-body text-sm text-[var(--text-secondary)]">
                    {timing.name}
                  </span>
                  <span className="font-display text-xs font-bold text-[var(--accent-gold)]">
                    {timing.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="font-display text-xs tracking-widest text-[var(--text-muted)] font-medium uppercase">
              © 2026 ISKCON Greater Noida. All rights reserved.
            </div>
            <div className="font-display text-sm font-bold text-[var(--text-secondary)] flex items-center gap-2">
              <span className="text-[var(--accent-saffron)]">Hare Krishna</span>
              <span className="text-[var(--accent-gold)] opacity-40">✦</span>
              <span>All Glories to Srila Prabhupada</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
