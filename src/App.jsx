import './App.css'

const timelineEntries = [
  {
    id: 'ai',
    company: 'Agentic AI',
    role: 'Personal Learning',
    dates: 'Ongoing',
    colour: 'var(--blue)',
    logo: null,
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
    logo: null,
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
    logo: null,
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
    logo: null,
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
    logo: null,
    initials: 'LBU',
    bullets: [],
  },
]

function App() {
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
          <button
            className="cta-btn"
            onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}
          >
            Take a look at my experience
          </button>
        </div>
      </main>

      <section className="skills">
        <div className="skills-col skills-col--tech">
          <span className="skills-col-label">Tech Stack</span>

          <div className="skill-group">
            <span className="skill-group-label">Frontend</span>
            <div className="skill-tags">
              {['React', 'TypeScript', 'JavaScript', 'HTML / CSS'].map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Backend</span>
            <div className="skill-tags">
              {['Node.js', 'Java', 'REST APIs', 'Microservices'].map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Cloud &amp; DevOps</span>
            <div className="skill-tags">
              {['AWS', 'Docker', 'GitHub Pipelines'].map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-group">
            <span className="skill-group-label">Data &amp; Observability</span>
            <div className="skill-tags">
              {['Elastic', 'Kibana', 'Grafana'].map(t => (
                <span key={t} className="skill-tag">{t}</span>
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
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

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
