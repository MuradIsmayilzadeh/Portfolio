import Reveal from '../../components/Reveal'
import img from '../../components/images/me.jpeg'
import { profile, skills, timeline } from '../../data/site'

export const metadata = {
  title: 'About',
  description: 'Who I am, how I work and the tools I use.',
}

export default function About() {
  return (
    <section className="wrap section section--top">
      <Reveal className="page-head">
        <span className="eyebrow">// 02 — About</span>
        <h1 className="h1">About me</h1>
      </Reveal>

      <div className="about">
        <Reveal className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} width={img.width} height={img.height} alt={`Portrait of ${profile.name}`} />
          <div className="portrait__label mono">
            <span>{profile.name.toUpperCase()}</span>
            <span>{profile.location}</span>
          </div>
        </Reveal>

        <Reveal className="about__text" delay={100}>
          <p className="lead">
            I&apos;m an ADA University student and a multi-disciplinary developer.
            Games are my focus — but I&apos;ve learned the most by building at every layer
            of the stack.
          </p>
          <p>
            My journey started with curiosity about how games work under the hood. That
            led me into Unreal Engine and Unity, and then further down: writing my own
            engine in C++ with Raylib and ImGui, and an .io-style arena game with no engine
            at all.
          </p>
          <p>
            In parallel I build production software. I shipped STK Library — a Next.js,
            Express and SQLite system with role-based access and Docker deployment — and
            the mySTK student portal for web, iOS and Android. For my own studio, Caucasus
            Enterprises, I built the website, admin panel, API and Electron launcher that
            sit around the game.
          </p>
          <p>
            Across all of it I care about the same things: clean architecture, performance
            and products that feel polished to use.
          </p>
        </Reveal>
      </div>

      <div className="section">
        <Reveal className="section__head">
          <span className="eyebrow">// Stack</span>
          <h2 className="h2">Tools I reach for</h2>
        </Reveal>
        <div className="skills">
          {skills.map((s, i) => (
            <Reveal key={s.group} className="skillset" delay={i * 70}>
              <h3 className="skillset__title mono">{s.group}</h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="section">
        <Reveal className="section__head">
          <span className="eyebrow">// Log</span>
          <h2 className="h2">Timeline</h2>
        </Reveal>
        <ol className="timeline">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.title} className="timeline__item" delay={i * 70}>
              <span className="timeline__when mono">{t.when}</span>
              <div>
                <h3 className="timeline__title">{t.title}</h3>
                <p className="muted">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
