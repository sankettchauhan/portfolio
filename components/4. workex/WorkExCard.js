import styles from "./WorkExCard.module.css";

export default function WorkEx() {
  return (
    <div className={styles.card}>
      <div className={`${styles.face} ${styles.front}`}>
        <h2>Front</h2>
      </div>
      <div className={`${styles.face} ${styles.back}`}>
        <h2>Back</h2>
      </div>
    </div>
  );
}
