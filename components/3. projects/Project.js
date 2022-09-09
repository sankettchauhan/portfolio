import styles from "./Project.module.css";
import ProjectCard from "./ProjectCard";
import PROJECTS from "../../content/projects.json";
import { useState } from "react";

const TAGS = new Set([
  "fullstack",
  "design",
  "react",
  "node",
  "tailwind",
  "api",
  "backend",
  "bootstrap",
  "css",
  "express",
  "firebase",
  "frontend",
  "game",
  "html",
  "material ui",
  "mongodb",
  "pug",
]);

export default function Projects() {
  // remove the react chat app project
  const [selectedTags, setselectedTags] = useState([]);
  console.log(
    PROJECTS.filter(({ hiddenTags }) => hiddenTags.some((e) => TAGS.has(e)))
  );

  const handleClick = (clickedTag) => {
    const selectedTagsSet = new Set(selectedTags);
    // tag is present in selected tags -> remove
    if (selectedTagsSet.has(clickedTag))
      setselectedTags((s) => s.filter((e) => e !== clickedTag));
    // tag is not present -> add
    else setselectedTags((s) => [...s, clickedTag]);
  };

  return (
    <div id="projects" className={styles.projectSection}>
      <div className={styles.title}>
        Projects
        <div className="scroll">Click on the project to view it!</div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.tagContainer}>
          {Array.from(TAGS).map((tag, index) => {
            const selectedTagsSet = new Set(selectedTags);
            return (
              <button
                key={`tag-${index}`}
                className={`${styles.tag} ${
                  selectedTagsSet.has(tag) ? styles.tagActive : ""
                }`}
                onClick={() => handleClick(tag)}
              >
                #{tag}
              </button>
            );
          })}
        </div>
        {selectedTags.length === 0
          ? PROJECTS.map((item, index) => (
              <ProjectCard key={`Project-card-${index + 1}`} {...item} />
            ))
          : PROJECTS.filter(({ hiddenTags }) => {
              const selectedTagsSet = new Set(selectedTags);
              return hiddenTags.some((e) => selectedTagsSet.has(e));
            }).map((item, index) => (
              <ProjectCard key={`Project-card-${index + 1}`} {...item} />
            ))}
      </div>
    </div>
  );
}
