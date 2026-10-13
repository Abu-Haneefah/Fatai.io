# Fatai.io - Next.js + Tailwind CSS Portfolio

A modern, responsive portfolio built with **Next.js** and **Tailwind CSS**. This project showcases clean design, lightning-fast performance, and component-based architecture.

## Features

- Built with Next.js 13+
- Tailwind CSS for utility-first styling
- Fully responsive and mobile-friendly layout
- Clean, minimal interface for personal branding

## Live Demo

[View Live Project](https://fatai-io-n11x-6hehv5s2g-abu-haneefah-s-projects.vercel.app)

## Getting Started

1. Clone the repository  
2. Install dependencies with `npm install`  
3. Run the development server: `npm run dev`

## Micro-Teaching Pages (`/teach`)

Interactive 3-minute micro-teaching demos for the BRINT Online School tutor interview, reachable from the **Teach** link in the navbar:

| Route | Topic |
|-------|-------|
| `/teach` | Landing page: two lesson cards + interview checklist |
| `/teach/physics` | **Work, Energy & Power** — 6 slides with Three.js simulations |
| `/teach/coding` | **HTML & CSS** — 5 slides + live coding playground |

Add `?present=1` to either lesson URL (or use the **Start Presentation** buttons on `/teach`) to open it directly in fullscreen Presentation Mode.

### Keyboard shortcuts (inside a lesson)

| Key | Action |
|-----|--------|
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `F` | Toggle fullscreen (`Esc` exits) |
| `N` | Toggle the speaker-notes script drawer |
| `T` | Start / pause the 3:00 countdown timer |
| `H` | Hide / show the timer |

### How to rehearse

1. Open `/teach`, pick your subject, press **Start Presentation**.
2. Turn the timer on with `T` and talk through the speaker notes (`N`).
3. Time budget — **Physics:** Hook 20s · Work 45s · Energy 50s · Power 45s · Quiz 20s · Summary 20s (≈3:00). Aim to finish near **2:40** for buffer.
4. On interview day: laptop only, camera on, quiet well-lit room, notifications off, and share the **browser tab** (not the whole desktop) with tab audio off.
5. Backup: keep a screenshot/PDF of the slides and deploy to the live portfolio URL as well as `localhost`.

## Tools Used

- **Next.js**
- **Tailwind CSS**
- **JavaScript/TypeScript**
- **Vercel** for deployment

## Future Improvements

- **AI Chatbot Integration** — Adding an interactive AI assistant to guide users through Fatai.io, answer common questions, and provide personalized suggestions.

## Author

- GitHub: [@abu-haneefah](https://github.com/abu-haneefah)
- Portfolio: [abu-haneefah.github.io](https://abu-haneefah.github.io)