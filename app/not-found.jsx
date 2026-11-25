import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import Decode from '../components/Decode'
import Magnetic from '../components/Magnetic'

export const metadata = {
  title: 'Not found',
}

export default function NotFound() {
  return (
    <section className="wrap nf" data-shape="galaxy" data-shape-x="0" data-shape-scale="1.2" data-shape-o="0.7">
      <Decode className="eyebrow" text="// Error 404 — signal lost" />
      <h1 className="nf__code" aria-label="404">
        <span>4</span>
        <span className="nf__zero">0</span>
        <span>4</span>
      </h1>
      <p className="lead">This page drifted out of orbit. It may have moved, or never existed.</p>
      <div className="nf__actions">
        <Magnetic>
          <Link href="/" className="btn btn--primary">
            <FiArrowLeft aria-hidden="true" /> Back to home
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/projects/" className="btn btn--ghost">See the work</Link>
        </Magnetic>
      </div>
    </section>
  )
}
