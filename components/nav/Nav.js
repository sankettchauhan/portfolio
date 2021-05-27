import styles from "./Nav.module.css";

function Navitem({ title, link }) {
  return (
    <a href={`#${link}`} className={styles.navitem}>
      {title}
    </a>
  );
}

export default function Nav() {
  return (
    <div className={styles.nav}>
      <Navitem title={"Introduction"} link={"intro"} />
      <Navitem title={"My Projects"} link={"projects"} />
      <Navitem title={"Work Experience"} link={"workex"} />
    </div>
  );
}
