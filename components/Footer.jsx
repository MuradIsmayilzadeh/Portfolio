import Link from 'next/link'
import { contacts, profile } from '../data/site'
import FooterMark from './FooterMark'

export default function Footer() {
  const shown = contacts.filter((c) => ['email', 'github', 'youtube'].includes(c.id))

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div>
          <p className="footer__name">{profile.name}</p>
          <p className="muted">{profile.roles.join(' · ')}</p>
        </div>
        <ul className="footer__links">
          {shown.map((c) => (
            <li key={c.id}>
              <a href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {c.label}
              </a>
            </li>
          ))}
          <li><Link href="/contact">All channels</Link></li>
        </ul>
      </div>

      <div className="wrap">
        <FooterMark text={profile.name} />
      </div>

      <div className="wrap footer__bottom mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js · no 3D libraries</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  )
}
