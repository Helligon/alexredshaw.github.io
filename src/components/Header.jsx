import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  function scrollTo(id) {
    setMenuOpen(false)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/?scroll=${id}`)
    }
  }

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
        <Link className="header-label header-link header-home" to="/">
          <img src="/favicon.svg" alt="" className="header-logo" />
          Alex Redshaw
        </Link>
        <nav className="header-nav">
          <button className="header-label header-link" onClick={() => scrollTo('skills')}>Skills</button>
          <button className="header-label header-link" onClick={() => scrollTo('timeline')}>Experience</button>
          <Link
            className={`header-label header-link${pathname === '/projects' ? ' header-link--active' : ''}`}
            to="/projects"
          >
            Projects
          </Link>
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
            <Link className="header-label header-link header-home" to="/" onClick={() => setMenuOpen(false)}>
              <img src="/favicon.svg" alt="" className="header-logo" />
              Alex Redshaw
            </Link>
            <button className="nav-overlay-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation">✕</button>
          </div>
          <nav className="nav-overlay-links">
            <button className="nav-overlay-link" onClick={() => scrollTo('skills')}>Skills</button>
            <button className="nav-overlay-link" onClick={() => scrollTo('timeline')}>Experience</button>
            <Link className="nav-overlay-link" to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
            <a className="nav-overlay-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
            <a className="nav-overlay-link" href="https://www.linkedin.com/in/alex-redshaw/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn</a>
          </nav>
        </div>
      )}
    </>
  )
}
