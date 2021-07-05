import styles from "./Project.module.css";
import ProjectCard from "./ProjectCard";
import PROJECTS from "../../content/projects.json";

export default function Projects() {
  return (
    <div id="projects" className={styles.container}>
      <div className={styles.title}>
        Projects
        <div className="scroll">Click to know more about my projects!</div>
      </div>
      <div className={styles.cardContainer}>
        {PROJECTS.map((item, index) => (
          <ProjectCard key={`Project-card-${index + 1}`} {...item} />
        ))}
      </div>
    </div>
  );
}
