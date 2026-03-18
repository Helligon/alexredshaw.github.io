import './App.css'

function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="header-stripe header-stripe--blue" />
        <div className="header-stripe header-stripe--yellow" />
        <div className="header-stripe header-stripe--red" />
      </header>

      <main className="main">
        <h1 className="name">Alex Redshaw</h1>
        <div className="divider" />
        <p className="intro">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </main>

      <footer className="footer">
        <div className="footer-block footer-block--blue" />
        <div className="footer-block footer-block--yellow" />
        <div className="footer-block footer-block--red" />
      </footer>
    </div>
  )
}

export default App
