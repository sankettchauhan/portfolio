import styles from "./Nav.module.css";
import Link from "next/link";

function Navitem({ title, link }) {
  return (
    <a href={`#${link}`} className={styles.navitem}>
      {title}
    </a>
  );
}
function Icon({ icon }) {
  return <span>{icon}</span>;
}

export default function Nav({ home }) {
  if (home) {
    return (
      <div className={styles.nav}>
        <Navitem title={"Introduction"} link={"intro"} />
        <Navitem title={"My Projects"} link={"projects"} />
        <Navitem title={"Work Experience"} link={"workex"} />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.contactnav}>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </div>
      </>
    );
  }
}
