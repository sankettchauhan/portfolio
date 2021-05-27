import styles from "./ProjectCard.module.css";

export default function ProjectCard({ title, image, description, link, href }) {
  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <div className={styles.imgBx}>
          <img src={`/assets/images/project/${image}`} />
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.header}>
              <h2>{title}</h2>
              <a target="_blank" href={href}>
                Go to link
              </a>
            </div>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
