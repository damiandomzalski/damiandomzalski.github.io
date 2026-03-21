import React from "react";

function Highlights({ data }) {
  if (!data || !data.highlights) return null;

  const items = data.highlights;
  // Duplicate for seamless loop
  const track = [...items, ...items, ...items, ...items];

  return (
    <div className="highlights-strip">
      <div className="highlights-track">
        {track.map((item, i) => (
          <React.Fragment key={i}>
            <span>{item}</span>
            <span className="highlight-dot" aria-hidden="true">&bull;</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Highlights;
