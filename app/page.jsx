import Link from 'next/link'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import RoleCycler from '../components/RoleCycler'
import ProjectCard from '../components/ProjectCard'
import { profile, projects, skills } from '../data/site'

const capabilities = [
  {
    n: '01',
    title: 'Games',
    text: 'Open-world UE5 production, vehicle physics, gameplay systems and engine-free prototypes.',
  },
  {
    n: '02',
    title: 'Engines',
    text: 'Custom C++ rendering, scene graphs, ECS and ImGui tooling — understanding every layer.',
  },
  {
    n: '03',
    title: 'Platforms',
    text: 'Full-stack web, mobile and desktop apps with auth, roles and Docker deployments.',
  },
]

export default function Home() {
  const featured = projects.filter((p) => p.featured)
  const techCount = new Set(skills.flatMap((s) => s.items)).size

  const stats = [
    { value: projects.length, label: 'Projects' },
    { value: '4', label: 'Domains' },
    { value: `${techCount}+`, label: 'Technologies' },
    { value: projects.filter((p) => p.links?.some((l) => l.kind === 'live')).length, label: 'Live demos' },
  ]

  return (
    <>
      <section className="hero wrap">
        <div className="hero__meta mono">
          <span className="pulse" aria-hidden="true" />
          {profile.status}
        </div>

        <h1 className="hero__title">
          <span className="hero__line">Murad</span>
          <span className="hero__line hero__line--outline">Ismayilzada</span>
        </h1>

        <p className="hero__role mono">
          <span className="accent">~/</span> <RoleCycler roles={profile.roles} />
        </p>

        <p className="hero__lead">{profile.tagline}</p>

        <div className="hero__actions">
          <Link href="/projects" className="btn btn--primary">
            View work <FiArrowRight aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn btn--ghost">
            Get in touch
          </Link>
        </div>

        <div className="hero__hud mono" aria-hidden="true">
          <span>LAT 40.37 / LON 49.83</span>
          <span>UE5 · C++ · NEXT.JS</span>
          <span>SCROLL ↓</span>
        </div>
      </section>

      <section className="wrap section">
        <Reveal className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat__value">{s.value}</span>
              <span className="stat__label mono">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="wrap section">
        <Reveal className="section__head">
          <span className="eyebrow">// Selected work</span>
          <h2 className="h2">Things I&apos;m proud of</h2>
        </Reveal>
        <div className="grid grid--cards">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProjectCard project={p} index={projects.indexOf(p)} compact />
            </Reveal>
          ))}
        </div>
        <Reveal className="section__more">
          <Link href="/projects" className="link-arrow">
            All {projects.length} projects <FiArrowUpRight aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <section className="wrap section">
        <Reveal className="section__head">
          <span className="eyebrow">// What I do</span>
          <h2 className="h2">From the render loop to production</h2>
        </Reveal>
        <div className="caps">
          {capabilities.map((c, i) => (
            <Reveal key={c.n} className="cap" delay={i * 90}>
              <span className="cap__n mono">{c.n}</span>
              <h3 className="cap__title">{c.title}</h3>
              <p className="muted">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <Reveal className="cta-band">
          <div>
            <span className="eyebrow">// Next</span>
            <h2 className="h2">Have something worth building?</h2>
          </div>
          <Link href="/contact" className="btn btn--primary">
            Start a conversation <FiArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
