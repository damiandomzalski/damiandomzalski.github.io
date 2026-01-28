import React from "react";

// SVG Icons
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

function About({ data }) {
  if (!data) return null;

  const { name, bio, email, location, website, image } = data;
  const profilePic = `${process.env.PUBLIC_URL}/images/${image}`;

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="section-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-content">
          <div className="about-image-wrapper">
            <img
              src={profilePic}
              alt={`${name} - Software Engineer`}
              className="about-image"
            />
          </div>

          <div className="about-text">
            <h3>A Bit About Me</h3>
            <p>{bio}</p>

            <div className="contact-card">
              <h4>Let's Connect</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <MailIcon />
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                {location && (
                  <div className="contact-item">
                    <MapPinIcon />
                    <span>{location}</span>
                  </div>
                )}
                {website && (
                  <div className="contact-item">
                    <GlobeIcon />
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
