import { useState, useEffect } from 'react'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="header">
        <a className="header-label header-link header-home" href="#top">
          <img src="/favicon.svg" alt="" className="header-logo" />
          Alex Redshaw
        </a>
        <nav className="header-nav">
          <a className="header-label header-link" href="#skills">Skills</a>
          <a className="header-label header-link" href="#timeline">Experience</a>
          <a className="header-label header-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer">GitHub</a>
          <a className="header-label header-link" href="https://www.linkedin.com/in/alex-redshaw/" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </header>

      {menuOpen && (
        <div className="nav-overlay">
          <div className="nav-overlay-header">
            <a className="header-label header-link header-home" href="#top" onClick={() => setMenuOpen(false)}>
              <img src="/favicon.svg" alt="" className="header-logo" />
              Alex Redshaw
            </a>
            <button className="nav-overlay-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation">✕</button>
          </div>
          <nav className="nav-overlay-links">
            <a className="nav-overlay-link" href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a className="nav-overlay-link" href="#timeline" onClick={() => setMenuOpen(false)}>Experience</a>
            <a className="nav-overlay-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
            <a className="nav-overlay-link" href="https://www.linkedin.com/in/alex-redshaw/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn</a>
          </nav>
        </div>
      )}
    </>
  )
}
