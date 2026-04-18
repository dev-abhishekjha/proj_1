"use client";

import { Mail, MessageCircle, Send, User } from "lucide-react";
import { useState } from "react";
import { WHATSAPP_SUPPORT_URL } from "@/lib/temple-data";

const destinationEmail = "iskcongr.noida@gmail.com";

const queryOptions = [
  "General Inquiry",
  "Programs & Events",
  "Food for Life",
  "Donation",
  "Volunteer",
  "Visit Temple",
  "Other",
];

export default function Connect() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    supportMethod: "email",
    queryType: "",
    query: "",
  });

  const requiresCustomQuery = formData.queryType === "Other";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Website query from ${formData.name || formData.email}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Preferred Support: ${formData.supportMethod}`,
        `Query Type: ${formData.queryType || "Not selected"}`,
        "",
        "Query:",
        requiresCustomQuery ? formData.query : formData.queryType,
      ].join("\n"),
    );

    if (formData.supportMethod === "whatsapp") {
      window.location.href = `https://wa.me/919871647891?text=${body}`;
      return;
    }

    window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
  };

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

  return (
    <section id="connect" className="bg-[var(--bg)] py-20">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Send className="w-4 h-4 text-[var(--accent-saffron)]" />
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[var(--accent-saffron)] font-bold">
              Get In Touch
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-[var(--text-primary)] leading-tight">
            Connect <span className="text-[var(--accent-gold)]">with Us</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-[1.1rem] leading-relaxed text-[var(--text-secondary)]">
            Have a question? Choose your preferred way to reach us. Our team is
            here to help you on your spiritual journey.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-6">
                Support Channels
              </h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${destinationEmail}`}
                  className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 transition-all hover:border-[var(--accent-gold)] hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                      Email Us
                    </div>
                    <div className="mt-1 font-display text-base font-bold text-[var(--text-primary)]">
                      {destinationEmail}
                    </div>
                  </div>
                </a>

                <a
                  href={WHATSAPP_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[#f0fff5] p-5 transition-all hover:border-[#25D366] hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-[10px] uppercase tracking-widest text-[#1f8f49] font-bold">
                      WhatsApp Us
                    </div>
                    <div className="mt-1 font-display text-base font-bold text-[var(--text-primary)]">
                      +91 98716 47891
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--accent-gold)] bg-gradient-to-br from-[#fff9f0] to-[#fdf2e2] p-8">
              <h4 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
                Visiting for the first time?
              </h4>
              <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                We'd love to welcome you! Feel free to ask about our orientation
                tours, introductory classes, or where to find delicious
                prasadam.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--border)] bg-white p-8 md:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="supportMethod"
                    className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
                  >
                    Preferred Method *
                  </label>
                  <select
                    id="supportMethod"
                    name="supportMethod"
                    value={formData.supportMethod}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                  >
                    <option value="email">Send Email</option>
                    <option value="whatsapp">Send WhatsApp Message</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] pl-11 pr-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                      placeholder="Name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
                  >
                    Your Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] pl-11 pr-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="queryType"
                  className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
                >
                  What can we help with? *
                </label>
                <select
                  id="queryType"
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                >
                  <option value="">Select a query type</option>
                  {queryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {requiresCustomQuery && (
                <div>
                  <label
                    htmlFor="query"
                    className="mb-2 block font-display text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold"
                  >
                    Detailed Query *
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                    placeholder="Tell us more..."
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-[var(--accent-saffron)] px-8 py-4 font-display text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                {formData.supportMethod === "whatsapp" ? (
                  <>
                    <MessageCircle className="w-4 h-4" /> Open WhatsApp
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
