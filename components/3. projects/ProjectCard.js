import styles from "./ProjectCard.module.css";

export default function ProjectCard({ title, image, description, href }) {
  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <div className={styles.imgBx}>
          <img src={image} />
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.header}>
              <h2>{title}</h2>
              <a target="_blank" href={href}>
                Click me!
              </a>
            </div>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
