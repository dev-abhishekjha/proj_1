"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { sevaOptions } from "@/lib/temple-data";

export default function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sevaType: sevaOptions[0],
    date: format(new Date(), "yyyy-MM-dd"),
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Seva booking request: ${formData.sevaType}`,
    );
    const body = encodeURIComponent(
      [
        "Hare Krishna!",
        "",
        "Please register my seva booking request.",
        "",
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone}`,
        `Seva Type: ${formData.sevaType}`,
        `Preferred Date: ${formData.date}`,
        "",
        "Additional Notes:",
        formData.notes || "None",
      ].join("\n"),
    );

    window.location.href = `mailto:info@iskcongreaternoida.org?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="donate"
      className="border-y border-[var(--border)] bg-[var(--surface)] py-16"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 font-cinzel text-sm uppercase tracking-[0.12em] text-[var(--accent-saffron)]">
            Support Our Mission
          </p>
          <h2 className="mb-4 font-cinzel text-3xl font-semibold lg:text-4xl">
            <span className="text-[var(--text-primary)]">Book Seva or</span>{" "}
            <span className="bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text text-transparent">
              Donate
            </span>
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-[var(--text-secondary)]">
            Choose a seva, pick your preferred date, and send the booking
            directly to the temple. Devotees can still use the QR scanner for a
            quick offering anytime.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--elevated)] p-6 shadow-[var(--shadow-soft)] lg:p-8">
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-[var(--border-gold)] bg-[rgba(183,121,31,0.08)] px-4 py-2 font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--accent-gold)]">
                Abhishek
              </div>
              <div className="rounded-full border border-[var(--border-saffron)] bg-[rgba(217,119,6,0.08)] px-4 py-2 font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--accent-saffron)]">
                Arati Sponsorship
              </div>
              <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-cinzel text-xs uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                Festival Seva
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                  placeholder="Your good name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                  placeholder="devotee@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                  placeholder="+91"
                />
              </div>

              <div>
                <label
                  htmlFor="sevaType"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Seva Type
                </label>
                <select
                  id="sevaType"
                  name="sevaType"
                  value={formData.sevaType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                >
                  {sevaOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="date"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Preferred Seva Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  min={format(new Date(), "yyyy-MM-dd")}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="notes"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Sankalpa / Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={5}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                  placeholder="Share deity preference, family names, or any special request."
                />
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  className="rounded-lg bg-[var(--accent-saffron)] px-6 py-4 font-cinzel text-sm uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(217,119,6,0.22)] hover:-translate-y-0.5 hover:brightness-105"
                >
                  Book Seva by Email ↗
                </button>
                <a
                  href="#connect"
                  className="rounded-lg border border-[var(--border-gold)] bg-[var(--surface)] px-6 py-4 font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--accent-gold)]"
                >
                  Need Help Choosing?
                </a>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--elevated)] p-6 shadow-[var(--shadow-soft)]">
              <div className="mb-5">
                <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-gold)]">
                  Instant Offering
                </div>
                <h3 className="mt-2 font-cinzel text-2xl text-[var(--text-primary)]">
                  Scan and contribute in seconds
                </h3>
              </div>

              <div className="relative overflow-hidden rounded-[18px] border border-[var(--border)] bg-white">
                <Image
                  src="/scanner.jpeg"
                  alt="Donation scanner QR code"
                  width={900}
                  height={900}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--elevated)] p-6 shadow-[var(--shadow-soft)]">
              <div className="font-cinzel text-xs uppercase tracking-[0.12em] text-[var(--accent-saffron)]">
                Popular Sevas
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  "Sponsor a daily arati",
                  "Offer bhoga and prasadam",
                  "Support festival decoration",
                  "Contribute to book distribution",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[1rem] text-[var(--text-secondary)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
