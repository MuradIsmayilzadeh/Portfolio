import Link from 'next/link'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import Reveal from '../components/Reveal'
import RoleCycler from '../components/RoleCycler'
import SplitText from '../components/SplitText'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import ScrubText from '../components/ScrubText'
import CountUp from '../components/CountUp'
import Clock from '../components/Clock'
import ShapeField from '../components/ShapeField'
import SplitScroll from '../components/home/SplitScroll'
import HorizontalWork from '../components/home/HorizontalWork'
import { profile, projects, skills } from '../data/site'

const steps = [
  {
    n: '01',
    shape: 'torus',
    title: 'Games',
    text: 'Open-world production in Unreal Engine 5 — vehicle physics, dynamic weather, Lumen lighting — plus engine-free prototypes that keep my fundamentals sharp.',
    points: ['Caucasus Nights', 'Battlez.IO', 'Gameplay systems'],
  },
  {
    n: '02',
    shape: 'cube',
    title: 'Engines',
    text: 'ImEngine: my own C++ engine with ECS, render layers, a shader registry, scripting, a profiler and an ImGui editor — built to understand every layer.',
    points: ['C++ / Raylib', 'ImGui tooling', 'Plugin API'],
  },
  {
    n: '03',
    shape: 'helix',
    title: 'Platforms',
    text: 'Production systems with real users: a college digital library, a student portal on web and mobile, stores and agency sites — auth, roles and deployments included.',
    points: ['STK Library', 'mySTK', 'Next.js · Express · Docker'],
  },
]

export default function Home() {
  const rail = projects.filter((p) => p.featured || p.links?.some((l) => l.kind === 'live'))
  const allTech = skills.flatMap((s) => s.items)
  const liveCount = projects.filter((p) => p.links?.some((l) => l.kind === 'live')).length

  const stats = [
    { value: projects.length, label: 'Projects' },
    { value: liveCount, label: 'Live demos' },
    { value: `${new Set(allTech).size}+`, label: 'Technologies' },
    { value: 4, label: 'Domains' },
  ]

  return (
    <>
      <ShapeField />

      {/* HERO ------------------------------------------------------------ */}
      <section className="hero wrap" data-shape="sphere" data-shape-x="0.28" data-shape-scale="0.95">
        <Reveal className="hero__meta mono" variant="fade">
          <span className="pulse" aria-hidden="true" />
          {profile.status}
        </Reveal>

        <Reveal as="h1" className="hero__title" variant="none">
          <SplitText text="Murad" className="hero__line" />
          <SplitText text="Ismayilzada" className="hero__line hero__line--outline" delay={140} />
        </Reveal>

        <Reveal className="hero__role mono" delay={500}>
          <span className="accent">~/</span> <RoleCycler roles={profile.roles} />
        </Reveal>

        <Reveal as="p" className="hero__lead" delay={600}>
          {profile.tagline}
        </Reveal>

        <Reveal className="hero__actions" delay={700}>
          <Magnetic>
            <Link href="/projects" className="btn btn--primary">
              View work <FiArrowRight aria-hidden="true" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="btn btn--ghost">Get in touch</Link>
          </Magnetic>
        </Reveal>

        <Reveal className="hero__hud mono" variant="fade" delay={900} aria-hidden="true">
          <Clock />
          <span className="hide-sm">40.37°N 49.83°E</span>
          <span className="scroll-cue">Scroll <i /></span>
        </Reveal>
      </section>

      {/* MARQUEE --------------------------------------------------------- */}
      <section className="section--flush" data-shape="knot" data-shape-x="0.26" data-shape-o="0.35">
        <Marquee rows={[allTech.slice(0, 12), allTech.slice(12)]} />
      </section>

      {/* STATEMENT ------------------------------------------------------- */}
      <section className="wrap statement" data-shape="knot" data-shape-x="-0.27" data-shape-scale="0.85">
        <div className="statement__body">
          <span className="eyebrow">// Approach</span>
          <ScrubText
            className="statement__text"
            text="I learn by going one layer deeper. Gameplay led me to engines, engines led me to rendering and memory, and shipping real platforms taught me what it takes to make software people actually rely on."
          />
        </div>
      </section>

      {/* SPLIT SCROLL ---------------------------------------------------- */}
      <section className="wrap section__head split-head">
        <Reveal>
          <span className="eyebrow">// What I do</span>
          <h2 className="h2">
            <SplitText text="From the render loop to production" by="word" />
          </h2>
        </Reveal>
      </section>
      <SplitScroll steps={steps} tiles={[...allTech, ...allTech.slice(0, 6)]} />

      {/* STATS ----------------------------------------------------------- */}
      <section className="wrap section" data-shape="grid" data-shape-x="0" data-shape-scale="1.3" data-shape-o="0.35">
        <Reveal className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat__value"><CountUp value={s.value} /></span>
              <span className="stat__label mono">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* HORIZONTAL WORK ------------------------------------------------- */}
      <HorizontalWork projects={rail} allProjects={projects}>
        <span className="eyebrow">// Selected work</span>
        <h2 className="h2">Things I&apos;m proud of</h2>
        <p className="muted">
          {liveCount} of them run live in your browser. Keep scrolling — or{' '}
          <Link href="/projects" className="link-arrow">see all {projects.length} <FiArrowUpRight aria-hidden="true" /></Link>
        </p>
      </HorizontalWork>

      {/* CTA ------------------------------------------------------------- */}
      <section className="wrap section cta" data-shape="sphere" data-shape-x="0" data-shape-scale="1.35" data-shape-o="0.5">
        <Reveal className="cta__inner" variant="none">
          <span className="eyebrow">// Next</span>
          <h2 className="cta__title">
            <SplitText text="Let's build" />
            <SplitText text="something real." className="accent" delay={250} />
          </h2>
          <Magnetic strength={0.5}>
            <Link href="/contact" className="btn btn--primary btn--xl">
              Start a conversation <FiArrowRight aria-hidden="true" />
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </>
  )
}
