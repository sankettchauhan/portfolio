import introStyles from "./Intro.module.css";
import Card from "./IntroCard";
// import Img from "../../public/assets/images/welcome/code.png";

export default function Intro() {
  return (
    <div id="intro" className={introStyles.introSection}>
      <div className={introStyles.title}>Introduction</div>
      <div className={introStyles.bodyContainer}>
        <div className={introStyles.container}>
          <Card
            zIndex={3}
            img={"code"}
            title={"Full-stack Developer"}
            languages={"React.js, Node.js, Express"}
          />
          <Card
            zIndex={2}
            img={"mobile"}
            title={"App developer"}
            languages={"React Native"}
            imageRevert={true}
          />
          <Card
            zIndex={1}
            img={"launch"}
            title={"Browser extension developer"}
            languages={"JavaScript, jQuery, ajax"}
            marginRight={true}
          />
        </div>
      </div>
    </div>
  );
}
