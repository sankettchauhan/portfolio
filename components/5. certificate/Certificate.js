import styles from "./Certificate.module.css";
import CERTIFICATES from "../../content/certificate.json";

function Card({ title, image, link }) {
  return (
    <a href={link} className={styles.card}>
      <img src={image} />
      <div className={styles.overlay} />
      <div className={styles.imgtitle}>{title}</div>
    </a>
  );
}

export default function Certificate() {
  return (
    <div id="certificate" className={styles.container}>
      <div className={styles.title}>Certifications</div>
      <div className={styles.cardContainer}>
        {CERTIFICATES.map((data, index) => (
          <Card key={`Certificate-card-${index + 1}`} {...data} />
        ))}
      </div>
    </div>
  );
}
