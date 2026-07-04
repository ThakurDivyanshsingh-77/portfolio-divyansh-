# divyansh singh  Portfolio

A complete, interactive macOS-style portfolio built with **Next.js 15 App Router**, **TypeScript**, and **Tailwind CSS**. This project recreates a desktop-inspired portfolio experience with draggable windows, dock navigation, Spotlight search, Mission Control, an AI chat terminal, and a secure admin messages dashboard.

---
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4d008d23-e70c-49fa-b36f-81b29380d677" />
<img width="2" height="13" alt="image" src="https://github.com/user-attachments/assets/f2a311b5-db11-4bc4-997d-37004910f6d7" />


## Table of Contents

1. [Project Overview](#project-overview)
2. [Core Features](#core-features)
3. [Tech Stack](#tech-stack)
4. [Architecture and Data Flow](#architecture-and-data-flow)
5. [Key Project Modules](#key-project-modules)
6. [Environment Variables](#environment-variables)
7. [Setup and Development](#setup-and-development)
8. [Production Build and Deployment](#production-build-and-deployment)
9. [Security and Notes](#security-and-notes)

---

## Project Overview

This portfolio is designed as an immersive macOS-like desktop experience:

- A responsive landing environment with a dynamic desktop background
- A dock with clickable app icons for terminal, notes, GitHub/project viewer, resume, and contact
- Draggable windows with a macOS-style look and feel
- Spotlight-style search and keyboard-driven navigation
- Mission Control overview for active windows
- Contact form connected to MongoDB
- Admin dashboard for message management
- A chat API that uses Groq AI for conversation or terminal-style responses

The goal is to blend portfolio content with desktop UI metaphors while keeping the project modular and maintainable.

---

## Core Features

- **Desktop-inspired interface** with animated background, dock, and macOS system controls
- **Draggable windows** through `react-rnd`
- **Spotlight search** implemented using `Fuse.js`
- **Mission Control** overview and quick app switching
- **Interactive AI chat** backed by Groq using `groq-sdk`
- **Editable content driven by configuration files** under `src/config/`
- **Admin authentication** with environment-based username/password
- **Contact form storage** in MongoDB via Mongoose
- **Full modular component architecture** for maintainability
- **Vercel analytics and speed insights** integrated

---

## Tech Stack

- `next` 15.x (App Router)
- `react` 19.x
- `typescript` 5.x
- `tailwindcss` 4.x
- `framer-motion` for UI transitions and animations
- `react-rnd` for draggable/resizable windows
- `fuse.js` for fuzzy search in Spotlight
- `groq-sdk` for AI chat integration
- `mongoose` for MongoDB object modeling
- `@vercel/analytics` and `@vercel/speed-insights`

---

## Architecture and Data Flow

### Frontend

- `src/app/page.tsx` renders the main desktop UI via `AppLayout`
- `src/components/AppLayout.tsx` is the client-side shell that manages:
  - window state and open/close actions
  - Spotlight and keyboard shortcuts
  - Mission Control
  - dock and mobile dock behavior
  - background selection and tutorial flow
- UI components live in `src/components/global/` and include:
  - `MacToolbar`
  - `DesktopDock`
  - `MobileDock`
  - `MacTerminal`
  - `Spotlight`
  - `MissionControl`
  - `NotesApp`
  - `GitHubViewer`
  - `ResumeViewer`
  - `ContactWidget`
  - `WelcomeTour`
  - `ShortcutsOverlay`

### Data and Configuration

- Content is stored in plain configuration files under `src/config/`
- `src/config/site.ts` holds SEO metadata and theme colors
- `src/types/index.ts` defines shared TypeScript interfaces used across UI and config

### Backend / API

The project uses Next.js server routes under `src/app/api/`.

#### Contact API

- `src/app/api/contact/route.js`
- Validates request payloads and required fields
- Uses a hidden `company` honeypot field to block spam
- Applies a minimum `t` timing check to prevent rapid submissions
- Stores valid messages to MongoDB via `src/models/Contact.js`
- Returns helpful errors for configuration or validation problems

#### Admin Login API

- `src/app/api/admin/login/route.js`
- Compares posted credentials with `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- Generates a signed admin token with HMAC-SHA256 using `src/lib/adminAuth.js`
- Returns a short-lived token for use in the admin dashboard

#### Admin Messages API

- `src/app/api/admin/messages/route.js`
- Requires a valid bearer token
- Connects to MongoDB and reads `Contact` documents
- Supports paging parameters via `limit` and `offset`
- Returns recent contact submissions with normalized timestamps

#### Chat / AI API

- `src/app/api/chat/route.ts`
- Proxies frontend chat requests to Groq AI using `groq-sdk`
- Works with `llama-3.3-70b-versatile`
- Validates request body and handles AI service errors and timeouts gracefully

### Database Connection

- `src/lib/mongodb.js` handles a reusable Mongoose connection cache
- `src/models/Contact.js` defines the MongoDB schema:
  - `name`: string
  - `email`: string
  - `message`: string
  - `createdAt`: date

---

## Key Project Modules

### `src/components/AppLayout.tsx`

This is the main client-side experience layer. It is responsible for:

- rendering the desktop and background
- opening/closing windows
- handling keyboard shortcuts
- toggling Spotlight and Mission Control
- managing tutorial/display state
- wiring dock interactions to app windows

### `src/components/admin/AdminDashboard.tsx`

This component implements the admin experience:

- login form for admin credentials
- session storage of the admin bearer token
- authenticated fetch of contact messages
- message list rendering with timestamps
- logout handling

### `src/lib/adminAuth.js`

This library supports simple token-based admin auth:

- `createAdminToken(username)` creates a signed token
- `verifyAdminToken(token)` validates token integrity and TTL

### `util/seed-admin.js`

A reference seed script that documents admin credential configuration. It does not write a database record; it prints the effective admin username/password from environment variables.

---

## Environment Variables

Create a `.env` file in the project root with these values:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
GROQ_API_KEY=your_groq_api_key_here
PUBLIC_SITE_URL=https://your-domain.tld
```

### Required for core functionality

- `MONGODB_URI` — MongoDB Atlas connection string
- `ADMIN_USERNAME` — admin dashboard username
- `ADMIN_PASSWORD` — admin dashboard password

### Optional but recommended

- `GROQ_API_KEY` — enables the AI chat terminal
- `PUBLIC_SITE_URL` — used for canonical metadata and Open Graph links

---

## Setup and Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

### Build for production

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

---

## Production Build and Deployment

This project is ready for deployment to Vercel or any platform that supports Next.js.

Set the environment variables in your hosting dashboard, then deploy using Vercel or your preferred system.

If using Vercel:

```bash
npx vercel deploy --prod
```

---

## Security and Notes

- Use strong passwords for `ADMIN_PASSWORD`
- Keep `.env` out of version control
- If `GROQ_API_KEY` is missing, chat features will not work and the API will return a configuration error
- The admin token is short-lived and signed with the current `ADMIN_PASSWORD`
- Contact validation includes spam protections and email format validation

---

## Project Structure

```text
src/
  app/
    api/
      admin/
        login/route.js
        messages/route.js
      chat/route.ts
      contact/route.js
    admin/
      page.tsx
    layout.tsx
    page.tsx
  components/
    AppLayout.tsx
    admin/AdminDashboard.tsx
    global/
      ContactWidget.tsx
      DesktopDock.tsx
      GitHubViewer.tsx
      MacTerminal.tsx
      MacToolbar.tsx
      MissionControl.tsx
      MobileDock.tsx
      NotesApp.tsx
      ResumeViewer.tsx
      ShortcutsOverlay.tsx
      Spotlight.tsx
      WelcomeTour.tsx
  config/
    apps.ts
    competitions.ts
    contact.ts
    education.ts
    experience.ts
    extracurricular.ts
    index.ts
    personal.ts
    projects.ts
    site.ts
    skills.ts
    social.ts
    projects/*.json
  lib/
    adminAuth.js
    mongodb.js
  models/
    Contact.js
  styles/
    global.css
  types/
    index.ts
  assets/
    images/
util/
  seed-admin.js

public/
```

---

## Notes

This repository is a migration of a macOS-themed portfolio into Next.js App Router. It keeps the original desktop metaphor while modernizing the backend and data handling with MongoDB and Next.js server routes.
