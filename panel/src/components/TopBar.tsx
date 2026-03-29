import React from "react";
import { Instagram, Youtube } from "lucide-react";

export default function TopBar() {
  return (
    <div className="topbar hidden w-full border-b border-[var(--border)] bg-[rgba(255,248,238,0.92)] py-[7px] text-xs font-cinzel tracking-wider text-[var(--text-secondary)] backdrop-blur md:block">
      <div className="container mx-auto flex items-center justify-between px-7">
        <div className="topbar-left flex gap-[22px]">
          <a
            href="tel:+919871647891"
            className="hover:text-[var(--accent-saffron)]"
          >
            📞 +91 98716 47891
          </a>
          <a
            href="mailto:info@iskcongreaternoida.org"
            className="hover:text-[var(--accent-saffron)]"
          >
            ✉ info@iskcongreaternoida.org
          </a>
        </div>
        <div className="topbar-right flex gap-[10px]">
          <a
            href="https://www.instagram.com/iskcon.gn/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
          >
            <Instagram className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://www.youtube.com/@iskcongreaternoida"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
          >
            <Youtube className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
