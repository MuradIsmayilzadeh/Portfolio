import { FiArrowUpRight, FiGithub, FiMail, FiPhone, FiYoutube } from 'react-icons/fi'
import Decode from '../../components/Decode'
import { SiCodecademy, SiVk } from 'react-icons/si'
import Reveal from '../../components/Reveal'
import SplitText from '../../components/SplitText'
import Magnetic from '../../components/Magnetic'
import CopyButton from '../../components/CopyButton'
import Clock from '../../components/Clock'
import { contacts } from '../../data/site'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Murad Ismayilzada.',
}

const ICONS = {
  email: FiMail,
  github: FiGithub,
  youtube: FiYoutube,
  codecademy: SiCodecademy,
  phone: FiPhone,
  vk: SiVk,
}

export default function Contact() {
  const email = contacts.find((c) => c.id === 'email')

  return (
    <section className="wrap section--top section--bottom">
      <Reveal className="page-head" variant="none">
        <Decode className="eyebrow" text="// 03 — Contact" />
        <h1 className="h1"><SplitText text="Let's talk" /></h1>
        <Reveal as="p" className="lead" delay={300}>
          A project, a role, a game idea or just a question — I usually reply within 24 hours.
        </Reveal>
      </Reveal>

      <Reveal className="mailbox" variant="clip">
        <div className="mailbox__top mono">
          <span><span className="pulse" aria-hidden="true" /> Accepting messages</span>
          <Clock />
        </div>
        <a href={email.href} className="mailbox__addr">{email.value}</a>
        <div className="mailbox__actions">
          <Magnetic>
            <a href={email.href} className="btn btn--primary">
              <FiMail aria-hidden="true" /> Send email
            </a>
          </Magnetic>
          <Magnetic>
            <CopyButton value={email.value} />
          </Magnetic>
        </div>
      </Reveal>

      <ul className="channels">
        {contacts.map((c, i) => {
          const Icon = ICONS[c.id]
          const external = c.href.startsWith('http')
          return (
            <Reveal as="li" key={c.id} delay={i * 60} variant="left">
              <a
                href={c.href}
                className="channel"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="channel__icon">{Icon && <Icon aria-hidden="true" />}</span>
                <span className="channel__label mono">{c.label}</span>
                <span className="channel__value">{c.value}</span>
                <FiArrowUpRight className="channel__arrow" aria-hidden="true" />
              </a>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
