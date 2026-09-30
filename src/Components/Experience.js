import React, { useEffect, useRef, useState } from "react";

function Counter({ value }) {
  const m = /^(\d+)(.*)$/.exec(value);
  const target = m ? parseInt(m[1], 10) : 0;
  const suffix = m ? m[2] : "";
  const animated = Boolean(m);
  const [n, setN] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!animated) return;
    const el = ref.current;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animated, target]);

  return <span ref={ref}>{animated ? `${n}${suffix}` : value}</span>;
}

function Experience({ data }) {
  const sectionRef = useRef(null);

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
    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(el);
    };
  }, []);

  if (!data || !data.experience) return null;

  const { experience, skills, education, stats } = data;

  return (
    <section className="experience" id="experience">
      <div className="experience-container section-enter" ref={sectionRef}>
        <div className="section-header">
          <span className="section-number">02 &mdash; Experience</span>
          <h2 className="section-title">Journey &amp; Stack</h2>
          <div className="section-divider"></div>
        </div>

        {stats && (
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-value"><Counter value={s.value} /></span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <ol className="timeline">
          {experience.map((job) => (
            <li className="timeline-item" key={job.company}>
              <span className="timeline-period">{job.period}</span>
              <h3 className="timeline-role">{job.role}</h3>
              <a
                className="timeline-company"
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {job.company}
              </a>
              <p>{job.description}</p>
            </li>
          ))}
        </ol>

        {skills && (
          <div className="skills-grid">
            {skills.map((g) => (
              <div className="skill-group" key={g.group}>
                <h4>{g.group}</h4>
                <div className="project-tags">
                  {g.items.map((i) => (
                    <span className="project-tag" key={i}>{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {education && (
          <p className="education">
            <span className="contact-label">Education</span>
            {education.degree} &middot; {education.school} &middot; {education.period}
          </p>
        )}
      </div>
    </section>
  );
}

export default Experience;
