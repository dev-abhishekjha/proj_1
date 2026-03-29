"use client";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

interface AccordionItem {
  time: string;
  title: string;
  content: string;
  isOpen: boolean;
}

const accordionData = {
  en: [
    {
      time: "4:30 AM",
      title: "Mangala Arati",
      content:
        "Morning worship & greeting of the deities — The day begins in the brahma-muhurta hour with the auspicious Mangala Arati — incense, lamps and heartfelt prayers are offered to Sri Sri Gaur Nataraj Dayal Nitai. Attending Mangala Arati is considered most auspicious and purifies the entire day.",
    },
    {
      time: "7:00 AM",
      title: "Guru Puja & Bhagavatam Class",
      content:
        "Worship of the spiritual master & scripture study — Guru Puja is followed by the Srimad-Bhagavatam class — an in-depth exploration of Vedic wisdom. Senior devotees and visiting swamis give illuminating discourses on applying spiritual teachings in modern life.",
    },
    {
      time: "8:30 AM – 12:00 PM",
      title: "Morning Darshan",
      content:
        "Temple open for devotees & visitors — Temple doors open for all. Offer prayers, receive prasadam, purchase devotional books, and experience the peaceful atmosphere of the deity altar. Guided tours available for first-time visitors.",
    },
    {
      time: "12:30 PM",
      title: "Raj Bhog Arati",
      content:
        "Midday grand offering and darshan — Raj Bhog — the royal midday meal — is lovingly prepared and offered to the deities. This elaborate arati features an extensive offering of foods. Prasadam is distributed to all attendees after the ceremony.",
    },
    {
      time: "4:30 – 6:30 PM",
      title: "Evening Darshan",
      content:
        "Afternoon temple hours open to all — The temple reopens after the deities' afternoon rest. A peaceful time to offer prayers, meditate in the presence of Their Lordships, and connect with other devotees in a serene atmosphere.",
    },
    {
      time: "6:45 PM",
      title: "Sandhya Arati & Maha Kirtan",
      content:
        "Evening worship & congregational chanting — The most vibrant arati of the day. Accompanied by enthusiastic Maha Kirtan — congregational chanting and dancing that fills the temple with transcendental energy. All are welcome to join the chanting!",
    },
    {
      time: "7:00 – 7:45 PM",
      title: "Post-Kirtan Darshan",
      content:
        "Extended darshan & prasadam distribution — Following the Sandhya Arati, devotees enjoy extended darshan of the beautifully dressed deities. Free prasadam is distributed. Temple priests are available for spiritual guidance and questions.",
    },
    {
      time: "8:00 PM",
      title: "Shayana Arati",
      content:
        "Final evening worship — the Lord retires — The Shayana Arati bids goodnight to the deities with gentle, meditative bhajans. This deeply peaceful and intimate ceremony closes the day, leaving devotees spiritually refreshed and uplifted.",
    },
  ],
  hi: [
    {
      time: "4:30 AM",
      title: "मंगला आरती",
      content:
        "प्रातःकालीन आराधना — ब्रह्ममुहूर्त में श्री श्री गौर नटराज दयाल निताई के समक्ष दीप, धूप और प्रार्थना के साथ दिन की मंगल शुरुआत होती है।",
    },
    {
      time: "7:00 AM",
      title: "गुरु पूजा और भागवत कक्षा",
      content:
        "गुरु वंदना और शास्त्र अध्ययन — गुरु पूजा के बाद श्रीमद्भागवत कक्षा होती है जिसमें वैदिक ज्ञान को जीवन में उतारने की चर्चा होती है।",
    },
    {
      time: "8:30 AM – 12:00 PM",
      title: "प्रातः दर्शन",
      content:
        "दर्शन हेतु मंदिर खुला — भक्त और आगंतुक दर्शन, प्रार्थना, प्रसाद और शांत आध्यात्मिक वातावरण का अनुभव कर सकते हैं।",
    },
    {
      time: "12:30 PM",
      title: "राज भोग आरती",
      content:
        "मध्याह्न भोग और आरती — भगवान को राजसी भोग अर्पित किया जाता है और उसके बाद भक्तों में प्रसाद वितरित होता है।",
    },
    {
      time: "4:30 – 6:30 PM",
      title: "सायंकालीन दर्शन",
      content:
        "शाम का मंदिर समय — भगवान के विश्राम के बाद मंदिर पुनः खुलता है और यह शांत दर्शन का सुंदर समय होता है।",
    },
    {
      time: "6:45 PM",
      title: "संध्या आरती और महा कीर्तन",
      content:
        "संध्या उपासना — दिन की सबसे उत्साहपूर्ण आरती, जिसमें सामूहिक कीर्तन और भक्तिमय वातावरण का अनुभव होता है।",
    },
    {
      time: "7:00 – 7:45 PM",
      title: "कीर्तन के बाद दर्शन",
      content:
        "विस्तारित दर्शन और प्रसाद — संध्या आरती के बाद भक्त सुसज्जित विग्रहों के दर्शन और प्रसाद प्राप्त कर सकते हैं।",
    },
    {
      time: "8:00 PM",
      title: "शयन आरती",
      content:
        "रात्रि विश्राम आरती — मधुर भजनों के साथ भगवान के विश्राम की अंतिम सेवा की जाती है, जो दिन का शांत समापन है।",
    },
  ],
} satisfies Record<"en" | "hi", Omit<AccordionItem, "isOpen">[]>;

export default function DarshanTimings() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const items = useMemo(
    () =>
      accordionData[language].map((item, index) => ({
        ...item,
        isOpen: index === openIndex,
      })),
    [language, openIndex],
  );

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="timings"
      lang={language}
      className="timings-section section relative border-y border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/deities_5.jpeg')] bg-cover bg-center opacity-[0.14]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,238,0.96)_0%,rgba(255,248,238,0.9)_40%,rgba(255,248,238,0.96)_100%)]" />
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="relative grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.4fr]">
          {/* Left Panel */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[var(--accent-gold)] animate-pulse" />
              <span className="font-cinzel text-sm uppercase tracking-[0.12em] text-[var(--accent-gold)]">
                {language === "hi"
                  ? "मंदिर प्रतिदिन खुला है — सभी का स्वागत है"
                  : "Temple Open Daily — All Welcome"}
              </span>
            </div>
            <div>
              <h2 className="mb-4 font-cinzel text-2xl font-semibold lg:text-3xl">
                <span className="text-[var(--text-primary)]">
                  {language === "hi" ? "दैनिक दर्शन" : "Daily Darshan"}
                </span>{" "}
                <span className="bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text text-transparent">
                  {language === "hi" ? "समय-सारिणी" : "Timings"}
                </span>
              </h2>
              <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                {language === "hi"
                  ? "श्री श्री गौर नटराज दयाल निताई मंदिर की दैनिक आराधना-सारिणी के माध्यम से दिव्य वातावरण का अनुभव करें।"
                  : "Experience the divine atmosphere of Sri Sri Gaur Nataraj Dayal Nitai Temple through our daily worship schedule. Each arati is a transcendental experience that uplifts the soul."}
              </p>
              <p className="leading-relaxed text-[var(--text-secondary)]">
                {language === "hi"
                  ? "नीचे किसी भी समय को खोलकर उस सेवा का संक्षिप्त विवरण देख सकते हैं।"
                  : "Click any session below to expand and see full details and what to expect during each service."}
              </p>
            </div>
            <a
              href="#visit-guide"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-saffron)] px-6 py-3 font-cinzel text-sm uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(217,119,6,0.22)]"
            >
              {language === "hi"
                ? "यात्रा की योजना बनाएं ↗"
                : "Plan Your Visit ↗"}
            </a>
          </div>

          {/* Right — Accordion */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.title}
                className={`bg-[var(--elevated)] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 ${
                  item.isOpen ? "border-[var(--accent-gold)]" : ""
                }`}
              >
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-[rgba(217,119,6,0.04)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="min-w-[130px] rounded-md border border-[var(--border-gold)] bg-[rgba(183,121,31,0.08)] px-3 py-1 text-center font-cinzel text-sm text-[var(--accent-gold)]">
                      {item.time}
                    </span>
                    <h3 className="font-cinzel text-lg text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <div
                    className={`w-6 h-6 border border-[var(--border)] rounded flex items-center justify-center transition-all duration-300 ${
                      item.isOpen
                        ? "rotate-180 border-[var(--accent-gold)] text-[var(--accent-gold)]"
                        : ""
                    }`}
                  >
                    ▾
                  </div>
                </button>

                {/* Body */}
                <div
                  className={`overflow-hidden transition-all duration-350 ease-in-out ${
                    item.isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{
                    transition:
                      "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
                  }}
                >
                  <div className="px-5 pb-5 pt-2 border-t border-[var(--border)]">
                    <p className="font-crimson italic leading-relaxed text-[var(--text-secondary)]">
                      <strong className="text-[var(--accent-gold)]">
                        {item.content.split(" — ")[0]}
                      </strong>{" "}
                      — {item.content.split(" — ")[1]}
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
