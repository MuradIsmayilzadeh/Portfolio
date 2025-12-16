import styles from './page.module.css'

export default function Projects() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects</h1>
      <div className={styles.content}>
        <p>This is the projects page. You can showcase your work here.</p>
      </div>
    </div>
  )
}

