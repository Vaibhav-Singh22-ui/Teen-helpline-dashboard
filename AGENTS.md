<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Teens Helpline Student Portal — Agent Guidelines

Welcome, Agent! You are assisting **Vaibhav Pratap Singh** on the **Teens Helpline Student Portal** dashboard project. This guide outlines project-specific rules, configuration details, and domain constraints you must follow.

---

## 🚀 Project Quick Start & Commands

- **Package Manager:** `npm`
- **Development Server:** `npm run dev` (Runs locally on **port 3001**: `http://localhost:3001`)
- **Production Build:** `npm run build`
- **Linting:** `npm run lint`

---

## 🛠️ Technology Stack & Configuration

- **Framework:** Next.js `16.2.9` (App Router)
- **Library:** React `19.2.4` / React DOM `19.2.4`
- **Database / API:** Supabase (`@supabase/supabase-js`)
- **Styling:** Tailwind CSS `v4` (using `@tailwindcss/postcss` and PostCSS)
- **Icons:** `lucide-react`

---

## 📁 Key File Structure

- `src/app/` — Routing, page pages, and global styling.
  - [layout.tsx](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/app/layout.tsx): Root layout with metadata and page wraps.
  - [globals.css](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/app/globals.css): Global styling, styling variables, and Tailwind imports.
  - [page.tsx](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/app/page.tsx): Main student portal dashboard UI.
- `src/components/` — Shared UI components.
  - [LayoutWrapper.tsx](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/components/LayoutWrapper.tsx): Application layout scaffolding.
- `src/lib/` — Business logic and data flow.
  - [types.ts](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/lib/types.ts): Main domain TypeScript interfaces.
  - [supabase.ts](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/lib/supabase.ts): Supabase client and client-side mocking fallback utilities.

---

## 💡 Domain Concepts & Models

When editing features or adding pages, align with these core database entities defined in [types.ts](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/lib/types.ts):
- **Profile:** Handles student details, including emotional `buddy_name`, `buddy_avatar`, `buddy_personality`, and rewarding `points`.
- **MoodHistory:** Daily check-ins logging mood, stress levels (1–10), sleep quality, and daily goal completion.
- **CounselorBooking:** Sessions booked with wellness professionals (supporting text/audio/video formats).
- **SafeJournal:** Private diary entries with AI `buddy_reflection` text.
- **Goals:** Habit tracking (daily/weekly frequency).

---

## ⚠️ Strict Development Constraints

1. **Preserve Headers:** Never remove or modify the `<!-- BEGIN:nextjs-agent-rules -->` block.
2. **Next.js 16 / Canary Routing:** Before writing page routing or layouts, check documentation guides inside `node_modules/next/dist/docs/`.
   - *Example:* For resolving client-side navigation issues with Suspense, you must export `unstable_instant` from the route.
3. **Database Fallback:** Always query data via the wrappers in `dbService` inside [supabase.ts](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/lib/supabase.ts). The app must seamlessly fall back to local mock data (stored in `localStorage`) if Supabase configuration credentials are not set.
4. **Tailwind CSS v4 Rules:** This project uses Tailwind CSS v4. Do NOT add `tailwind.config.js`. Style overrides must be written in CSS variables inside [globals.css](file:///c:/Users/Vaibhav%20Singh/Downloads/teens-helpline-dashboard/src/app/globals.css).
5. **Modern Visual Aesthetics:** Ensure a clean, responsive layout using dark glassmorphism effects, curated gradients, micro-animations, and descriptive icons. Keep design patterns premium.
