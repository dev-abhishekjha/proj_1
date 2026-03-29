"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing! Hare Krishna 🙏");
    setEmail("");
  };

  return (
    <section className="bg-[var(--elevated)] border-t border-b border-[var(--border)] py-14">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="flex-1">
            <h3 className="font-[Cinzel] text-2xl text-white mb-2">
              Stay Connected with Krishna
            </h3>
            <p className="text-[#888] leading-relaxed">
              Get temple news, festival updates, and daily inspiration in your
              inbox.
            </p>
          </div>

          {/* Right — Email Form */}
          <form onSubmit={handleSubmit} className="flex max-w-md w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-[var(--bg)] border border-[var(--border)] border-r-0 rounded-l-lg px-4 py-3 text-white placeholder-[#555] focus:border-[#00F5FF] focus:outline-none transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white px-6 py-3 rounded-r-lg font-[Cinzel] text-sm uppercase tracking-[0.08em] transition-all duration-300 hover:brightness-115"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
