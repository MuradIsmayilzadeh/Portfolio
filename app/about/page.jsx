import Reveal from '../../components/Reveal'
import Decode from '../../components/Decode'
import SplitText from '../../components/SplitText'
import ScrubText from '../../components/ScrubText'
import ScrollVar from '../../components/ScrollVar'
import Marquee from '../../components/Marquee'
import Tilt from '../../components/Tilt'
import img from '../../components/images/me.jpeg'
import { profile, skills, timeline } from '../../data/site'

export const metadata = {
  title: 'About',
  description: 'Who I am, how I work and the tools I use.',
}

export default function About() {
  return (
    <>
      <section className="wrap section--top" data-shape="helix" data-shape-x="-0.34" data-shape-scale="0.9" data-shape-o="0.35">
        <Reveal className="page-head" variant="none">
          <Decode className="eyebrow" text="// 02 — About" />
          <h1 className="h1"><SplitText text="About me" /></h1>
        </Reveal>

        <div className="about">
          <ScrollVar className="portrait">
            <Reveal className="portrait__frame" variant="clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} width={img.width} height={img.height} alt={`Portrait of ${profile.name}`} />
              <span className="portrait__scan" aria-hidden="true" />
              <span className="portrait__corner portrait__corner--tl" aria-hidden="true" />
              <span className="portrait__corner portrait__corner--br" aria-hidden="true" />
            </Reveal>
            <div className="portrait__label mono">
              <span>{profile.name.toUpperCase()}</span>
              <span>{profile.location}</span>
            </div>
            <p className="portrait__work mono">
              <span className="pulse" aria-hidden="true" /> Working at {profile.work.org}
            </p>
          </ScrollVar>

          <div className="about__text">
            <ScrubText
              className="about__lead"
              text="I'm an ADA University student and a multi-disciplinary developer. Games are my focus — but I've learned the most by building at every layer of the stack."
            />
            <Reveal as="p" delay={50}>
              My journey started with curiosity about how games work under the hood. That
              led me into Unreal Engine and Unity, and then further down: writing my own
              engine in C++ with Raylib and ImGui, and an .io-style arena game with no engine
              at all.
            </Reveal>
            <Reveal as="p" delay={100}>
              Since {profile.work.since} I&apos;ve been working at {profile.work.org} ({profile.work.short}).
              In parallel I build production software. I shipped STK Library — a Next.js,
              Express and SQLite system with role-based access and Docker deployment — and
              the mySTK student portal for web, iOS and Android.
            </Reveal>
            <Reveal as="p" delay={150}>
              Across all of it I care about the same things: clean architecture, performance
              and products that feel polished to use.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--flush about-marquee" data-shape="knot" data-shape-x="0" data-shape-o="0.3">
        <Marquee rows={[['Curious', 'Low-level', 'Performance', 'Clean architecture', 'Shipping', 'Game feel']]} />
      </section>

      <section className="wrap section" data-shape="torus" data-shape-x="0" data-shape-scale="1.2" data-shape-o="0.3">
        <Reveal className="section__head">
          <Decode className="eyebrow" text="// Stack" />
          <h2 className="h2"><SplitText text="Tools I reach for" by="word" /></h2>
        </Reveal>
        <div className="skills">
          {skills.map((s, i) => (
            <Reveal key={s.group} className="skills__cell" delay={i * 80}>
              <Tilt className="tilt--box" max={8}>
              <div className="skillset">
              <h3 className="skillset__title mono">
                <span>{String(i + 1).padStart(2, '0')}</span> {s.group}
              </h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section section--bottom" data-shape="galaxy" data-shape-x="0.25" data-shape-o="0.4">
        <Reveal className="section__head">
          <Decode className="eyebrow" text="// Log" />
          <h2 className="h2"><SplitText text="Timeline" by="word" /></h2>
        </Reveal>
        <ScrollVar as="ol" className="timeline" mode="read">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.title} className="timeline__item" delay={i * 80} variant="left">
              <span className="timeline__when mono">{t.when}</span>
              <div>
                <h3 className="timeline__title">{t.title}</h3>
                <p className="muted">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </ScrollVar>
      </section>
    </>
  )
}
