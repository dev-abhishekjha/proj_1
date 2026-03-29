# ISKCON Greater Noida Website

This project contains the frontend website for ISKCON Greater Noida. It is built with Next.js and presents temple information, deity darshan, spiritual programs, seva activities, gallery pages, donation support, and direct contact options.

## Current Website Sections

- Hero section with animated deity-image slideshow
- Divine Darshan slider
- Spiritual Activities / Programs
- Food for Life with animated counters and image gallery
- Gallery preview with a dedicated full gallery page
- Donation section with QR scanner image
- Connect by email form
- Google Maps location link
- Frequently Asked Questions
- Newsletter, CTA banner, footer, and floating action buttons

## Social Links

- Instagram: `https://www.instagram.com/iskcon.gn/`
- YouTube: `https://www.youtube.com/@iskcongreaternoida`

## Gallery Structure

The homepage shows a short gallery preview.

The full gallery lives at `/gallery` and is split into:

- Deities
- Food for Life
- Temple Activities

## Contact Flow

The website uses an email-based contact flow.

- Destination email: `iskcongr.noida@gmail.com`
- The Connect form opens the visitor's email app using a `mailto:` link
- Users can choose a query type, and a custom query box appears only when `Other` is selected

## Branding Assets

The site uses the temple logo copied into:

- `panel/public/logo.jpg`

Other image assets used in the site include:

- deity images in `panel/public/deities_*.jpeg`
- Food for Life images in `panel/public/food_for_life_*.jpeg`
- gallery images in `panel/public/gallery*.jpeg`
- donation scanner image in `panel/public/scanner.jpeg`

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Main App Entry

Homepage composition is defined in:

- `panel/src/app/page.tsx`

Important reusable components live in:

- `panel/src/components/Hero.tsx`
- `panel/src/components/DeitiesSlider.tsx`
- `panel/src/components/Programs.tsx`
- `panel/src/components/FoodForLife.tsx`
- `panel/src/components/Gallery.tsx`
- `panel/src/components/Donate.tsx`
- `panel/src/components/Connect.tsx`
- `panel/src/components/Map.tsx`
- `panel/src/components/FAQ.tsx`
- `panel/src/components/MainNav.tsx`
- `panel/src/components/TopBar.tsx`
- `panel/src/components/Footer.tsx`

## Development

From the `panel` directory:

```bash
npm install
npm run dev
```

Type-check the project with:

```bash
npx tsc --noEmit
```

## Notes

- `README2.md` was unused and empty, so documentation has been consolidated into this single `README.md`.
- The current project documentation is intentionally focused on the website as it exists now.
