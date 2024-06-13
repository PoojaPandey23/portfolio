import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the projects", error);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Portfolio</h1>
        <div className="projects">
          {projects.map((project) => (
            <div key={project.id} className="project">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p>
                <strong>Technologies:</strong>
                {project.technologies.join(",")}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
