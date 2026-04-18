"use client";
import { Clock, Info } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const parseTimeToMinutes = (timeStr: string) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (!minutes) minutes = 0;
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

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
      time: "8:30 AM",
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
      time: "4:30 PM",
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
      time: "7:00 PM",
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
      time: "8:30 AM",
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
      time: "4:30 PM",
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
      time: "7:00 PM",
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
};

export default function DarshanTimings() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const items = useMemo(() => {
    return accordionData[language as "en" | "hi"].map((item, index) => ({
      ...item,
      isOpen: index === openIndex,
      timeValue: parseTimeToMinutes(item.time),
    }));
  }, [language, openIndex]);

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const isTempleOpen = useMemo(() => {
    const morningOpen = parseTimeToMinutes("4:30 AM");
    const morningClose = parseTimeToMinutes("12:00 PM");
    const eveningOpen = parseTimeToMinutes("4:00 PM");
    const eveningClose = parseTimeToMinutes("9:30 PM");

    return (
      (currentMinutes >= morningOpen && currentMinutes <= morningClose) ||
      (currentMinutes >= eveningOpen && currentMinutes <= eveningClose)
    );
  }, [currentMinutes]);

  const nextArati = useMemo(() => {
    const futureItems = items.filter((item) => item.timeValue > currentMinutes);
    return futureItems.length > 0 ? futureItems[0] : items[0];
  }, [items, currentMinutes]);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="timings"
      lang={language}
      className="timings-section section relative border-y border-[var(--border)] bg-[var(--surface)] py-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/deities_5.jpeg')] bg-cover bg-center opacity-[0.14]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,238,0.96)_0%,rgba(255,248,238,0.9)_40%,rgba(255,248,238,0.96)_100%)]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Left Panel */}
          <div className="sticky top-24 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${isTempleOpen ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500"} animate-pulse`}
                />
                <span className="font-cinzel text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)]">
                  {isTempleOpen
                    ? language === "hi"
                      ? "मंदिर अभी खुला है"
                      : "Temple Open Now"
                    : language === "hi"
                      ? "मंदिर अभी बंद है"
                      : "Temple Currently Closed"}
                  {" · "}
                  <span className="text-[var(--text-secondary)] font-normal">
                    {isTempleOpen
                      ? currentMinutes < 720
                        ? "Closes at 12:00 PM"
                        : "Closes at 9:30 PM"
                      : currentMinutes < 270
                        ? "Opens at 4:30 AM"
                        : "Opens at 4:00 PM"}
                  </span>
                </span>
              </div>

              <div>
                <h2 className="mb-4 font-cinzel text-3xl font-semibold lg:text-4xl">
                  <span className="text-[var(--text-primary)]">
                    {language === "hi" ? "दैनिक दर्शन" : "Daily Darshan"}
                  </span>{" "}
                  <span className="bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-saffron)] bg-clip-text text-transparent">
                    {language === "hi" ? "समय-सारिणी" : "Timings"}
                  </span>
                </h2>
                <p className="max-w-md leading-relaxed text-[var(--text-secondary)]">
                  {language === "hi"
                    ? "श्री श्री गौर नटराज दयाल निताई मंदिर की दैनिक आराधना-सारिणी के माध्यम से दिव्य वातावरण का अनुभव करें।"
                    : "Experience the divine atmosphere of Sri Sri Gaur Nataraj Dayal Nitai Temple through our daily worship schedule."}
                </p>
              </div>
            </div>

            {/* Next Arati Highlight Card */}
            <div className="rounded-2xl border border-[var(--border-gold)] bg-gradient-to-br from-[#fff9f0] to-[#fdf2e2] p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[var(--accent-saffron)]" />
                <span className="font-cinzel text-xs uppercase tracking-widest text-[var(--accent-saffron)]">
                  Upcoming Service
                </span>
              </div>
              <h3 className="font-cinzel text-2xl text-[var(--text-primary)] mb-1">
                {nextArati.title}
              </h3>
              <p className="font-cinzel text-lg text-[var(--accent-gold)] mb-4">
                {nextArati.time}
              </p>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50 border border-[var(--border)]">
                <Info className="w-4 h-4 text-[var(--text-muted)] mt-1 flex-shrink-0" />
                <p className="text-sm italic text-[var(--text-secondary)]">
                  {nextArati.content.split(" — ")[0]}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#visit-guide"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-saffron)] px-8 py-3.5 font-cinzel text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(217,119,6,0.22)]"
              >
                {language === "hi"
                  ? "यात्रा की योजना बनाएं ↗"
                  : "Plan Your Visit ↗"}
              </a>
            </div>
          </div>

          {/* Right — Timeline View */}
          <div className="relative space-y-4">
            <div className="absolute left-8 top-8 bottom-8 w-[1px] bg-[var(--border-gold)] opacity-30 hidden md:block" />

            {items.map((item, index) => (
              <div
                key={item.title}
                className={`relative pl-0 md:pl-16 transition-all duration-300`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-7 top-7 w-3 h-3 rounded-full border-2 border-[var(--accent-gold)] bg-white z-10 hidden md:block ${item.isOpen ? "scale-125 bg-[var(--accent-gold)] shadow-[0_0_8px_var(--accent-gold)]" : "opacity-50"}`}
                />

                <div
                  className={`bg-[var(--elevated)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                    item.isOpen
                      ? "border-[var(--accent-gold)] shadow-md"
                      : "hover:border-[var(--border-gold)]"
                  }`}
                >
                  {/* Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full flex flex-col md:flex-row md:items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-[rgba(217,119,6,0.02)]"
                  >
                    <div className="flex items-center gap-5">
                      <span className="min-w-[100px] font-cinzel text-sm font-semibold text-[var(--accent-gold)]">
                        {item.time}
                      </span>
                      <h3 className="font-cinzel text-lg text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                    </div>
                    <div
                      className={`hidden md:flex w-8 h-8 rounded-full items-center justify-center transition-all duration-300 ${
                        item.isOpen
                          ? "rotate-180 bg-[var(--accent-gold)] text-white"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      ▾
                    </div>
                  </button>

                  {/* Body */}
                  <div
                    className={`overflow-hidden transition-all duration-350 ease-in-out ${
                      item.isOpen
                        ? "max-h-[300px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-6 pt-2 border-t border-[var(--border)]">
                      <p className="leading-relaxed text-[var(--text-secondary)] text-[0.95rem]">
                        <strong className="text-[var(--accent-gold)] block mb-1">
                          {item.content.split(" — ")[0]}
                        </strong>
                        {item.content.split(" — ")[1]}
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
