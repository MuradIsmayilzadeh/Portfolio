import styles from './page.module.css'
import ScrollAnimation from '../../components/ScrollAnimation'

export default function Contact() {
  const contacts = [
    {
      title: 'Email',
      value: 'muradismayilzadeh@gmail.com',
      href: 'mailto:muradismayilzadeh@gmail.com'
    },
    {
      title: 'Code Academy',
      value: 'Murad Ismayilzadeh',
      href: 'https://www.codecademy.com/profiles/dev9934992760'
    },
    {
      title: 'GitHub',
      value: 'github.com/MuradIsmayilzadeh',
      href: 'https://github.com/MuradIsmayilzadeh/'
    }
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title} data-hover>Get In Touch</h1>
      
      <ScrollAnimation>
        <p className={styles.intro}>
          Have a project in mind or just want to chat? I'm always open to
          discussing new opportunities and ideas.
        </p>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className={styles.contactGrid}>
          {contacts.map((contact, index) => (
            <div key={index} className={styles.contactCard} data-hover>
              <h3 className={styles.cardTitle}>{contact.title}</h3>
              <a href={contact.href} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
                {contact.value}
              </a>
            </div>
          ))}
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className={styles.message}>
          <p className={styles.messageText}>
            I typically respond within 24 hours. Whether you have a question,
            a project proposal, or just want to say hi, I'd love to hear from you.
            Let's create something amazing together.
          </p>
        </div>
      </ScrollAnimation>
    </div>
  )
}
