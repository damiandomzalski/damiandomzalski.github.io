import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Projects from "./Components/Projects";
import About from "./Components/About";
import Footer from "./Components/Footer";

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/resumeData.json`)
      .then((response) => response.json())
      .then((data) => {
        setResumeData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading resume data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header data={resumeData?.main} />
      <Projects data={resumeData?.main} />
      <About data={resumeData?.main} />
      <Footer data={resumeData?.main} />
    </div>
  );
}

export default App;
