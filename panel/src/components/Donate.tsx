"use client";

import { format } from "date-fns";
import { CreditCard, Heart, QrCode, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { sevaOptions } from "@/lib/temple-data";

const presetAmounts = [
  { label: "₹108", value: "108", desc: "Prasadam Seva" },
  { label: "₹501", value: "501", desc: "Daily Arati" },
  { label: "₹1001", value: "1001", desc: "Festival Seva" },
  { label: "₹5001", value: "5001", desc: "Deity Dress" },
];

export default function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sevaType: sevaOptions[0],
    date: format(new Date(), "yyyy-MM-dd"),
    notes: "",
    amount: "",
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

  const setAmount = (val: string) => {
    setFormData((prev) => ({ ...prev, amount: val }));
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
        `Amount: ${formData.amount || "Not specified"}`,
        "",
        "Intention / Message:",
        formData.notes || "None",
      ].join("\n"),
    );

    window.location.href = `mailto:info@iskcongreaternoida.org?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="donate"
      className="border-y border-[var(--border)] bg-[var(--surface)] py-20"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-[var(--accent-saffron)]" />
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[var(--accent-saffron)] font-bold">
              Support Our Mission
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-[var(--text-primary)] leading-tight">
            Book <span className="text-[var(--accent-gold)]">Seva</span> or{" "}
            <span className="text-[var(--accent-saffron)]">Donate</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-[1.1rem] leading-relaxed text-[var(--text-secondary)]">
            Every contribution, no matter the size, helps us maintain the temple
            and serve the community through our spiritual outreach.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Booking Form */}
          <div className="rounded-[32px] border border-[var(--border)] bg-white p-8 md:p-10 shadow-sm">
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--accent-gold)]" />
                Seva Booking Form
              </h3>

              <div className="mb-6">
                <span className="mb-3 block font-display text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
                  Quick Select Amount
                </span>
                <div className="flex flex-wrap gap-3">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt.value}
                      type="button"
                      onClick={() => setAmount(amt.value)}
                      className={`flex flex-col items-center justify-center rounded-xl border px-4 py-2 transition-all ${
                        formData.amount === amt.value
                          ? "border-[var(--accent-saffron)] bg-[var(--accent-saffron)] text-white shadow-md scale-105"
                          : "border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] hover:border-[var(--accent-gold)]"
                      }`}
                    >
                      <span className="font-display text-sm font-bold">
                        {amt.label}
                      </span>
                      <span className="text-[9px] opacity-70 uppercase tracking-tighter">
                        {amt.desc}
                      </span>
                    </button>
                  ))}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Custom"
                      value={formData.amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-24 h-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm font-bold focus:border-[var(--accent-gold)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-1">
                <label
                  htmlFor="name"
                  className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
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
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="phone"
                  className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
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
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                  placeholder="+91"
                />
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="sevaType"
                  className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
                >
                  Seva Type
                </label>
                <select
                  id="sevaType"
                  name="sevaType"
                  value={formData.sevaType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                >
                  {sevaOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-1">
                <label
                  htmlFor="date"
                  className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
                >
                  Preferred Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  min={format(new Date(), "yyyy-MM-dd")}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="notes"
                  className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
                >
                  Your Intention / Message (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                  placeholder="Share any special request or family names for sankalpa."
                />
              </div>

              <div className="md:col-span-2 space-y-4 pt-4">
                <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-xl border border-green-100 text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <p className="font-medium">
                    All donations are eligible for 80G Tax Benefit.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[var(--accent-saffron)] px-8 py-4 font-display text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                  >
                    Submit Seva Request ↗
                  </button>
                  <a
                    href="#connect"
                    className="rounded-xl border-2 border-[var(--border)] px-8 py-4 font-display text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-all"
                  >
                    Need Help?
                  </a>
                </div>
              </div>
            </form>
          </div>

          {/* Side Panels */}
          <div className="space-y-8">
            {/* QR Card */}
            <div className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span className="font-display text-[10px] uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                    Instant Offering
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] leading-tight">
                  Scan to Contribute
                </h3>
              </div>

              <div className="relative group mx-auto max-w-[280px]">
                <div className="absolute -inset-2 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />
                <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-4">
                  <Image
                    src="/scanner.jpeg"
                    alt="Donation scanner QR code"
                    width={500}
                    height={500}
                    className="h-auto w-full object-contain"
                  />
                  <div className="mt-4 text-center">
                    <p className="font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                      UPID: iskcongn@upi
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-sm font-body text-[var(--text-secondary)] italic">
                Securely donate via any UPI app (GPay, PhonePe, Paytm).
              </p>
            </div>

            {/* Impact Note */}
            <div className="rounded-[32px] border border-[var(--accent-gold)] bg-gradient-to-br from-[#fff9f0] to-[#fdf2e2] p-8">
              <h4 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">
                Where Your Donation Goes
              </h4>
              <ul className="space-y-3">
                {[
                  "Maintenance of temple & deities",
                  "Daily Food for Life (Anna-daan)",
                  "Spiritual education programs",
                  "Festival & cultural outreach",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-saffron)] flex-shrink-0" />
                    <span className="text-sm font-body text-[var(--text-secondary)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
