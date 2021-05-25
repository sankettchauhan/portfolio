import styles from "./ProjectCard.module.css";

export default function ProjectCard({ title, image, description, link }) {
  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <div className={styles.imgBx}>
          <img src={`/assets/images/project/${image}`} />
        </div>
        <div className={styles.content}>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
