import styles from "./WorkExCard.module.css";

export default function WorkEx({ date, title, logo, company, technologies }) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <p>{date}</p>
        <h2>{title}</h2>
      </header>

      <div className={styles.cardAuthor}>
        <div className={styles.authorAvatar} href="#">
          <img src={logo} />
        </div>
        <svg className={styles.halfCircle} viewBox="0 0 106 57">
          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
        </svg>

        <div className={styles.authorName}>
          <div className={styles.authorNamePrefix}>Company</div>
          {company}
        </div>
      </div>
      <div className={styles.tags}>
        {technologies.map((item, index) => (
          <span key={`Tech-${index + 1}`}>{item}</span>
        ))}
      </div>
    </article>
  );
}
