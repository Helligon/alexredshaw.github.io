import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

const PALETTE = [
  { bg: '#0057D8', text: '#fff' },
  { bg: '#E8000D', text: '#fff' },
  { bg: '#00A550', text: '#fff' },
  { bg: '#FFD600', text: '#000' },
]

const ALL_TAGS = [
  'React', 'TypeScript', 'JavaScript', 'HTML / CSS',
  'Node.js', 'Java', 'REST APIs', 'Microservices',
  'AWS', 'Docker', 'GitHub Pipelines',
  'Elastic', 'Kibana', 'Grafana',
  'Multi-Agent Orchestration', 'Agentic Workflows', 'RAG', 'Claude Code', 'A2A',
  'Claude Opus', 'Claude Sonnet', 'Claude Haiku', 'Llama 3.2', 'Mistral',
  'Ollama', 'MCP', 'Skills & Plugins',
  'Prompt Engineering', 'Context Management', 'Tool Use', 'Agent Memory', 'Orchestration Patterns',
]

function buildTagColours(tags) {
  const map = {}
  let last = null
  tags.forEach(tag => {
    const choices = PALETTE.filter(c => c !== last)
    const pick = choices[Math.floor(Math.random() * choices.length)]
    map[tag] = pick
    last = pick
  })
  return map
}

const TAG_COLOURS = buildTagColours(ALL_TAGS)

const timelineEntries = [
  {
    id: 'ai',
    company: 'Agentic AI',
    role: 'Personal Learning',
    dates: 'Ongoing',
    colour: 'var(--blue)',
    initials: 'AI',
    bullets: [
      'Built AI Agent Teams using A2A communication to explore agentic workflows at scale',
      'Bespoke global and project-level config optimising token usage by up to −25%',
      'Designed and implemented project-specific Skills, Agents and Plugins',
    ],
  },
  {
    id: 'sky',
    company: 'Sky',
    role: 'Full Stack Software Engineer',
    dates: 'Jul 2022 – Apr 2026',
    colour: 'var(--blue)',
    initials: 'Sky',
    bullets: [
      'Led Experience Tracker across ~1.5M weekly users, improving CTR and reducing Customer Service costs',
      'Contributed to monolith → microservices migration across multiple product domains, −50% cycle time',
      'Recognised with 15 internal awards; contract renewed twice before going permanent',
      'Career Coach and Mentor — supported 3 colleagues through promotion',
      'Certified practitioner of Scaled Agile Framework (SAFe)',
    ],
  },
  {
    id: 'onepay',
    company: 'OnePay',
    role: 'JavaScript Developer',
    dates: 'Nov 2020 – Jul 2022',
    colour: 'var(--red)',
    initials: 'OP',
    bullets: [
      'Built a data translation layer to communicate with financial SOAP/XML APIs used across the digital estate',
      'Produced custom reports and data visualisations to support business leadership decisions',
    ],
  },
  {
    id: 'wren',
    company: 'Wren Kitchens',
    role: 'Graduate Developer',
    dates: 'Aug 2019 – Nov 2020',
    colour: 'var(--yellow)',
    initials: 'WK',
    bullets: [
      'Contributed to a 2D/3D browser-based CAD platform across apps of up to ~1M lines of code',
      'Developed real-time 3D rendering from 2D plans, contributing to winning RealIT Project of the Year',
      'Led implementation of Bézier curve logic used in both technical construction plans and customer-facing outputs',
    ],
  },
  {
    id: 'lbu',
    company: 'Leeds Beckett University',
    role: 'Mathematics & Computer Science BSc (Hons) 2:1',
    dates: 'Graduated 2019',
    colour: 'var(--black)',
    initials: 'LBU',
    bullets: [
      'A Levels: Maths (A), Physics (B), Further Maths (D)',
    ],
  },
]

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const param = new URLSearchParams(location.search).get('scroll')
    if (!param) return
    navigate('/', { replace: true })
    document.getElementById(param)?.scrollIntoView({ behavior: 'smooth' })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const nodes = document.querySelectorAll('.timeline-node')
    nodes.forEach(n => n.classList.add('timeline-node--hidden'))
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('timeline-node--hidden')
          e.target.classList.add('timeline-node--visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0 }
    )
    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page" id="top">
      <Header />
      <main className="main">
        <div className="main-left">
          <h1 className="name">Alex<br />Redshaw</h1>
        </div>
        <div className="main-right">
          <p className="role">Designer<br />&amp;<br />Developer</p>
          <p className="intro">
            Full-stack engineer with 6+ years building large-scale systems at Sky, OnePay, and Wren Kitchens. Comfortable across the stack — from React frontends to Node microservices to cloud infrastructure. Currently exploring Agentic AI workflows.
          </p>
          <div className="cta-btns">
            <button
              className="cta-btn"
              onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
            >
              Take a look at my skills
            </button>
            <button
              className="cta-btn"
              onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}
            >
              Take a look at my experience
            </button>
          </div>
        </div>
      </main>

      <div className="section-break">
        <div className="section-break--yellow" />
        <div className="section-break--red" />
      </div>

      <section className="skills" id="skills">
        <div className="skills-col skills-col--tech">
          <span className="skills-col-label">Tech Stack</span>

          <div className="skill-group">
            <span className="skill-group-label">Frontend</span>
            <div className="skill-tags">
              {['React', 'TypeScript', 'JavaScript', 'HTML / CSS'].map(t => (
                <span key={t} className="skill-tag" style={{ background: TAG_COLOURS[t].bg, color: TAG_COLOURS[t].text }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Backend</span>
            <div className="skill-tags">
              {['Node.js', 'Java', 'REST APIs', 'Microservices'].map(t => (
                <span key={t} className="skill-tag" style={{ background: TAG_COLOURS[t].bg, color: TAG_COLOURS[t].text }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Cloud &amp; DevOps</span>
            <div className="skill-tags">
              {['AWS', 'Docker', 'GitHub Pipelines'].map(t => (
                <span key={t} className="skill-tag" style={{ background: TAG_COLOURS[t].bg, color: TAG_COLOURS[t].text }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Data &amp; Observability</span>
            <div className="skill-tags">
              {['Elastic', 'Kibana', 'Grafana'].map(t => (
                <span key={t} className="skill-tag" style={{ background: TAG_COLOURS[t].bg, color: TAG_COLOURS[t].text }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-col skills-col--ai">
          <span className="skills-col-label">AI (Personal)</span>

          <div className="skill-group">
            <span className="skill-group-label">Focus areas</span>
            <div className="skill-tags">
              {['Multi-Agent Orchestration', 'Agentic Workflows', 'RAG', 'Claude Code', 'A2A'].map(t => (
                <span key={t} className="skill-tag" style={{ background: TAG_COLOURS[t].bg, color: TAG_COLOURS[t].text }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Models</span>
            <div className="skill-tags">
              {['Claude Opus', 'Claude Sonnet', 'Claude Haiku', 'Llama 3.2', 'Mistral'].map(t => (
                <span key={t} className="skill-tag" style={{ background: TAG_COLOURS[t].bg, color: TAG_COLOURS[t].text }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Tooling</span>
            <div className="skill-tags">
              {['Ollama', 'MCP', 'Skills & Plugins'].map(t => (
                <span key={t} className="skill-tag" style={{ background: TAG_COLOURS[t].bg, color: TAG_COLOURS[t].text }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Concepts</span>
            <div className="skill-tags">
              {['Prompt Engineering', 'Context Management', 'Tool Use', 'Agent Memory', 'Orchestration Patterns'].map(t => (
                <span key={t} className="skill-tag" style={{ background: TAG_COLOURS[t].bg, color: TAG_COLOURS[t].text }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-break">
        <div className="section-break--yellow" />
        <div className="section-break--red" />
      </div>

      <section className="timeline" id="timeline">
        <span className="timeline-label">Experience</span>
        {timelineEntries.map((entry, i) => (
          <div
            key={entry.id}
            className={`timeline-entry${i % 2 !== 0 ? ' timeline-entry--even' : ''}`}
          >
            <div className="timeline-entry-header">
              <div className="timeline-node" style={{ borderColor: entry.colour }}>
                <span
                  className="timeline-node-initials"
                  style={{ color: entry.colour }}
                >
                  {entry.initials}
                </span>
              </div>
              <div className="timeline-meta">
                <div className="timeline-company">{entry.company}</div>
                <div className="timeline-role">{entry.role}</div>
                <div className="timeline-dates">{entry.dates}</div>
              </div>
            </div>
            {entry.bullets.length > 0 && (
              <ul className="timeline-bullets">
                {entry.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            )}
          </div>
        ))}
      </section>

      <footer className="footer">
        <div className="footer-block footer-block--yellow" />
        <div className="footer-block footer-block--red" />
      </footer>
    </div>
  )
}

export default App
