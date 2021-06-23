import introStyles from "./Intro.module.css";
import Card from "./IntroCard";
// import Img from "../../public/assets/images/welcome/code.png";
import INTRO from "../../content/intro.json";

export default function Intro() {
  return (
    <div id="intro" className={introStyles.introSection}>
      <div className={introStyles.title}>Skills</div>
      <div className={introStyles.bodyContainer}>
        <div className={introStyles.container}>
          {INTRO.map((item, index) => (
            <Card key={`Intro-card-${index + 1}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
