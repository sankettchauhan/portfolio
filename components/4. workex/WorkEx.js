import Card from "./WorkExCard";
import styles from "./WorkEx.module.css";
import WORKEX from "../../content/workex.json";

function Company({ image }) {
  return (
    <div className={styles.imageBox}>
      <img
        className={image === "atg.png" ? styles.atg : null}
        src={"./assets/images/workex/" + image}
      />
    </div>
  );
}

export default function WorkEx() {
  WORKEX.map((item) => console.log(item));
  console.log(WORKEX);
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
          <Company image={"subzcribe.png"} />
          <Company image={"vedworld.png"} />
          <Company image={"atg.png"} />
        </div>
      </div>
    </div>
  );
}
