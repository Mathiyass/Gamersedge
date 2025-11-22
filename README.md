# GamersEdge

**Architect Your Destiny.**

GamersEdge is a futuristic, cyberpunk-themed e-commerce platform for high-end gaming hardware. Built as a Single Page Application (SPA) experience using **Advanced Vanilla JS** and **Tailwind CSS**.

## Features

-   **Cyberpunk UI/UX**: Custom "Cyber-Lux" visual language with glassmorphism, neon glows, and glitch effects.
-   **Neural Search**: Instant component search with Ctrl+K support.
-   **PC Builder Logic**: Step-by-step PC builder with basic compatibility checks (Intel vs AMD motherboards).
-   **Reactive State Management**: Centralized `Store` class (Pub/Sub pattern) handling cart, products, and user session, persisted to `localStorage`.
-   **Admin Dashboard**: "Fortress" admin panel for inventory and order management (simulated).
-   **Global Preloader**: Slick loading animation for a polished feel.
-   **Industrial Ready**:
    -   Robust Error Handling (Image fallbacks, graceful failures).
    -   Modular Code Structure (ES6 Modules).
    -   SEO Optimized.
    -   Accessibility considerations.

## Tech Stack

-   **Frontend**: HTML5, Tailwind CSS (CDN), Vanilla JavaScript (ES6+).
-   **State Management**: Custom Pub/Sub Store.
-   **Icons**: Heroicons (SVG).
-   **Fonts**: Inter (Google Fonts).

## Project Structure

```
.
├── index.html          # Main Storefront
├── admin.html          # Admin Dashboard
├── builder.html        # PC Builder Tool
├── assets/
│   ├── css/
│   │   └── style.css   # Custom Styles & Animations
│   ├── js/
│   │   ├── app.js      # Main Store Logic
│   │   ├── admin.js    # Admin Logic
│   │   ├── builder.js  # (Logic inline in builder.html for simplicity)
│   │   └── core/
│   │       ├── store.js # Central State Manager
│   │       └── ui.js    # UI Manager (Toasts, Modals, Loader)
│   └── images/         # Static Assets
└── README.md
```

## How to Run

Since this project uses ES6 Modules, it must be served via a local server (opening `index.html` directly in the file system will result in CORS errors).

### Using Python

```bash
# Python 3
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

### Using Node (http-server)

```bash
npx http-server .
```

## Admin Access

To access the "Fortress" Admin Panel:
1.  Navigate to `/admin.html` (or click the lock icon in the header).
2.  **Username**: `admin`
3.  **Password**: `admin`

## Development Notes

-   **Images**: Product images are hotlinked from external sources (ASUS, Amazon, etc.) for demonstration. A fallback placeholder is implemented if they fail to load.
-   **Data**: All data is seeded into `localStorage` on first load. Clear your browser's Local Storage to reset data.

---

&copy; 2025 GamersEdge. All Rights Reserved.
