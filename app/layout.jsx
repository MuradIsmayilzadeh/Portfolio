import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cursor from '../components/Cursor'
import BootLoader from '../components/BootLoader'
import ScrollTop from '../components/ScrollTop'
import { profile } from '../data/site'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-glow" aria-hidden="true" />
        <BootLoader />
        <Cursor />
        <ScrollTop />
        <Navbar />
        <main id="main" className="page">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
