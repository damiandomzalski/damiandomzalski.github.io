import React from "react";

// SVG Icons for project cards
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

const iconMap = {
  chart: ChartIcon,
  sparkle: SparkleIcon,
};

function Projects({ data }) {
  if (!data || !data.projects || data.projects.length === 0) return null;

  const { projects } = data;

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <div className="section-header">
          <span className="section-label">What I'm Building</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const IconComponent = iconMap[project.icon];
            return (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
              >
                <div className="project-card-header">
                  <div className="project-icon">
                    {IconComponent && <IconComponent />}
                  </div>
                  <ExternalLinkIcon />
                </div>

                <h3 className="project-title">{project.title}</h3>
                <span className="project-role">{project.role}</span>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;
