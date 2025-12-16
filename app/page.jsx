import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My Portfolio</h1>
      <p className={styles.description}>
        This is the home page of your Next.js portfolio application.
      </p>
    </div>
  )
}

