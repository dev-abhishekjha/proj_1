"use client";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const faqData = {
  en: [
    {
      question: "Do I need to be a Hindu to visit the temple?",
      answer:
        "Absolutely not. ISKCON welcomes everyone regardless of religion, nationality, caste, or background. Sri Krishna says in the Bhagavad-gita that all souls are His children. Everyone is warmly welcome to participate in all our programs.",
    },
    {
      question: "What should I wear when visiting?",
      answer:
        "Please dress modestly when visiting the temple. Traditional Indian attire (saree, kurta-pyjama) is appreciated but not mandatory. Clothes should cover shoulders and knees. You will need to remove footwear before entering the temple hall.",
    },
    {
      question: "Is prasadam (food) available daily?",
      answer:
        "Yes! Free prasadam is distributed after every arati. On Sundays during the Love Feast (7–9:30 PM), a full prasadam meal is served to all attendees. All food is strictly vegetarian and prepared with devotion.",
    },
    {
      question: "How can I donate or sponsor a seva?",
      answer:
        "You can donate via bank transfer, UPI (Google Pay, PhonePe, Paytm), or in person at the temple. All donations qualify for 80G tax exemption. You can sponsor specific sevas like Abhishek, deity dress, or a day's prasadam. Contact us for more details.",
    },
    {
      question: "Can children attend programs?",
      answer:
        "Yes! Children are always welcome. We have the Prahlad School — a Vedic education program specifically designed for children that runs on Sundays. It teaches Sanskrit, Vedic stories, music, and spiritual values in a fun and engaging way.",
    },
    {
      question: "How do I become a volunteer?",
      answer:
        "Simply fill out the Devotee Registration form on this website or visit the temple and speak with our seva coordinator. Volunteer opportunities include Food for Life distribution, event management, deity service, and more. All are welcome to serve!",
    },
  ],
  hi: [
    {
      question: "क्या मंदिर आने के लिए हिंदू होना जरूरी है?",
      answer:
        "बिलकुल नहीं। ISKCON सभी धर्म, जाति, देश और पृष्ठभूमि के लोगों का स्वागत करता है। सभी भक्त हमारे कार्यक्रमों में सम्मिलित हो सकते हैं।",
    },
    {
      question: "मंदिर आते समय क्या पहनना चाहिए?",
      answer:
        "कृपया शालीन वस्त्र पहनें। कंधे और घुटने ढके हों। पारंपरिक भारतीय वस्त्र अच्छा विकल्प हैं, लेकिन अनिवार्य नहीं। मंदिर हॉल में प्रवेश से पहले जूते उतारने होंगे।",
    },
    {
      question: "क्या प्रतिदिन प्रसाद मिलता है?",
      answer:
        "हाँ। प्रत्येक आरती के बाद प्रसाद वितरित होता है। रविवार के लव फिस्ट कार्यक्रम में सभी के लिए विशेष प्रसाद व्यवस्था रहती है।",
    },
    {
      question: "दान या सेवा प्रायोजन कैसे करें?",
      answer:
        "आप UPI, बैंक ट्रांसफर, या मंदिर में आकर दान कर सकते हैं। अभिषेक, वस्त्र, पुष्प या प्रसाद सेवा जैसे विशेष सेवादान भी उपलब्ध हैं।",
    },
    {
      question: "क्या बच्चे कार्यक्रमों में आ सकते हैं?",
      answer:
        "हाँ, बच्चे सदा स्वागत योग्य हैं। प्रह्लाद स्कूल में संस्कृत, वैदिक कथाएँ, संगीत और संस्कार आधारित गतिविधियाँ आयोजित होती हैं।",
    },
    {
      question: "मैं स्वयंसेवक कैसे बनूँ?",
      answer:
        "वेबसाइट पर फॉर्म भरें या मंदिर में आकर सेवा समन्वयक से मिलें। फूड फॉर लाइफ, उत्सव प्रबंधन, और अन्य सेवाओं में योगदान दे सकते हैं।",
    },
  ],
} satisfies Record<"en" | "hi", Omit<FaqItem, "isOpen">[]>;

export default function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const items = useMemo(
    () =>
      faqData[language].map((item, index) => ({
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
      id="faq"
      lang={language}
      className="bg-[var(--surface)] border-t border-[var(--border)] py-24"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-18">
          <div className="space-y-6">
            <div>
              <p className="mb-2 font-cinzel text-sm uppercase tracking-[0.12em] text-[var(--accent-saffron)]">
                {language === "hi" ? "सामान्य प्रश्न" : "Common Questions"}
              </p>
              <h2 className="mb-4 font-cinzel text-3xl font-semibold lg:text-4xl">
                <span className="text-[var(--text-primary)]">
                  {language === "hi" ? "अक्सर पूछे जाने वाले" : "Frequently Asked"}
                </span>{" "}
                <span className="bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text text-transparent">
                  {language === "hi" ? "प्रश्न" : "Questions"}
                </span>
              </h2>
              <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                {language === "hi"
                  ? "मंदिर आने, जुड़ने या सेवा करने से पहले उपयोगी जानकारी।"
                  : "Everything you need to know before visiting or joining our community."}
              </p>
            </div>
            <a
              href="#connect"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-saffron)] px-6 py-3 font-cinzel text-sm uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(217,119,6,0.22)]"
            >
              {language === "hi" ? "सीधे पूछें ↗" : "Ask Us Directly ↗"}
            </a>
          </div>

          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={item.question}
                className={`overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--elevated)] transition-all duration-300 ${
                  item.isOpen ? "border-[var(--accent-gold)]" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-[rgba(217,119,6,0.04)]"
                >
                  <h3 className="pr-4 font-cinzel text-base font-medium text-[var(--text-primary)]">
                    {item.question}
                  </h3>
                  <div
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-[var(--border)] transition-all duration-300 ${
                      item.isOpen
                        ? "rotate-45 border-[var(--accent-gold)] text-[var(--accent-gold)]"
                        : ""
                    }`}
                  >
                    +
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-350 ease-in-out ${
                    item.isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{
                    transition:
                      "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
                  }}
                >
                  <div className="px-5 pb-5">
                    <div className="border-t border-[var(--border)] pt-4">
                      <p className="font-crimson text-base leading-relaxed text-[var(--text-secondary)]">
                        {item.answer}
                      </p>
                    </div>
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
