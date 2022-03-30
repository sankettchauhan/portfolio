import styles from "./IntroCard.module.css";
import Image from "next/image";

export default function IntroCard({
  title,
  zIndex,
  img,
  languages,
  marginRight,
  imageRevert,
}) {
  return (
    <>
      <div
        className={`${styles.card} ${
          marginRight ? styles.marginRight : "none"
        }`}
        style={{
          zIndex: zIndex,
        }}
      >
        <div className={styles.imgbx}>
          <Image
            className={imageRevert && styles["filter-invert"]}
            src={img}
            layout="fill"
          />
          <h3>{title}</h3>
        </div>
        <div className={styles.content}>
          <p>Languages I speak : </p>
          <h4>{languages}</h4>
        </div>
      </div>
    </>
  );
}
