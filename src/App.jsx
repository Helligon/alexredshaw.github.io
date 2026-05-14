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

      <footer className="footer">
        <div className="footer-block footer-block--yellow" />
        <div className="footer-block footer-block--red" />
      </footer>
    </div>
  )
}

export default App
