import styles from './page.module.css'

export default function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact</h1>
      <div className={styles.content}>
        <p>This is the contact page. You can add a contact form here.</p>
      </div>
    </div>
  )
}

