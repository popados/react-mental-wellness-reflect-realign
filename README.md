# Reflect & Realign — Mental Health Check-In

A private, local-first wellness app for daily mood tracking, grounding exercises, affirmations, and CBT-style thought records. Built with React + Vite. All data is stored in the browser's `localStorage` — nothing leaves the device.

## Features

- **Home** — daily greeting, a 7-day check-in trail, today's affirmation, a quick body-sensation mood log, and shortcuts into grounding and thought records.
- **Affirmation** — a daily rotating affirmation you can save to a favorites list.
- **Moods (Wellness checks)** — a body-based check-in (tap a sensation like *Tense*, *Heavy*, *Light*, *Grounded*...), an energy rating, a "behavior after feeling" note, a terrain chart of recent check-ins, and a daily habit list with streak tracking and a 24-hour scheduler.
- **Grounding** — guided breathing patterns with an adjustable timer, plus a 5-4-3-2-1 senses exercise.
- **Emotions** — a CBT thought record: situation, automatic thought, emotion (19 to choose from), intensity before/after, a combined evidence-and-reframe field, and an emotional breakdown pie chart of logged entries.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint      # eslint
npm run preview   # preview the production build
```

## Tech stack

- React 19 + Vite
- Plain CSS (no framework) with a shared design system of CSS variables, cards, and chips
- `localStorage` for persistence (no backend, no accounts)

## Layout & responsiveness

The app fills the full viewport (no phone-frame mockup) with three breakpoints:

- **Mobile** (default) — single column, bottom tab bar.
- **Tablet** (≥640px) — wider centered content column, bottom tab bar.
- **Desktop** (≥1024px) — collapsible left sidebar (icon-only by default, expands to show full labels) instead of the bottom tab bar, with a wider centered content column.

## Recent updates

- Added a daily habit list to the Moods screen, with a streak counter and a 24-hour scheduler/timeline showing when each habit is due.
- Made the app fill the full browser viewport (removed the phone-frame mockup) and added responsive breakpoints for desktop, tablet, and mobile.
- Turned the desktop navigation into an expandable sidebar (icon-only, expands to show full titles) in place of the bottom tab bar.
- Consolidated the Emotions thought record's three separate fields (evidence for, evidence against, balanced thought) into one concise "Evidence for thoughts and balanced change" field.
- Expanded the Emotions log's emotion list from 6 to 19 options.
- Replaced the 1–5 numeric mood scale in the Wellness checks screen with a body-based check (sensation chips like Tense, Heavy, Light, Grounded).
- Updated the Home screen's quick "Daily mood" log to use the same body-sensation chips as the Wellness view.
- Relabeled the Wellness check's note field to "Behavior after feeling" to prompt for what you did in response to the sensation.
