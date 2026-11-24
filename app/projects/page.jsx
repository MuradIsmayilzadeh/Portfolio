import Reveal from '../../components/Reveal'
import SplitText from '../../components/SplitText'
import ProjectExplorer from '../../components/ProjectExplorer'
import { categories, projects } from '../../data/site'

export const metadata = {
  title: 'Work',
  description: 'Games, engines, platforms and apps by Murad Ismayilzada.',
}

export default function Projects() {
  const live = projects.filter((p) => p.links?.some((l) => l.kind === 'live')).length

  return (
    <section className="wrap section--top section--bottom">
      <Reveal className="page-head" variant="none">
        <span className="eyebrow">// 01 — Work</span>
        <h1 className="h1"><SplitText text="Projects" /></h1>
        <Reveal as="p" className="lead" delay={300}>
          Games, a custom engine, production platforms and apps. {live} of them run live in
          your browser — look for the <span className="accent">demo</span> badge.
        </Reveal>
      </Reveal>

      <ProjectExplorer projects={projects} categories={categories} />

      <p className="note mono">
        Some projects are private, experimental or still in development and aren&apos;t listed here.
      </p>
    </section>
  )
}
