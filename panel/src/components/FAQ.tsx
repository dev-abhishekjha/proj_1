"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What are the temple opening hours?",
    answer:
      "The temple is open daily in two sessions: 4:30 AM to 12:00 PM and 4:00 PM to 9:30 PM. The main arati ceremonies are Mangala Arati at 4:30 AM and Sandhya Arati at 6:45 PM.",
  },
  {
    question: "Is there an entry fee to visit the temple?",
    answer:
      "No, entry to the temple is completely free for everyone. All are welcome to attend the arati ceremonies, classes, and receive prasadam without any charge.",
  },
  {
    question: "What is the dress code for visitors?",
    answer:
      "While there is no strict dress code, we request all visitors to dress modestly and respectfully. Avoid sleeveless tops, shorts, or short skirts out of reverence for the sacred atmosphere.",
  },
  {
    question: "Is photography allowed during arati?",
    answer:
      "Photography of the deities is generally allowed, but we request visitors to avoid flash and maintain a respectful distance during arati ceremonies. Video recording of the full arati is discouraged to maintain the sanctity of the worship.",
  },
  {
    question: "Where do I park?",
    answer:
      "Ample free parking is available for visitors within the temple premises and in the designated area adjacent to the temple entrance. Our security team will guide you upon arrival.",
  },
  {
    question: "How can I participate in Food for Life?",
    answer:
      "You can participate by either volunteering your time for food preparation and distribution or by sponsoring meals. Visit our Food for Life section or connect with the temple office for more details.",
  },
  {
    question: "Are there any special programs for children?",
    answer:
      "Yes! We have the Prahlad School every Sunday morning (10:00 AM - 12:00 PM) which focuses on Vedic education, stories, and values for children through engaging activities.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--bg)] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="flex justify-center items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">
                Common Questions
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--text-primary)]">
              Frequently Asked{" "}
              <span className="text-[var(--accent-saffron)]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  openIndex === index
                    ? "border-[var(--accent-gold)] bg-white shadow-md"
                    : "border-[var(--border)] bg-white/50 hover:border-[var(--border-gold)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg font-bold text-[var(--text-primary)] pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--accent-gold)] transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-[300px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0 border-t border-[var(--border)]/30 mt-2">
                    <p className="font-body text-[1.05rem] leading-relaxed text-[var(--text-secondary)] pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
