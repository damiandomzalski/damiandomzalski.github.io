import React, { useEffect, useRef, useState } from "react";

const FALLBACK = [
  { name: "filmweb_api_rails", description: "Filmweb.pl unofficial API client", language: "Ruby", stargazers_count: 2, html_url: "https://github.com/damiandomzalski/filmweb_api_rails" },
  { name: "damiandomzalski.github.io", description: "Personal website", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/damiandomzalski/damiandomzalski.github.io" },
  { name: "gym_time", description: "Ruby on Rails 5 awesome gym management app", language: "Ruby", stargazers_count: 0, html_url: "https://github.com/damiandomzalski/gym_time" },
];

// Client work that shouldn't be showcased
const HIDDEN = ["northstar-site"];

function Repos() {
  const [repos, setRepos] = useState(FALLBACK);
  const sectionRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/damiandomzalski/repos?per_page=100&sort=pushed")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((list) => {
        const top = list
          .filter((r) => !r.fork && r.description && !HIDDEN.includes(r.name))
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6);
        if (!cancelled && top.length) setRepos(top);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add("no-observer"), 2000);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            clearTimeout(t);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return (
    <section className="repos" id="open-source">
      <div className="repos-container section-enter" ref={sectionRef}>
        <div className="section-header">
          <span className="section-number">03 &mdash; Open Source</span>
          <h2 className="section-title">From GitHub</h2>
          <div className="section-divider"></div>
        </div>
        <div className="repos-grid">
          {repos.map((r) => (
            <a key={r.name} className="repo-card" href={r.html_url} target="_blank" rel="noopener noreferrer">
              <h3>{r.name}</h3>
              <p>{r.description}</p>
              <div className="repo-meta">
                {r.language && <span className="repo-lang">{r.language}</span>}
                <span>&#9733; {r.stargazers_count}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Repos;
