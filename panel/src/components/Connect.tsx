"use client";

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
    <section id="connect" className="bg-[var(--bg)] py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 font-cinzel text-sm uppercase tracking-[0.12em] text-[var(--accent-saffron)]">
            Support by Email or WhatsApp
          </p>
          <h2 className="mb-4 font-cinzel text-3xl font-semibold lg:text-4xl">
            <span className="bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text text-transparent">
              Connect
            </span>{" "}
            <span className="text-[var(--text-primary)]">with Us</span>
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-[var(--text-secondary)]">
            Choose your preferred support method and send your query by email or
            WhatsApp. Both options reach the temple team directly.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)]">
            <h3 className="font-cinzel text-[1.35rem] text-[var(--text-primary)]">
              Choose your support channel
            </h3>
            <p className="mt-4 font-crimson text-[1rem] leading-8 text-[var(--text-secondary)]">
              Use either of the support channels below for darshan, seva,
              donations, volunteering, or visit-related questions.
            </p>
            <div className="mt-6 grid gap-4">
              <a
                href={`mailto:${destinationEmail}`}
                className="rounded-[16px] border border-[var(--border)] bg-[#fffaf3] p-5 hover:border-[var(--accent-gold)]"
              >
                <div className="font-cinzel text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                  Email Support
                </div>
                <div className="mt-2 font-crimson text-[1.1rem] text-[var(--accent-gold)]">
                  {destinationEmail}
                </div>
              </a>
              <a
                href={WHATSAPP_SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[16px] border border-[var(--border)] bg-[#f0fff5] p-5 hover:border-[#25D366]"
              >
                <div className="font-cinzel text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                  WhatsApp Support
                </div>
                <div className="mt-2 font-crimson text-[1.1rem] text-[#1f8f49]">
                  +91 98716 47891
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="supportMethod"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Support Method *
                </label>
                <select
                  id="supportMethod"
                  name="supportMethod"
                  value={formData.supportMethod}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--elevated)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="queryType"
                  className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                >
                  Query Type *
                </label>
                <select
                  id="queryType"
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--elevated)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none"
                >
                  <option value="">Select a query type</option>
                  {queryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {requiresCustomQuery ? (
                <div>
                  <label
                    htmlFor="query"
                    className="mb-2 block font-cinzel text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)]"
                  >
                    Enter Query *
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    required={requiresCustomQuery}
                    rows={6}
                    className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-gold)] focus:outline-none"
                    placeholder="Write your question here..."
                  />
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-lg bg-[var(--accent-saffron)] px-6 py-4 font-cinzel text-sm uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(217,119,6,0.22)] hover:-translate-y-0.5 hover:brightness-105"
              >
                {formData.supportMethod === "whatsapp"
                  ? "Open WhatsApp ↗"
                  : "Send Email ↗"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
