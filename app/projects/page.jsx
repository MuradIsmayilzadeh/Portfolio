import Reveal from '../../components/Reveal'
import ProjectExplorer from '../../components/ProjectExplorer'
import { categories, projects } from '../../data/site'

export const metadata = {
  title: 'Work',
  description: 'Games, engines, platforms and apps by Murad Ismayilzada.',
}

export default function Projects() {
  return (
    <section className="wrap section section--top">
      <Reveal className="page-head">
        <span className="eyebrow">// 01 — Work</span>
        <h1 className="h1">Projects</h1>
        <p className="lead">
          Games, a custom engine, production platforms and apps. Each one taught me
          something about performance, architecture or shipping to real users.
        </p>
      </Reveal>

      <ProjectExplorer projects={projects} categories={categories} />

      <p className="note mono">
        Some projects are private, experimental or still in development and aren&apos;t listed here.
      </p>
    </section>
  )
}
