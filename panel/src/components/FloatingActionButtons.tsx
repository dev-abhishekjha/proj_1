"use client";
import { useEffect, useState } from "react";
import { WHATSAPP_SUPPORT_URL } from "@/lib/temple-data";

export default function FloatingActionButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-7 right-7 z-[9999] flex flex-col gap-3 items-end">
      {/* WhatsApp FAB */}
      <a
        href={WHATSAPP_SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white text-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.4)] transition-all duration-300"
      >
        💬
      </a>

      {/* Back-to-Top FAB */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`w-12 h-12 bg-[var(--elevated)] border border-[#00F5FF44] rounded-full flex items-center justify-center text-[#00F5FF] text-lg hover:scale-110 hover:bg-[#001A1E] hover:-translate-y-1 transition-all duration-300 ${
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        ↑
      </button>
    </div>
  );
}
