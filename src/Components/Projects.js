import React, { useEffect, useRef } from "react";

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const iconMap = {
  chart: ChartIcon,
  sparkle: SparkleIcon,
};

function Projects({ data }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  if (!data || !data.projects || data.projects.length === 0) return null;

  const { projects } = data;

  return (
    <section className="projects" id="projects">
      <div className="projects-container section-enter" ref={sectionRef}>
        <div className="section-header">
          <span className="section-number">01 &mdash; Work</span>
          <h2 className="section-title">Selected Projects</h2>
          <div className="section-divider"></div>
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
                <div className="project-card-content">
                  <span className="project-number">Project 0{index + 1}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-role">{project.role}</span>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">{tag}</span>
                    ))}
                  </div>

                  <span className="project-link">
                    View Project <span className="project-link-arrow">&rarr;</span>
                  </span>
                </div>

                <div className="project-card-visual">
                  <div className="project-icon-large">
                    {IconComponent && <IconComponent />}
                  </div>
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
