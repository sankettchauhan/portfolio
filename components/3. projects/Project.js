import styles from "./Project.module.css";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <div className={styles.container}>
      <ProjectCard
        title={"Image Title"}
        image={"img1.jpg"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
        link={"www.google.com"}
      />
    </div>
  );
}
