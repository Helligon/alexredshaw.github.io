import './App.css'

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

      <footer className="footer">
        <div className="footer-block footer-block--yellow" />
        <div className="footer-block footer-block--red" />
      </footer>
    </div>
  )
}

export default App
