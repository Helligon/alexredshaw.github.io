import './ProjectCard.css'

export default function ProjectCard({ project, flipped, onFlip }) {
  return (
    <div
      className={`proj-tile${flipped ? ' flipped' : ''}`}
      onClick={onFlip}
    >
      <div className="tile-inner">
        <div className="tile-front">
          <div className="tile-img">
            {project.image
              ? <img src={project.image} alt={project.title} className="tile-img-src" />
              : <span className="tile-img-placeholder">{project.title[0]}</span>
            }
          </div>
          <div className="tile-title">{project.title}</div>
        </div>
        <div className="tile-back">
          <div>
            <div className="tile-back-title">{project.title}</div>
            <div className="tile-back-blurb">{project.blurb}</div>
          </div>
          <a
            className="tile-back-link"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
          >
            ↗ GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
