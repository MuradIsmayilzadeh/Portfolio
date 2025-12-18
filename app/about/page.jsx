import styles from './page.module.css'
import ScrollAnimation from '../../components/ScrollAnimation'

export default function About() {
  const skills = [
    'Unreal Engine 5', 'Blueprints', 'C++', 'Gameplay Systems',
    'Level Design', '3D Modeling', 'Animation', 'Assets',
    'Performance Optimization', 'Multiplayer', 'Graphics', 'Game Design'
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title} data-hover>About Me</h1>
      
      <ScrollAnimation>
        <p className={styles.intro}>
          I'm a passionate Unreal Engine 5 developer with expertise in creating
          immersive game experiences. Based on cutting-edge technology, I specialize
          in building games that push the boundaries of visual fidelity and gameplay.
        </p>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className={styles.content}>
          <p>
            My journey in game development started with a fascination for how games
            create worlds and tell stories. That passion evolved into expertise in
            Unreal Engine 5, where I craft everything from indie prototypes to
            AAA-quality game systems.
          </p>
          <p>
            I believe in creating games that are not just visually stunning but also
            optimized for performance. Every project is an opportunity to explore
            new techniques, from Nanite virtualized geometry to Lumen global illumination,
            and push what's possible in real-time rendering.
          </p>
          <p>
            When I'm not developing games, you'll find me exploring new UE5 features,
            contributing to game development communities,experimenting with game systems,
            or playing the latest games to study their mechanics and design choices.
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className={styles.skills}>
          <h2 className={styles.skillsTitle}>Skills & Technologies</h2>
          <div className={styles.skillGrid}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skill} data-hover>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}
