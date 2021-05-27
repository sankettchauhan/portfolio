import styles from "./Project.module.css";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <div id="projects" className={styles.container}>
      <div className={styles.title}>Projects</div>
      <div className={styles.cardContainer}>
        <ProjectCard
          title={"landing page"}
          image={"laptop.jpeg"}
          description={"Beautifully developed landing of subzcribe."}
          href={"http://subzcribe.in/"}
        />
        <ProjectCard
          title={"the cocktail db"}
          image={"cocktail.jpeg"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
          href={"https://the-cocktail-db.vercel.app/"}
        />
        <ProjectCard
          title={"e commerce"}
          image={"shopping.jpeg"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
          href={"https://vedworld.org/"}
        />
      </div>
    </div>
  );
}
