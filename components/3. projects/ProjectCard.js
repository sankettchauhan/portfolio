import Image from "next/image";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ title, image, href, tags, disclaimer }) {
  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <div className={styles.imgBx}>
          <Image src={image} height={250} width={400} />
        </div>
        <a target="_blank" href={href}>
          <div className={styles.content}>
            {disclaimer && (
              <small className={styles.disclaimer}>{disclaimer}</small>
            )}
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
