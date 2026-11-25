// Single source of truth for all portfolio content.
// Edit this file to add projects, skills or contact channels.

const GH = 'https://github.com/MuradIsmayilzadeh'
const PAGES = 'https://muradismayilzadeh.github.io'

export const profile = {
  name: 'Murad Ismayilzada',
  short: 'M.I.',
  location: 'Baku, Azerbaijan',
  github: GH,
  roles: [
    'Game Developer',
    'Engine Programmer',
    'Full-Stack Engineer',
    'Low-Level Coder',
  ],
  tagline:
    'I build games, engines and the platforms around them — from C++ render loops to production web systems used by real students every day.',
  status: 'Open to collaborations & internships',
  work: {
    org: 'Sənaye və Texnologiya Kolleci',
    short: 'STK',
    since: '15 August 2026',
  },
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'games', label: 'Games' },
  { id: 'engine', label: 'Engines & Systems' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
]

// links: the first one is the card's primary action.
// kind: 'live' (running demo), 'code' (repository) or 'video'.
export const projects = [
  {
    id: 'caucasus-nights',
    title: 'Caucasus Nights',
    category: 'games',
    year: 'In development',
    status: 'active',
    featured: true,
    links: [
      { kind: 'live', label: 'Game site', href: `${PAGES}/Caucasus/` },
      { kind: 'video', label: 'YouTube', href: 'https://www.youtube.com/@caucasusenterprises' },
      { kind: 'code', label: 'Code', href: `${GH}/Caucasus` },
    ],
    summary: 'Open-world driving game set in Baku, built in Unreal Engine 5.',
    description:
      'A large-scale open-world car game with dynamic weather, advanced vehicle physics and massive environments. Nanite handles dense geometry while Lumen delivers cinematic global illumination across urban and natural landscapes.',
    tech: ['UE5', 'C++', 'Blueprints', 'Nanite', 'Lumen', 'Chaos Physics'],
  },
  {
    id: 'imengine',
    title: 'ImEngine',
    category: 'engine',
    year: '2025',
    status: 'active',
    featured: true,
    links: [
      { kind: 'code', label: 'Engine', href: `${GH}/ImEngine` },
      { kind: 'code', label: 'Plugin API', href: `${GH}/ImEngine-Backend` },
    ],
    summary: 'A custom C++ game engine with an ImGui editor and plugin system.',
    description:
      'Built from the ground up to understand engine internals: ECS, scene system, render layers, shader registry, scripting, save system and a built-in profiler, all driven from an ImGui editor. A small Express service powers its plugin registry.',
    tech: ['C++', 'Raylib', 'ImGui', 'ECS', 'Express'],
  },
  {
    id: 'battlez',
    title: 'Battlez.IO',
    category: 'games',
    year: '2025',
    status: 'done',
    featured: false,
    links: [{ kind: 'code', label: 'Code', href: `${GH}/Battlez.io` }],
    summary: 'An .io-style arena game written with no engine at all.',
    description:
      'A learning-focused prototype inspired by Lordz.io, built entirely without a traditional engine to strengthen low-level skills: entity systems, real-time input handling and rendering logic in pure C++ and Raylib.',
    tech: ['C++', 'Raylib', 'No Engine', 'Entity System'],
  },
  {
    id: 'stk-library',
    title: 'STK Library',
    category: 'platforms',
    year: '2026',
    status: 'live',
    featured: true,
    links: [{ kind: 'live', label: 'Live site', href: 'https://library.stk.edu.az' }],
    summary: 'Digital library for STK — catalogue, PDFs and role-based admin.',
    description:
      'A full-stack digital library: Next.js 16 frontend, Express API and SQLite with automatic migrations. JWT auth with User / Admin / HeadAdmin roles, a PDF catalogue with import tooling, and a Docker Compose setup for one-command deployment.',
    tech: ['Next.js 16', 'React 19', 'Express', 'SQLite', 'JWT', 'Docker'],
  },
  {
    id: 'cms-v2',
    title: 'CMS v2',
    category: 'platforms',
    year: 'Full-stack',
    status: 'done',
    featured: false,
    links: [{ kind: 'code', label: 'Code', href: `${GH}/CMS-v2` }],
    summary: 'Programming contest system with timed C++ submissions.',
    description:
      'Participants log in to a contest, read the problems and upload C++ solutions before the timer runs out. Admins create contests, add problems and participants, and review submissions. Express + JWT backend with MongoDB or a local JSON store.',
    tech: ['Next.js 13', 'Express', 'JWT', 'MongoDB'],
  },
  {
    id: 'mystk',
    title: 'mySTK',
    category: 'mobile',
    year: '2026',
    status: 'active',
    featured: false,
    links: [],
    summary: 'Student-first college portal for web, iOS and Android.',
    description:
      'Students see their group, schedule, assignments, grades, attendance and transcript; teachers get attendance and gradebook workflows; admins manage faculties, classes and audit logs. Built on STK Login as the single identity provider, with roles enforced server-side.',
    tech: ['Expo Router', 'React Native', 'Express', 'Prisma', 'SSO'],
  },
  {
    id: 'techhub',
    title: 'TechHub',
    category: 'web',
    year: 'Next.js',
    status: 'live',
    featured: false,
    links: [
      { kind: 'live', label: 'Live demo', href: `${PAGES}/TechHub/` },
      { kind: 'code', label: 'Code', href: `${GH}/TechHub` },
    ],
    summary: 'Online electronics store with catalogue, search and checkout.',
    description:
      'An Azerbaijani-language electronics store with category filters, live search, product pages and an order flow. Products come from MongoDB, with a built-in catalogue fallback that also powers the static demo.',
    tech: ['Next.js 14', 'Tailwind CSS', 'MongoDB', 'Mongoose'],
  },
  {
    id: 'advantage',
    title: 'AdVantage',
    category: 'web',
    year: 'Next.js',
    status: 'live',
    featured: false,
    links: [
      { kind: 'live', label: 'Live demo', href: `${PAGES}/AdVantage/` },
      { kind: 'code', label: 'Code', href: `${GH}/AdVantage` },
    ],
    summary: 'Social media marketing agency site with pricing packages.',
    description:
      'Landing page, package pricing and detail pages, and a custom-plan request form for an Instagram marketing agency. Packages are served from MongoDB through an API route, with sample data for the static demo.',
    tech: ['Next.js 14', 'MongoDB', 'CSS Modules'],
  },
  {
    id: 'grandala',
    title: 'Grandala Travel',
    category: 'web',
    year: 'React',
    status: 'live',
    featured: false,
    links: [
      { kind: 'live', label: 'Live demo', href: `${PAGES}/Grandala-Travel/` },
      { kind: 'code', label: 'Code', href: `${GH}/Grandala-Travel` },
    ],
    summary: 'Travel agency website with service pages and request form.',
    description:
      'A React travel agency site with a page per service, routing via React Router and a request form that emails the agency through a small Python client service.',
    tech: ['React', 'React Router', 'Python API'],
  },
  {
    id: 'testyukle',
    title: 'TestYukle',
    category: 'web',
    year: 'Full-stack',
    status: 'done',
    featured: false,
    links: [],
    summary: 'School test platform for creating and taking exams.',
    description:
      'A school testing platform where tests are uploaded and taken online, with a React + Redux frontend and an Express backend.',
    tech: ['React', 'Redux', 'Express'],
  },
  {
    id: 'rentahouse',
    title: 'RentAHouse',
    category: 'web',
    year: 'Team project',
    status: 'done',
    featured: false,
    links: [{ kind: 'code', label: 'Code', href: 'https://github.com/SatAl-az/Kirayeev' }],
    summary: 'Rental platform for listing, searching and managing homes.',
    description:
      'Users list properties, search for homes and manage rentals through a structured backend. Built with PHP and SQL with a focus on authentication, data integrity and clean user workflows.',
    tech: ['PHP', 'SQL', 'HTML', 'CSS'],
  },
  {
    id: 'skill-swap',
    title: 'Skill Swap',
    category: 'web',
    year: 'Paused',
    status: 'paused',
    featured: false,
    links: [{ kind: 'code', label: 'Code', href: 'https://github.com/SkillSwapCommunity/Project' }],
    summary: 'Community platform for exchanging skills and forming study groups.',
    description:
      'A community-driven platform to help users exchange skills, build learning groups and grow collaborative communities. Focused on social interaction and scalability; development is currently paused.',
    tech: ['React', 'Next.js', 'Express.js'],
  },
  {
    id: 'php-sites',
    title: 'PHP Sites',
    category: 'web',
    year: 'Collection',
    status: 'done',
    featured: false,
    links: [{ kind: 'code', label: 'Code', href: `${GH}/Sites` }],
    summary: 'Framework-free PHP websites, including a game store.',
    description:
      'Small business pages through to structured systems with authentication, databases and admin panels, such as an online game shop. Emphasises backend logic, database design and core web fundamentals without heavy frameworks.',
    tech: ['PHP', 'Composer', 'MySQL', 'HTML', 'CSS'],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    category: 'mobile',
    year: 'Collection',
    status: 'done',
    featured: false,
    links: [{ kind: 'code', label: 'Code', href: `${GH}/Mobile-Applications` }],
    summary: 'React Native apps: chat, news, auth, booking and more.',
    description:
      'A collection of Expo / React Native apps including a chat app, a news reader with a Python backend, an authentication app and salon booking apps, designed with modular architecture and API-driven communication.',
    tech: ['React Native', 'Expo', 'JavaScript', 'Python'],
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    category: 'web',
    year: '2026',
    status: 'live',
    featured: false,
    links: [
      { kind: 'live', label: 'Live', href: `${PAGES}/Portfolio/` },
      { kind: 'code', label: 'Code', href: `${GH}/Portfolio` },
    ],
    summary: 'Statically exported Next.js site, deployed to GitHub Pages.',
    description:
      'Minimal, data-driven and dependency-light: one content file, CSS-only effects, reduced-motion support and a CI pipeline that exports and deploys on every push.',
    tech: ['Next.js 14', 'React', 'CSS', 'GitHub Actions'],
  },
]

export const skills = [
  {
    group: 'Game Dev',
    items: ['Unreal Engine 5', 'Unity', 'Blueprints', 'Gameplay Systems', 'Vehicle Physics', 'Level Design'],
  },
  {
    group: 'Systems',
    items: ['C++', 'Raylib', 'ImGui', 'Custom Engines', 'ECS', 'Performance Profiling'],
  },
  {
    group: 'Web & Backend',
    items: ['React', 'Next.js', 'Node / Express', 'Prisma', 'MongoDB', 'SQLite / SQL', 'PHP'],
  },
  {
    group: 'Apps & Ops',
    items: ['React Native', 'Expo', 'Electron', 'Docker', 'JWT / SSO', 'GitHub Actions'],
  },
]

export const timeline = [
  {
    when: 'Now',
    title: 'Caucasus Nights & ImEngine',
    text: 'Building an open-world UE5 driving game and my own C++ engine side by side.',
  },
  {
    when: 'Aug 2026',
    title: 'Sənaye və Texnologiya Kolleci',
    text: 'Joined the college on 15 August 2026 — the home of STK Library and the mySTK portal.',
  },
  {
    when: '2026',
    title: 'STK platforms',
    text: 'Shipped STK Library and the mySTK student portal — real users, real roles, real deployments.',
  },
  {
    when: 'Study',
    title: 'ADA University',
    text: 'Computer science student pairing coursework with production projects.',
  },
  {
    when: 'Start',
    title: 'Curiosity',
    text: 'Took games apart to see how they worked — and never stopped going one layer deeper.',
  },
]

export const contacts = [
  {
    id: 'email',
    label: 'Email',
    value: 'muradismayilzadehh@gmail.com',
    href: 'mailto:muradismayilzadehh@gmail.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'MuradIsmayilzadeh',
    href: GH,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    value: '@caucasusenterprises',
    href: 'https://www.youtube.com/@caucasusenterprises',
  },
  {
    id: 'codecademy',
    label: 'Codecademy',
    value: 'Murad Ismayilzadeh',
    href: 'https://www.codecademy.com/profiles/dev9934992760',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+994 51 455 05 45',
    href: 'tel:+994514550545',
  },
  {
    id: 'vk',
    label: 'VK',
    value: 'mismayilzade',
    href: 'https://vk.com/mismayilzade',
  },
]
