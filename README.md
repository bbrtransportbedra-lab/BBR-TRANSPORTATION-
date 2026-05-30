# BBR Transportation Website

Premium business website for **BBR Transportation**, Moodbidri, Dakshina Kannada, Karnataka.

---

## Tech Stack

- **React 18** — Component architecture
- **Vite 4** — Build tool & dev server
- **Plain CSS** — Custom design system (no Tailwind/MUI — full control)
- **Leaflet.js** — Interactive service area map
- **GitHub Actions** — CI/CD pipeline
- **Netlify** — Hosting & deployment

---

## Local Development

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/bbr-transportation.git
cd bbr-transportation

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## Deployment Setup

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: BBR Transportation website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bbr-transportation.git
git push -u origin main
```

### Step 2 — Create Netlify Site

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect your GitHub account
3. Select the `bbr-transportation` repository
4. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

### Step 3 — Add GitHub Secrets for CI/CD

In your GitHub repository → **Settings → Secrets → Actions**, add:

| Secret Name | Where to find it |
|---|---|
| `NETLIFY_AUTH_TOKEN` | Netlify → User Settings → Applications → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify → Site Settings → General → Site ID |

### Step 4 — Update the canonical URL

Once you have your Netlify URL (e.g. `https://bbr-transportation.netlify.app`):

1. Update `index.html` — replace `https://bbrtransportation.netlify.app/` with your actual URL
2. Update `public/sitemap.xml` — same replacement
3. Commit and push — GitHub Actions will auto-deploy

---

## Auto-Deploy Flow

```
Git push to main
    ↓
GitHub Actions triggered
    ↓
npm ci → npm run build
    ↓
Netlify CLI deploys dist/ → production
```

Pull requests get **preview deployments** automatically.

---

## Project Structure

```
bbr-transportation/
├── index.html              # Entry HTML with SEO metadata
├── vite.config.js          # Vite configuration
├── netlify.toml            # Netlify build & headers config
├── package.json
├── .gitignore
├── public/
│   ├── favicon.svg
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── main.jsx            # React entry point
│   ├── index.css           # Design system & all styles
│   └── App.jsx             # Full website (all sections)
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions CI/CD
```

---

## Contact Details in Website

| Field | Value |
|---|---|
| Primary Phone | +91 90087 02735 |
| Secondary Phone | +91 99725 84546 |
| Email | bbrtransportbedra@gmail.com |
| WhatsApp | https://wa.me/919008702735 |
| Address | Moodbidri, Dakshina Kannada, Karnataka – 574227 |

---

## Customisation

To update contact details, edit the constants at the top of `src/App.jsx`:

```js
const PHONE1      = 'tel:+919008702735'
const PHONE2      = 'tel:+919972584546'
const WHATSAPP    = 'https://wa.me/919008702735'
const EMAIL       = 'mailto:bbrtransportbedra@gmail.com'
```

---

© 2025 BBR Transportation. All rights reserved.
