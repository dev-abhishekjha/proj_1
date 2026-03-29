import Link from "next/link";
import TemplePhoto from "@/components/TemplePhoto";

const deityImages = [
  "/deities_1.jpeg",
  "/deities_2.jpeg",
  "/deities_3.jpeg",
  "/deities_4.jpeg",
  "/deities_5.jpeg",
  "/deities_6.jpeg",
  "/deities_7.jpeg",
  "/deities_8.jpeg",
];

const foodForLifeImages = [
  "/food_for_life_1.jpeg",
  "/food_for_life_2.jpeg",
  "/food_for_life_3.jpeg",
  "/food_for_life_4.jpeg",
  "/food_for_life_5.jpeg",
  "/food_for_life_6.jpeg",
];

const templeActivityImages = [
  "/gallery1.jpeg",
  "/gallery2.jpeg",
  "/gallery3.jpeg",
  "/gallery4.jpeg",
  "/gallery5.jpeg",
  "/gallery6.jpeg",
  "/gallery7.jpeg",
];

function GallerySection({
  id,
  title,
  subtitle,
  images,
}: {
  id: string;
  title: string;
  subtitle: string;
  images: string[];
}) {
  return (
    <section id={id} className="py-16">
      <div className="container mx-auto px-7">
        <div className="mb-8">
          <h2 className="font-cinzel text-[clamp(1.8rem,3vw,2.4rem)] font-medium text-[var(--text-primary)]">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl font-crimson text-[1.05rem] text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-[16px] border border-[var(--border)] shadow-[var(--shadow-soft)] ${index === 0 ? "sm:col-span-2" : ""}`}
            >
              <div className="relative h-[280px] w-full">
                <TemplePhoto
                  src={src}
                  alt={title}
                  fallbackLabel={`${title} photo`}
                  fallbackDescription={`Add a replacement ${title.toLowerCase()} image here without breaking the gallery layout.`}
                  className="h-full"
                  imageClassName="object-cover"
                  priority={index < 2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pb-20 text-[var(--text-primary)]">
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20">
        <div className="container mx-auto px-7">
          <Link
            href="/"
            className="font-cinzel text-[11px] uppercase tracking-widest text-[var(--accent-gold)]"
          >
            ← Back to Home
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-[var(--accent-saffron)]">
              Full Gallery
            </span>
            <h1 className="mt-2 font-cinzel text-[clamp(2.2rem,5vw,4rem)] font-semibold text-[var(--text-primary)]">
              Deities, Food for Life, and Temple Activities
            </h1>
            <p className="mt-4 font-crimson text-[1.08rem] leading-8 text-[var(--text-secondary)]">
              Explore dedicated photo sections from temple life at ISKCON
              Greater Noida.
            </p>
          </div>
        </div>
      </section>

      <GallerySection
        id="deities"
        title="Deities"
        subtitle="Darshan of Sri Sri Gaur Nataraj Dayal Nitai and sacred altar moments."
        images={deityImages}
      />
      <GallerySection
        id="food-for-life"
        title="Food for Life"
        subtitle="Prasadam seva, distribution drives, and community nourishment through daily service."
        images={foodForLifeImages}
      />
      <GallerySection
        id="temple-activities"
        title="Temple Activities"
        subtitle="Festival celebrations, kirtan, arati, and devotional life in the temple community."
        images={templeActivityImages}
      />
    </main>
  );
}
