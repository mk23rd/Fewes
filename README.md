# 🍽️ Fewes (ፈውስ) - Ethiopian Meal Kit Delivery

A modern, responsive web application for an Ethiopian meal kit delivery service. Fewes brings authentic Ethiopian cuisine to your doorstep with fresh ingredients and traditional recipes.

## ✨ Features

- **Interactive Menu System**: Browse through vegetarian, meat, and pescatarian Ethiopian dishes
- **Meal Planning**: Weekly and monthly subscription plans with flexible pricing
- **Recipe Details**: Complete ingredient lists and preparation guides
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Smooth Animations**: Modern UI with fluid transitions and glassmorphism effects
- **Ethiopian Language Support**: Bilingual interface (English/Amharic)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Libraries**: jQuery
- **Design**: Custom CSS with modern animations, gradients, and responsive layouts
- **Icons**: SVG favicon with Ethiopian script

## 📂 Project Structure

```
_Fewes/
├── Home/          # Landing page with menu carousel and specials
├── Menu/          # Full menu with filtering and cart functionality
├── Plans/         # Subscription pricing and FAQ
├── About/         # Company information and mission
└── favicon.svg    # Brand icon
```

## 🎨 Design Features

- Fixed navigation bar with backdrop blur effect
- Smooth scroll animations and page transitions
- Interactive food carousels and rotating images
- Card-based layouts with hover effects
- Modern color scheme (Ethiopian green and yellow theme)
- Responsive breakpoints for all screen sizes

## 💰 Pricing (ETB)

- **Starter Plan**: 1,450 ETB/week | 4,950 ETB/month
- **Family Plan**: 2,950 ETB/week | 9,950 ETB/month
- **Premium Plan**: 4,450 ETB/week | 14,950 ETB/month

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/_Fewes.git
```

2. Open `Home/index.html` in your browser
```bash
cd _Fewes/Home
open index.html
```

3. No build process required - pure HTML/CSS/JS!

## 📱 Pages

- **Home** (`/Home/`) - Landing page with menu preview and weekly specials
- **Menu** (`/Menu/`) - Full dish catalog with filtering by dietary preference
- **Plans** (`/Plans/`) - Subscription options and pricing
- **About** (`/About/`) - Company story and values

## 🧱 Backend (Firebase)

The repo ships with Firebase Hosting and Cloud Functions scaffolding so the static site can serve dynamic data (orders, auth) without additional infrastructure.

- **Prerequisites**: Node.js 18+, Firebase CLI (`npm install -g firebase-tools`), and a Firebase project with Firestore, Authentication, and Storage enabled.
- **Configure**: Update `.firebaserc` with your project ID or run `firebase use --add` inside the repo.
- **Install**: `cd functions && npm install` to pull backend dependencies.
- **Local emulators**: From the repo root run `cd functions && npm run serve` (builds TypeScript, then launches Functions, Firestore, Auth, and Hosting emulators).
- **Deploy**: `cd functions && npm run deploy` pushes only the Cloud Functions. Deploy hosting with `firebase deploy --only hosting`.
- **Environment**: Optional overrides via `.env` in `functions/` (`ALLOWED_ORIGINS`, `ORDERS_COLLECTION`, `FUNCTION_REGION`). Default API base is `/api/...`.

> ⚠️ Cloud Functions require the Blaze (pay-as-you-go) plan. You can still run everything locally on the Spark free tier, but production deployment of the API endpoints needs billing enabled. If you must stay on Spark, consider calling Firestore directly from the frontend with strict security rules instead of deploying the Express API.

### Available API Routes

- `GET /api/health` – basic health check.
- `POST /api/orders` – create an order (requires Firebase ID token).
- `GET /api/orders` – list orders for the authenticated user.
- `GET /api/orders/:id` – retrieve a single order (owner or admin only).
- `PATCH /api/orders/:id/status` – update order status (admin only).

### Frontend Firebase Setup

- Paste the web app config snippet from Firebase Console → Project settings → General into `firebase-config.js` (placeholders provided).
- Include the script in any page that needs Firebase services, e.g. `<script src="../firebase-config.js"></script>` right before your other Firebase-dependent scripts.
- The config values are public identifiers, so they stay in this JS file; do not commit service-account JSON keys.

## 🌟 Key Highlights

- 12+ authentic Ethiopian dishes
- Ingredient-level recipe transparency
- Modern UI/UX with Ethiopian cultural elements
- Performance-optimized animations
- Accessible and SEO-friendly

## 📄 License

[MIT License](https://github.com/mk23rd/Fewes?tab=MIT-1-ov-file)

## 🤝 Contributors

This project was built collaboratively by our group.

> - [Benoni Moges](https://github.com/BenoniM)
> - [Michael Wagaye](https://github.com/mk23rd)
> - [Robel Yakob](https://github.com/Korvowastaken)
> - [Samuel Gosaye](https://github.com/SammyG02)


---

**ፈውስ** - *Healing through food* 🇪🇹
