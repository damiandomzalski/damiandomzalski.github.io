import React from "react";

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function Header({ data }) {
  if (!data) return null;

  const { name, occupation, description, email, image } = data;
  const profilePic = `${process.env.PUBLIC_URL}/images/${image}`;

  return (
    <header className="hero" id="home">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="hero-text">
        <span className="hero-label">Software Engineer & Builder</span>
        <h1 className="hero-name">{name}</h1>
        <h2 className="hero-title">{occupation}</h2>
        <p className="hero-description">{description}</p>

        <div className="hero-cta">
          <a href={`mailto:${email}`} className="btn btn-primary">
            <MailIcon />
            Get in Touch
          </a>
          <a
            href="https://github.com/damiandomzalski"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <GithubIcon />
            GitHub
          </a>
        </div>
      </div>

      <div className="hero-photo">
        <img
          src={profilePic}
          alt={name}
          className="hero-photo-img"
        />
      </div>

      <div className="scroll-indicator">
        <a href="#projects">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
