import styles from './page.module.css'

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Me</h1>
      <div className={styles.content}>
        <p>
          This is the about page. You can add information about yourself here.
        </p>
      </div>
    </div>
  )
}

