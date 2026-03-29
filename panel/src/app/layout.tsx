import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const devCacheResetScript = `
  (function () {
    if (window.location.hostname !== "localhost") return;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        registrations.forEach(function (registration) {
          registration.unregister();
        });
      });
    }
    if ("caches" in window) {
      caches.keys().then(function (keys) {
        keys.forEach(function (key) {
          caches.delete(key);
        });
      });
    }
  })();
`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["PlaceOfWorship", "LocalBusiness"],
  name: "ISKCON Greater Noida",
  description:
    "Official website of ISKCON Greater Noida with temple timings, darshan details, seva opportunities, and visitor information.",
  telephone: "+91 98716 47891",
  email: "info@iskcongreaternoida.org",
  image: "https://www.iskcongreaternoida.org/deities_3.jpeg",
  url: "https://www.iskcongreaternoida.org",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-49, Block N, Zeta I",
    addressLocality: "Greater Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201310",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/iskcon.gn/",
    "https://www.youtube.com/@iskcongreaternoida",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "04:30",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "16:00",
      closes: "21:30",
    },
  ],
};

export const metadata: Metadata = {
  title: "ISKCON Greater Noida",
  description:
    "Official website for ISKCON Greater Noida with temple info, programs, seva opportunities, and contact details.",
  metadataBase: new URL("https://www.iskcongreaternoida.org"),
  manifest: "/site.webmanifest",
  openGraph: {
    title: "ISKCON Greater Noida",
    description:
      "Darshan timings, temple details, seva opportunities, and visitor information for ISKCON Greater Noida.",
    url: "https://www.iskcongreaternoida.org",
    siteName: "ISKCON Greater Noida",
    images: [
      {
        url: "/deities_3.jpeg",
        width: 1200,
        height: 630,
        alt: "ISKCON Greater Noida deity darshan",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISKCON Greater Noida",
    description:
      "Darshan timings, seva details, visitor guidance, and temple updates from ISKCON Greater Noida.",
    images: ["/deities_3.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {process.env.NODE_ENV !== "production" ? (
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: devCacheResetScript }}
          />
        ) : null}
        <script suppressHydrationWarning type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <LanguageProvider>
          {children}
          <ServiceWorkerRegistration />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
