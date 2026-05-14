import { useEffect } from 'react'
import './App.css'

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
      'Agent teams & A2A communication',
      'Custom skills, plugins & bespoke config',
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
      'Led Experience Tracker — ~1.5M weekly users',
      'Monolith → microservices, −50% cycle time',
      '15 internal awards from Senior Leadership',
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
      'Financial SOAP/XML data translation layer',
      'Custom reporting & data visualisation',
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
      'Real-time 3D rendering from 2D plans',
      'RealIT Project of the Year',
    ],
  },
  {
    id: 'lbu',
    company: 'Leeds Beckett University',
    role: 'Maths & Computer Science BSc 2:1',
    dates: 'Graduated 2019',
    colour: 'var(--black)',
    initials: 'LBU',
    bullets: [],
  },
]

function App() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.timeline-node')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('timeline-node--visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.3 }
    )
    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page">
      <header className="header">
        <span className="header-label">Alex Redshaw</span>
        <a className="header-label header-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer">GitHub</a>
      </header>

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
            <div className="timeline-node" style={{ borderColor: entry.colour }}>
              <span
                className="timeline-node-initials"
                style={{ color: entry.colour }}
              >
                {entry.initials}
              </span>
            </div>
            <div className="timeline-content">
              <div className="timeline-company">{entry.company}</div>
              <div className="timeline-role">{entry.role}</div>
              <div className="timeline-dates">{entry.dates}</div>
              {entry.bullets.length > 0 && (
                <ul className="timeline-bullets">
                  {entry.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              )}
            </div>
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
