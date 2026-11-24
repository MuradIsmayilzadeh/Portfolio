import Reveal from '../../components/Reveal'
import SplitText from '../../components/SplitText'
import ScrubText from '../../components/ScrubText'
import ScrollVar from '../../components/ScrollVar'
import Marquee from '../../components/Marquee'
import img from '../../components/images/me.jpeg'
import { profile, skills, timeline } from '../../data/site'

export const metadata = {
  title: 'About',
  description: 'Who I am, how I work and the tools I use.',
}

export default function About() {
  return (
    <>
      <section className="wrap section--top">
        <Reveal className="page-head" variant="none">
          <span className="eyebrow">// 02 — About</span>
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

      <section className="section--flush about-marquee">
        <Marquee rows={[['Curious', 'Low-level', 'Performance', 'Clean architecture', 'Shipping', 'Game feel']]} />
      </section>

      <section className="wrap section">
        <Reveal className="section__head">
          <span className="eyebrow">// Stack</span>
          <h2 className="h2"><SplitText text="Tools I reach for" by="word" /></h2>
        </Reveal>
        <div className="skills">
          {skills.map((s, i) => (
            <Reveal key={s.group} className="skillset" delay={i * 80}>
              <h3 className="skillset__title mono">
                <span>{String(i + 1).padStart(2, '0')}</span> {s.group}
              </h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section section--bottom">
        <Reveal className="section__head">
          <span className="eyebrow">// Log</span>
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
