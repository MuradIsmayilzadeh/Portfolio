# Portfolio Project

A Next.js portfolio application with navbar and routing.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Next.js 14 with App Router
- Server-Side Rendering (SSR) for optimal SEO and performance
- Responsive navbar with active link highlighting
- File-based routing
- Modern, dark-themed UI
- Pure JavaScript (no TypeScript)

## Pages

- `/` - Home page
- `/about` - About page
- `/projects` - Projects page
- `/contact` - Contact page

## Project Structure

```
├── app/
│   ├── layout.jsx       # Root layout with navbar (SSR)
│   ├── page.jsx         # Home page (SSR)
│   ├── about/
│   │   └── page.jsx     # About page (SSR)
│   ├── projects/
│   │   └── page.jsx     # Projects page (SSR)
│   └── contact/
│       └── page.jsx     # Contact page (SSR)
├── components/
│   └── Navbar.jsx       # Navigation component (Client)
└── package.json
```

## SSR Benefits

All pages are Server-Side Rendered by default, which means:
- Better SEO - content is rendered on the server
- Faster initial page load - HTML is sent directly to the browser
- Better performance - reduced client-side JavaScript

