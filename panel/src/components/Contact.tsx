"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! Hare Krishna 🙏");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
    <section
      id="contact"
      className="bg-[var(--surface)] border-t border-[var(--border)] py-24"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#8B5CF6] font-[Cinzel] text-sm uppercase tracking-[0.12em] mb-2">
            Find Us
          </p>
          <h2 className="font-[Cinzel] text-3xl lg:text-4xl font-semibold mb-4">
            <span className="text-white">Location &</span>{" "}
            <span className="bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <p className="text-[#888] leading-relaxed max-w-2xl mx-auto">
            Visit the Sri Sri Gaur Nataraj Dayal Nitai Temple — all are welcome
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16">
          {/* Left — Contact Info */}
          <div className="space-y-8">
            <h3 className="font-[Cinzel] text-xl text-[#00F5FF] mb-6">
              Sri Sri Gaur Nataraj Dayal Nitai Temple
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--elevated)] border border-[#1E2A3A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <div className="text-[#888] text-sm font-[Cinzel] uppercase tracking-[0.08em] mb-1">
                    Address
                  </div>
                  <div className="text-white text-sm leading-relaxed">
                    A-49, Block N, Zeta I, Greater Noida, Uttar Pradesh –
                    201310, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--elevated)] border border-[#1E2A3A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📞</span>
                </div>
                <div>
                  <div className="text-[#888] text-sm font-[Cinzel] uppercase tracking-[0.08em] mb-1">
                    Phone
                  </div>
                  <a
                    href="tel:+919871647891"
                    className="text-white text-sm hover:text-[#00F5FF] transition-colors duration-300"
                  >
                    +91 98716 47891
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--elevated)] border border-[#1E2A3A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✉</span>
                </div>
                <div>
                  <div className="text-[#888] text-sm font-[Cinzel] uppercase tracking-[0.08em] mb-1">
                    Email
                  </div>
                  <div className="text-white text-sm">
                    info@iskcongreaternoida.org
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--elevated)] border border-[#1E2A3A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🕐</span>
                </div>
                <div>
                  <div className="text-[#888] text-sm font-[Cinzel] uppercase tracking-[0.08em] mb-1">
                    Temple Hours
                  </div>
                  <div className="text-white text-sm leading-relaxed">
                    Morning: 4:30 AM – 12:00 PM · Evening: 4:00 PM – 9:30 PM ·
                    Open all days
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=A-49+Block+N+Zeta+I+Greater+Noida+201310"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] hover:from-[#00F5FF]/90 hover:to-[#8B5CF6]/90 text-white px-6 py-3 rounded-lg font-[Cinzel] text-sm uppercase tracking-[0.08em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
            >
              Get Directions ↗
            </a>
          </div>

          {/* Right — Message Form */}
          <div className="bg-[var(--elevated)] border border-[var(--border)] rounded-xl p-8">
            <h3 className="font-[Cinzel] text-xl text-white mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#888] text-sm mb-2 font-[Cinzel] uppercase tracking-[0.08em]"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:border-[#00F5FF] focus:outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#888] text-sm mb-2 font-[Cinzel] uppercase tracking-[0.08em]"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:border-[#00F5FF] focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[#888] text-sm mb-2 font-[Cinzel] uppercase tracking-[0.08em]"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:border-[#00F5FF] focus:outline-none transition-colors duration-300"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[#888] text-sm mb-2 font-[Cinzel] uppercase tracking-[0.08em]"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-[#00F5FF] focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="programs">Programs & Events</option>
                    <option value="food">Food for Life</option>
                    <option value="donation">Donation</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="media">Media</option>
                    <option value="press">Press</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[#888] text-sm mb-2 font-[Cinzel] uppercase tracking-[0.08em]"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-white placeholder-[#555] focus:border-[#00F5FF] focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] hover:from-[#00F5FF]/90 hover:to-[#8B5CF6]/90 text-white py-4 px-6 rounded-lg font-[Cinzel] text-sm uppercase tracking-[0.08em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
              >
                Send Message ↗
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
