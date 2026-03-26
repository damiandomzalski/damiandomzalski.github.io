import React, { useEffect, useRef, useCallback } from "react";

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

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const iconMap = {
  chart: ChartIcon,
  sparkle: SparkleIcon,
  bolt: BoltIcon,
};

function Projects({ data }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // 3D tilt effect on hover (desktop only)
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

    // Move glow highlight
    const glow = card.querySelector('.project-card-glow');
    if (glow) {
      glow.style.opacity = '1';
      glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(232, 168, 73, 0.12), transparent 40%)`;
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.transform = '';
    const glow = card.querySelector('.project-card-glow');
    if (glow) {
      glow.style.opacity = '0';
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const fallbackTimer = setTimeout(() => {
      if (el && !el.classList.contains("visible")) {
        el.classList.add("no-observer");
      }
    }, 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            clearTimeout(fallbackTimer);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);

    // Staggered card reveals
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    // Disable tilt on touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (!isTouchDevice) {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        }
      });
    }

    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(el);
      cardsRef.current.forEach((card) => {
        if (card) {
          cardObserver.unobserve(card);
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, [handleMouseMove, handleMouseLeave]);

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
                className="project-card card-enter"
                ref={(el) => (cardsRef.current[index] = el)}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="project-card-glow"></div>
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
