# Vikku Water Supplier — Website

Official website for **Vikku Water Supplier** — a bulk Water Tanker & Can supplier of DM (Demineralized) Water, Distilled Water, Battery Water, Soft Water, R.O. Water, DI Water & RAW Water in Noida, Greater Noida, Ghaziabad & East Delhi.

Built with **React + Vite**. Single-page app with hash-based navigation (`#home`, `#aboutus`, `#products`, `#contact`, `#enquiry`).

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI library |
| Vite 5 | Build tool & dev server |
| Plain CSS-in-JS | Styling (inline styles + `<style>` block) |

No CSS framework, no router library. All sections live in one file.

---

## Project Structure

```
vikku/
├── public/                    # Static assets served at the site root
│   ├── logo.png               # Navbar / footer logo
│   ├── favicon.png            # Browser tab icon
│   ├── robots.txt             # SEO crawler rules
│   ├── sitemap.xml            # SEO sitemap
│   ├── app-ads.txt            # AdMob verification
│   ├── *-water-supplier.jpg   # Product images (DM, RO, etc.)
│   ├── vikkuwaters*.jpeg       # Tanker fleet photos (hero)
│   └── *-privacy-policy.html  # Privacy policy pages
│
├── src/
│   ├── main.jsx               # React entry point
│   └── App.jsx                # Whole website (all sections + styles)
│
├── index.html                 # HTML shell + SEO meta tags (title, description, JSON-LD)
├── vite.config.js             # Vite config
├── package.json               # Dependencies & scripts
├── .gitignore
└── README.md
```

> **Important:** The entire website (header, hero, all sections, footer, styles) is in **`src/App.jsx`**. This is the file you'll edit 99% of the time.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally (development)
```bash
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173`).

### 3. Build for production
```bash
npm run build
```
Output goes to the `dist/` folder.

### 4. Preview the production build
```bash
npm run preview
```

---

## Deploying

The site is currently deployed on **Vercel**.

```bash
vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deploys on every push to `main`.

---

## How to Change Common Things

| What to change | Where |
|----------------|-------|
| Phone numbers, email, addresses | `src/App.jsx` (`NavBar` top bar, Contact section, Footer) |
| WhatsApp number | `WHATSAPP_URL` constant at the top of `src/App.jsx` |
| Products / water types | `PRODUCTS` and `WATER_DETAILS` arrays near the top of `src/App.jsx` |
| Testimonials | `TESTIMONIALS` array |
| Stats / achievements | `STATS` array |
| Brand colors | `C` (colors) object at the top of `src/App.jsx` |
| SEO title, description, keywords | `index.html` |
| Logo / favicon | Replace `public/logo.png` and `public/favicon.png` (keep the same filenames) |
| Product images | Replace the matching file in `public/` (keep the same filename) |
| Google Maps locations | Contact section in `src/App.jsx` (search for `maps.google.com`) |

---

## Brand Colors

Defined in the `C` object in `src/App.jsx`:

| Name | Hex |
|------|-----|
| blue | `#1a6fc4` |
| blueDark | `#0d5aa7` |
| blueMid | `#2f8fe0` |

---

## Notes

- Navigation uses URL hashes (e.g. `#products`). Links like `<a href="#products">` work from anywhere.
- All enquiry / "Get Best Price" buttons open WhatsApp with a pre-filled message.
- The contact/enquiry forms submit by opening WhatsApp (no backend required).
