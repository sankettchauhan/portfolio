import styles from "./Welcome.module.css";
import ReactTyped from "react-typed";
import Particles from "react-particles-js";
import config from "./particles-config.json";
import CONTENT from "../../content/welcome.json";

// const SKILLS = [
//   "Fullstack Developer",
//   "App Developer",
//   "MERN Stack",
//   "Browser Extensions",
// ];
const { desc, skills: SKILLS, image } = CONTENT;

function extendArray(ar, n) {
  const b = [];
  for (let i = 0; i < n; i++) b.push(ar[i % ar.length]);
  return b;
}

export default function Welcome() {
  return (
    <div className={styles.container}>
      <Particles
        canvasClassName={styles.particlesCanvas}
        className={styles.particles}
        params={config}
      />
      <div className={styles.welcome}>
        {/* <div className={styles.blur}></div> */}
        <div className={styles.content}>
          <div className={styles.imgBox}>
            <img className={styles.img} src={image} />
          </div>
          <div className={styles.intro}>
            <ReactTyped strings={[desc]} typeSpeed={40} />
          </div>
          <div className={styles.skills}>
            <ReactTyped
              strings={extendArray(SKILLS, 100)}
              typeSpeed={40}
              backSpeed={15}
              startDelay={2000}
              showCursor={false}
              loop
            />
          </div>
        </div>
      </div>
      <div className={styles.scroll}>Scroll down to know more!</div>
    </div>
  );
}
