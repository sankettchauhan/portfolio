import styles from "./IntroCard.module.css";

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
          <img
            style={{
              filter: imageRevert ? "invert(1)" : "none",
            }}
            src={"./assets/images/intro/" + img + ".png"}
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
