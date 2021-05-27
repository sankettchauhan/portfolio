import Card from "./WorkExCard";
import styles from "./WorkEx.module.css";

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
  return (
    <div id="workex" className={styles.container}>
      <div className={styles.title}>Work Experience</div>
      <div className={styles.cardContainer}>
        <Card
          date={"Sept 2020 - May 2021"}
          title={"Full stack developer"}
          logo={"subzcribe-logo.png"}
          company={"Subzclick Pvt. Ltd."}
          tech={["React", "Node", "MongoDB"]}
        />
        <Card
          date={"June-Sept 2020"}
          title={"Front end developer"}
          logo={"vedworld-logo.jpeg"}
          company={"Ved World Pvt. Ltd."}
          tech={["React", "ReactStrap", "CSS"]}
        />
        <Card
          date={"Jan-June 2020"}
          title={"Software developer"}
          logo={"atg-logo.jpeg"}
          company={"Across the Globe"}
          tech={["Extension", "jQuery"]}
        />
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
