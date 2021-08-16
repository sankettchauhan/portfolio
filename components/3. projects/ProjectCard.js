import styles from "./ProjectCard.module.css";

export default function ProjectCard({ title, image, href, tags }) {
  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <div className={styles.imgBx}>
          <img src={image} />
        </div>
        <a target="_blank" href={href}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div>
                <h2>{title}</h2>
              </div>
              <div className={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
