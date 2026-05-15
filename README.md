# Otter Kitchens — Website

Bespoke Mediterranean kitchens & interiors. Designed and produced in Egypt.

**Live site:** https://www.otterkitchens.com

---

## Project Structure

```
otter-kitchens-website/
├── index.html        ← Full single-page website
├── css/style.css     ← All styles
├── js/main.js        ← Animations, interactions, Swiper, form
└── README.md         ← This file
```

---

## Replacing Placeholder Images

All images currently use Unsplash stock photos. To swap in real Otter Kitchens photos:

1. Add your images to an `assets/images/` folder
2. In `index.html`, find any `src="https://images.unsplash.com/..."` and replace with `src="assets/images/your-photo.jpg"`

---

## Setting Up the Contact Form

The form currently shows a success animation but does not send emails. To activate it:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — you'll get an endpoint like `https://formspree.io/f/xyzABCDE`
3. Open `js/main.js` and find the comment block near line 155 that says `"To actually send emails"`
4. Replace the simulated delay with the fetch call shown in the comment
5. Your form submissions will arrive at `Salma@otterkitchens.com`

---

## Deployment to Vercel

### Step 1 — Push to GitHub (already done if you followed setup)

```bash
cd ~/Desktop/otter-kitchens-website
git init
git add .
git commit -m "Initial website launch"
gh repo create otter-kitchens-website --public --source=. --push
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up / Log in with GitHub
2. Click **"Add New Project"**
3. Import the `otter-kitchens-website` repository
4. Framework Preset: **Other** (no framework)
5. Root directory: `/` (default)
6. Click **Deploy** — done in ~30 seconds

---

## Connecting www.otterkitchens.com (Google Domains via Squarespace)

### Step 1 — Add domain in Vercel

1. Vercel Dashboard → your project → **Settings** → **Domains**
2. Click **Add** and type: `otterkitchens.com`
3. Click **Add** again and type: `www.otterkitchens.com`
4. Vercel will show you two DNS values — keep this tab open

### Step 2 — Update DNS at Squarespace (Google Domains)

1. Go to [domains.squarespace.com](https://domains.squarespace.com)
2. Click **otterkitchens.com** → **DNS** → **DNS Settings**
3. **Delete** any existing `A` records and `CNAME` records for `@` and `www`
4. Add these two new records:

| Type  | Host | Value                  |
|-------|------|------------------------|
| A     | @    | `76.76.21.21`          |
| CNAME | www  | `cname.vercel-dns.com` |

5. Save changes

### Step 3 — Wait & Verify

- DNS propagation takes **5 – 30 minutes** (sometimes up to 48h for new domains)
- Once propagated, Vercel auto-provisions a free **SSL/HTTPS** certificate
- Visit https://www.otterkitchens.com — done!

---

## Updating the Site

After making any edits:

```bash
git add .
git commit -m "Update: describe your change"
git push
```

Vercel automatically rebuilds and deploys on every push to `main`.

---

## Brand Colours

| Name    | Hex       |
|---------|-----------|
| Navy    | `#1E2435` |
| Gold    | `#C9A64B` |
| Beige   | `#C4A882` |
| Cream   | `#F5F0E8` |

## Contact

- **Founder:** Salma Elsaadany — +20 12 8949 8450
- **Co-Founder:** Marcelle Saweris — +20 11 2510 5264
- **Email:** Salma@otterkitchens.com
- **Address:** Arabella Plaza, New Cairo, Egypt
- **Social:** @Otterkitchens.me
