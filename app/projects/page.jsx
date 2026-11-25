import Reveal from '../../components/Reveal'
import Decode from '../../components/Decode'
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
    <section className="wrap section--top section--bottom" data-shape="cube" data-shape-x="0.3" data-shape-y="-0.12" data-shape-scale="0.7" data-shape-o="0.5" data-shape-my="-0.25" data-shape-ms="0.6">
      <Reveal className="page-head" variant="none">
        <Decode className="eyebrow" text="// 01 — Work" />
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
