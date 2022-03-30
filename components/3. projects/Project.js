import styles from "./Project.module.css";
import ProjectCard from "./ProjectCard";
import PROJECTS from "../../content/projects.json";

export default function Projects() {
  // remove the react chat app project
  PROJECTS.pop();
  return (
    <div id="projects" className={styles.projectSection}>
      <div className={styles.title}>
        Projects
        <div className="scroll">Click on the project to view it!</div>
      </div>
      <div className={styles.cardContainer}>
        {PROJECTS.map((item, index) => (
          <ProjectCard key={`Project-card-${index + 1}`} {...item} />
        ))}
      </div>
    </div>
  );
}
