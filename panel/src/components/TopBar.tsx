"use client";
import { Instagram, Mail, Phone, Youtube } from "lucide-react";

export default function TopBar() {
  return (
    <div className="topbar hidden w-full border-b border-[var(--border)] bg-white/80 py-[8px] text-[11px] font-display font-bold tracking-widest text-[var(--text-secondary)] backdrop-blur-md md:block sticky top-0 z-[10000]">
      <div className="container mx-auto flex items-center justify-between px-7">
        <div className="topbar-left flex gap-[24px]">
          <a
            href="tel:+919871647891"
            className="flex items-center gap-1.5 hover:text-[var(--accent-saffron)] transition-colors uppercase"
          >
            <Phone className="w-3 h-3 text-[var(--accent-gold)]" /> +91 98716
            47891
          </a>
          <a
            href="mailto:info@iskcongreaternoida.org"
            className="flex items-center gap-1.5 hover:text-[var(--accent-saffron)] transition-colors uppercase"
          >
            <Mail className="w-3 h-3 text-[var(--accent-gold)]" />{" "}
            info@iskcongreaternoida.org
          </a>
        </div>
        <div className="topbar-right flex items-center gap-[12px]">
          <span className="opacity-40 font-medium">FOLLOW US</span>
          <a
            href="https://www.instagram.com/iskcon.gn/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[#E4405F] transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://www.youtube.com/@iskcongreaternoida"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[#FF0000] transition-colors"
          >
            <Youtube className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
