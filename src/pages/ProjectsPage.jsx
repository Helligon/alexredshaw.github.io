import { useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import './ProjectsPage.css'

export default function ProjectsPage() {
  const [flippedId, setFlippedId] = useState(null)

  function handleFlip(id) {
    if (flippedId === id) {
      setFlippedId(null)
      return
    }
    if (flippedId !== null) {
      setFlippedId(null)
      setTimeout(() => setFlippedId(id), 150)
    } else {
      setFlippedId(id)
    }
  }

  return (
    <div className="page" id="top">
      <Header />
      <main className="projects-main">
        <div className="projects-title-block">
          <h1 className="projects-title">Projects</h1>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              flipped={flippedId === project.id}
              onFlip={() => handleFlip(project.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
