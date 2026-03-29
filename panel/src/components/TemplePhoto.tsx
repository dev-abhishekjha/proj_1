"use client";

import Image from "next/image";
import { useState } from "react";

interface TemplePhotoProps {
  src: string;
  alt: string;
  fallbackLabel: string;
  fallbackDescription: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  objectPosition?: string;
}

export default function TemplePhoto({
  src,
  alt,
  fallbackLabel,
  fallbackDescription,
  className = "",
  imageClassName = "",
  priority = false,
  objectPosition = "center",
}: TemplePhotoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex h-full min-h-[280px] w-full items-end overflow-hidden bg-[radial-gradient(circle_at_top,rgba(183,121,31,0.16),transparent_40%),linear-gradient(160deg,#f8ecda_0%,#ead2a7_100%)] p-6 ${className}`}
      >
        <div className="w-full rounded-[18px] border border-[rgba(255,255,255,0.4)] bg-[rgba(255,250,243,0.76)] p-5 backdrop-blur">
          <div className="font-cinzel text-[11px] uppercase tracking-[0.12em] text-[var(--accent-gold)]">
            {fallbackLabel}
          </div>
          <p className="mt-2 font-crimson text-[1rem] leading-7 text-[var(--text-secondary)]">
            {fallbackDescription}
          </p>
          <div className="mt-4 font-cinzel text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Placeholder keeps layout stable until the photograph is added.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={imageClassName}
        style={{ objectPosition }}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
