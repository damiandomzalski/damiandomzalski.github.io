import React, { useEffect, useRef } from "react";

function About({ data }) {
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

  if (!data) return null;

  const { name, bio, email, location, website, image } = data;
  const profilePic = `${process.env.PUBLIC_URL}/images/${image}`;

  return (
    <section className="about" id="about">
      <div className="about-container section-enter" ref={sectionRef}>
        <div className="section-header">
          <span className="section-number">02 &mdash; About</span>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-divider"></div>
        </div>

        <div className="about-content">
          <div className="about-image-wrapper">
            <img
              src={profilePic}
              alt={`${name}`}
              className="about-image"
            />
          </div>

          <div className="about-text">
            <h3>A Bit About Me</h3>
            <p>{bio}</p>

            <div className="contact-grid" id="contact">
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <span className="contact-value">
                  <a href={`mailto:${email}`}>{email}</a>
                </span>
              </div>
              {location && (
                <div className="contact-item">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{location}</span>
                </div>
              )}
              {website && (
                <div className="contact-item">
                  <span className="contact-label">Website</span>
                  <span className="contact-value">
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {website.replace(/^https?:\/\//, "")}
                    </a>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
