import styles from './page.module.css'
import ScrollAnimation from '../components/ScrollAnimation'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title} data-hover>UE5 Game Developer</h1>
      <p className={styles.subtitle}>Unreal Engine 5 • Blueprints • C++ • Game Design</p>
      
      <ScrollAnimation>
        <p className={styles.description}>
          I create immersive gaming experiences using Unreal Engine 5, combining
          cutting-edge graphics, smooth gameplay mechanics, and innovative design.
          From AAA-quality visuals to optimized performance, I bring game concepts
          to life with passion and technical expertise.
        </p>
      </ScrollAnimation>

      <ScrollAnimation>
        <Link href="/projects" className={styles.cta} data-hover>
          View My Projects
        </Link>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>UE5 Development</h3>
            <p className={styles.featureDesc}>Blueprints, C++, Nanite, Lumen</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Game Design</h3>
            <p className={styles.featureDesc}>Mechanics, Systems, Level Design</p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Optimization</h3>
            <p className={styles.featureDesc}>Performance, Profiling, Scalability</p>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  )
}
