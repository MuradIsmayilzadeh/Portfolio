import styles from './page.module.css'
import ScrollAnimation from '../../components/ScrollAnimation'
import Link from 'next/link'

export default function Projects() {

  const gameProjects = [
    {
      title: 'Caucasus Nights',
      link: 'https://www.youtube.com/@caucasusenterprises',
      description:
        'A large-scale open-world car game focused on realism. Features dynamic weather, advanced vehicle physics, and massive environments. Lumen is used to deliver cinematic global illumination and realistic lighting across urban and natural landscapes.',
      tech: ['UE5', 'C++', 'Blueprints', 'Nanite', 'Lumen', 'Physics']
    },
    {
      title: 'Battlez.IO',
      link: 'https://github.com/MuradIsmayilzadeh/Battlez.io',
      description:
        'A learning-focused prototype inspired by Lordz.io, developed entirely without a traditional game engine. Built to strengthen low-level game development skills such as entity systems, real-time input handling, and rendering logic using pure C++ and Raylib.',
      tech: ['No Game Engine', 'C++', 'Raylib', 'Custom']
    }
  ]

  const websiteProjects = [
    {
      title: 'PHP Sites',
      link: 'https://github.com/MuradIsmayilzadeh/Sites',
      description:
        'A collection of full-stack PHP-based websites ranging from small business pages to structured systems with authentication, databases, and admin panels. Emphasizes backend logic, database design, and core web fundamentals without heavy frameworks.',
      tech: ['PHP', 'HTML', 'CSS', 'No API']
    },
    {
      title: 'React / Next.js Apps',
      link: 'https://github.com/MuradIsmayilzadeh/React-Apps',
      description:
        'A set of modern full-stack applications built with React and Next.js. Includes responsive UI design, API integration, server-side rendering, and scalable frontend architecture suitable for real-world production use.',
      tech: ['React', 'Next.js', 'Express.js', 'Full-Stack']
    },
    {
      title: 'RentAHouse',
      link: 'https://github.com/SatAl-az/Kirayeev',
      description:
        'A complete rental platform allowing users to list properties, search for homes, and manage rentals through a structured backend. Built with PHP and SQL, focusing on authentication, data integrity, and user-friendly workflows.',
      tech: ['PHP', 'HTML', 'SQL']
    },
    {
      title: 'Skill Swap App',
      link: 'https://github.com/SkillSwapCommunity/Project',
      description:
        'A community-driven platform designed to help users exchange skills, build learning groups, and grow collaborative communities. The project focused on social interaction and scalability, but was paused during development.',
      tech: ['React', 'Next.js', 'Express.js', 'Full-Stack']
    },
    {
      title: 'Portfolio Website',
      link: 'https://github.com/MuradIsmayilzadeh/Portfolio',
      description:
        'A modern, performance-optimized personal portfolio showcasing projects, skills, and experience. Features smooth animations, interactive UI elements, and a clean visual identity built with SEO and responsiveness in mind.',
      tech: ['Next.js', 'React', 'CSS3', 'Framer Motion']
    }
  ]

  const lowLevelProjects = [
    {
      title: 'Custom Game Engine – ImEngine',
      link: '/projects/engine',
      description:
        'A custom-built game engine developed from the ground up in C++. Includes a custom rendering pipeline, scene system, component-based architecture, asset management, and editor tools using ImGui. Built to deeply understand engine internals and performance-critical systems.',
      tech: ['C++', 'Raylib', 'ImGUI', 'Graphics']
    },
  ]

  const appProjects = [
    {
      title: 'Mobile Applications Collection',
      link: 'https://github.com/MuradIsmayilzadeh/Mobile-Applications',
      description:
        'A collection of open-source mobile applications built for different purposes, including utilities, experimental ideas, and real-world solutions. Designed with modular architecture and API-driven communication.',
      tech: ['React Native', 'Custom API', 'JavaScript']
    }
  ]

  const ProjectCard = ({ project }) => (
    <Link
      href={project.link || '#'}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className={styles.project} data-hover>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.description}</p>
        <div className={styles.techStack}>
          {project.tech.map((tech, i) => (
            <span key={i} className={styles.tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title} data-hover>
        Projects
      </h1>

      <ScrollAnimation>
        <p className={styles.intro}>
          A curated showcase of my work across multiple technical domains.
          This includes large-scale game development, modern web platforms,
          low-level system programming, and cross-platform mobile applications.
          Each project reflects a strong focus on performance, architecture,
          and real-world problem solving.
        </p>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Game Projects</h2>
          <div className={styles.projectGrid}>
            {gameProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
            <p className={styles.note}>
              Some projects are experimental, private, or still in development and are not listed here.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Website Projects</h2>
          <div className={styles.projectGrid}>
            {websiteProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Low-Level Projects</h2>
          <div className={styles.projectGrid}>
            {lowLevelProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>App Projects</h2>
          <div className={styles.projectGrid}>
            {appProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>
      </ScrollAnimation>
    </div>
  )
}
