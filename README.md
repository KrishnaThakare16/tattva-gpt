# Tattva Advertising Solution

Complete React + TypeScript + Vite website, including all images and assets.

## Run locally

Install Node.js 22 LTS with npm, extract this ZIP, then open a terminal in the `tattva-site` folder:

```sh
npm install
npm run dev
```

Open the localhost address printed by Vite (normally http://localhost:5173).
No environment file or API key is needed to run the website. Internet access is required to install dependencies and use Google Maps, hosted fonts, WhatsApp and the inquiry email service.

## Production build

```sh
npm run build
npm run preview
```

The production output is in `dist/`.

## Project structure

- `src/components/`: navigation, loader, cursor, countdown, contact form, map, footer and reveal animation
- `src/pages/Home.tsx`: page sections and hero
- `src/animations/`: Framer Motion variants
- `src/hooks/`: reusable hooks
- `src/utils/config.ts`: contact and site configuration
- `src/styles.css`: responsive styling
- `public/assets/`: all supplied and site images
- `public/`: favicon, robots, sitemap and redirect configuration
- `package.json` and `package-lock.json`: scripts and dependency versions
- `vite.config.ts` and `tsconfig.json`: Vite and TypeScript configuration
- `vercel.json`: Vercel deployment configuration
- `.openai/hosting.json`: original Sites deployment metadata; not needed for local use
- `drizzle.config.ts`: unused inherited configuration; this static website does not require a database

## Inquiry form

Submit Inquiry uses FormSubmit to send inquiries to landemandar61@gmail.com. The owner must complete FormSubmit's email verification. Inbox delivery has not been verified. A new hosting origin may need another activation. The separate WhatsApp button uses +91 9322357689. The form preserves input if submission fails.

## Content and deployment

The hero uses board1.jpeg. The inauguration countdown targets 9 October 2026 at 10:00 AM IST. Edit the relevant components for changes.

Vercel: use the Vite preset, `npm run build`, and output directory `dist`.
AWS S3 + CloudFront: upload `dist/`; configure SPA fallback to `/index.html`. Update the canonical URL in `src/utils/config.ts`, sitemap and robots.txt when changing domains.

Installed dependencies, Git history, old archives, build caches and generated `dist/` are omitted. They are not required to run the project.
