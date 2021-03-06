import Image from "next/image";
import Card from "./WorkExCard";
import styles from "./WorkEx.module.css";
import WORKEX from "../../content/workex.json";

function Company({ company }) {
  return (
    <div className={styles.imageBox}>
      <Image
        width={180}
        height={100}
        className={styles[company]}
        src={`/assets/images/workex/${company}.webp`}
      />
    </div>
  );
}

export default function WorkEx() {
  return (
    <div id="workex" className={styles.container}>
      <div className={styles.title}>Work Experience</div>
      <div className={styles.cardContainer}>
        {WORKEX.map((item, index) => (
          <Card key={`Workex-card-${index + 1}`} {...item} />
        ))}
      </div>
      <div>
        <div className={`${styles.reduceFont} ${styles.title}`}>
          I am proud to have collaborated with
        </div>
        <div className={styles.companyContainer}>
          <Company company={"subzcribe"} />
          <Company company={"vedworld"} />
          <Company company={"atg"} />
        </div>
      </div>
    </div>
  );
}
