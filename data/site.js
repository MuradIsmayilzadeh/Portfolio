// Single source of truth for all portfolio content.
// Edit this file to add projects, skills or contact channels.

export const profile = {
  name: 'Murad Ismayilzada',
  short: 'M.I.',
  location: 'Baku, Azerbaijan',
  roles: [
    'Game Developer',
    'Engine Programmer',
    'Full-Stack Engineer',
    'Low-Level Coder',
  ],
  tagline:
    'I build games, engines and the platforms around them — from C++ render loops to production web systems used by real students every day.',
  status: 'Open to collaborations & internships',
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'games', label: 'Games' },
  { id: 'engine', label: 'Engines & Systems' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
]

export const projects = [
  {
    id: 'caucasus-nights',
    title: 'Caucasus Nights',
    category: 'games',
    year: 'In development',
    status: 'active',
    featured: true,
    link: 'https://www.youtube.com/@caucasusenterprises',
    linkLabel: 'YouTube',
    summary: 'Open-world driving game built for realism in Unreal Engine 5.',
    description:
      'A large-scale open-world car game with dynamic weather, advanced vehicle physics and massive environments. Nanite handles dense geometry while Lumen delivers cinematic global illumination across urban and natural landscapes.',
    tech: ['UE5', 'C++', 'Blueprints', 'Nanite', 'Lumen', 'Chaos Physics'],
  },
  {
    id: 'caucasus-ecosystem',
    title: 'Caucasus Platform',
    category: 'platforms',
    year: 'Ongoing',
    status: 'active',
    featured: false,
    summary: 'The launcher, website and backend behind Caucasus Enterprises.',
    description:
      'Everything around the game: a React 19 studio website, an admin panel for content, an Express + MongoDB API serving files and data, and an Electron desktop launcher that handles builds and caching for players.',
    tech: ['Electron', 'React 19', 'Express', 'MongoDB', 'Admin Panel'],
  },
  {
    id: 'imengine',
    title: 'ImEngine',
    category: 'engine',
    year: 'Ongoing',
    status: 'active',
    featured: true,
    summary: 'A custom C++ game engine with an ImGui editor and plugin system.',
    description:
      'Built from the ground up to understand engine internals: custom rendering pipeline, scene system, component-based architecture, asset management and ImGui editor tooling. A small Express service powers its plugin registry (profiler, material editor, extensions).',
    tech: ['C++', 'Raylib', 'ImGui', 'ECS', 'Express'],
  },
  {
    id: 'battlez',
    title: 'Battlez.IO',
    category: 'games',
    year: 'Prototype',
    status: 'done',
    featured: false,
    link: 'https://github.com/MuradIsmayilzadeh/Battlez.io',
    linkLabel: 'GitHub',
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
    link: 'https://github.com/MuradIsmayilzadeh/STKLibrary',
    linkLabel: 'GitHub',
    summary: 'Digital library for STK — catalogue, PDFs and role-based admin.',
    description:
      'A full-stack digital library: Next.js 16 frontend, Express API and SQLite with automatic migrations. JWT auth with User / Admin / HeadAdmin roles, a PDF catalogue with import tooling, and a Docker Compose setup for one-command deployment.',
    tech: ['Next.js 16', 'React 19', 'Express', 'SQLite', 'JWT', 'Docker'],
  },
  {
    id: 'mystk',
    title: 'mySTK',
    category: 'mobile',
    year: '2026',
    status: 'active',
    featured: false,
    summary: 'Student-first college portal for web, iOS and Android.',
    description:
      'Students see their group, schedule, assignments, grades, attendance and transcript; teachers get attendance and gradebook workflows; admins manage faculties, classes and audit logs. Built on STK Login as the single identity provider, with roles enforced server-side.',
    tech: ['Expo Router', 'React Native', 'Express', 'Prisma', 'SSO'],
  },
  {
    id: 'rentahouse',
    title: 'RentAHouse',
    category: 'web',
    year: 'Team project',
    status: 'done',
    featured: false,
    link: 'https://github.com/SatAl-az/Kirayeev',
    linkLabel: 'GitHub',
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
    link: 'https://github.com/SkillSwapCommunity/Project',
    linkLabel: 'GitHub',
    summary: 'Community platform for exchanging skills and forming study groups.',
    description:
      'A community-driven platform to help users exchange skills, build learning groups and grow collaborative communities. Focused on social interaction and scalability; development is currently paused.',
    tech: ['React', 'Next.js', 'Express.js'],
  },
  {
    id: 'react-apps',
    title: 'React / Next.js Apps',
    category: 'web',
    year: 'Collection',
    status: 'done',
    featured: false,
    link: 'https://github.com/MuradIsmayilzadeh/React-Apps',
    linkLabel: 'GitHub',
    summary: 'CMS, travel and client sites built with React and Next.js.',
    description:
      'A set of modern applications including a Next.js CMS, a travel agency site and several client projects. Responsive UI, API integration, server rendering and scalable frontend architecture.',
    tech: ['React', 'Next.js', 'Express.js'],
  },
  {
    id: 'php-sites',
    title: 'PHP Sites',
    category: 'web',
    year: 'Collection',
    status: 'done',
    featured: false,
    link: 'https://github.com/MuradIsmayilzadeh/Sites',
    linkLabel: 'GitHub',
    summary: 'Framework-free full-stack PHP websites with admin panels.',
    description:
      'Small business pages through to structured systems with authentication, databases and admin panels. Emphasises backend logic, database design and core web fundamentals without heavy frameworks.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS'],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    category: 'mobile',
    year: 'Collection',
    status: 'done',
    featured: false,
    link: 'https://github.com/MuradIsmayilzadeh/Mobile-Applications',
    linkLabel: 'GitHub',
    summary: 'Open-source React Native utilities and experiments.',
    description:
      'Utilities, experimental ideas and real-world solutions, designed with modular architecture and API-driven communication.',
    tech: ['React Native', 'JavaScript', 'Custom API'],
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    category: 'web',
    year: '2026',
    status: 'live',
    featured: false,
    link: 'https://github.com/MuradIsmayilzadeh/Portfolio-Project',
    linkLabel: 'GitHub',
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
    href: 'https://github.com/MuradIsmayilzadeh',
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
