import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'
import BootLoader from '../components/BootLoader'
import ScrollTop from '../components/ScrollTop'
import ScrollRail from '../components/ScrollRail'
import ShapeField from '../components/ShapeField'
import { profile } from '../data/site'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://muradismayilzadeh.github.io/Portfolio/'),
  title: {
    default: `${profile.name} — Game & Engine Developer`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — Game & Engine Developer`,
    description: profile.tagline,
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#07080a',
}

// Runs before first paint: decide whether the boot screen shows (first visit
// in this session, motion allowed). Prevents a loader flash for everyone else.
const bootScript = `try{if(!sessionStorage.getItem('booted')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('is-booting')}}catch(e){}`

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-noise" aria-hidden="true" />
        <BootLoader />
        <Cursor />
        <ScrollTop />
        <ScrollRail />
        <ShapeField />
        <Navbar />
        <main id="main" className="page">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
