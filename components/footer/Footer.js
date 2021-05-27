import styles from "./Footer.module.css";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub, FiMail } from "react-icons/fi";
import { AiOutlineCodepen } from "react-icons/ai";

function Icon({ icon, link }) {
  return (
    <a href={link} className={styles.icon}>
      {icon}
    </a>
  );
}

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.iconContainer}>
        <Icon
          icon={<FaLinkedinIn />}
          link={"https://www.linkedin.com/in/sanket-chauhan/"}
        />
        <Icon icon={<FiGithub />} link={"https://github.com/sankettchauhan"} />
        <Icon icon={<FiMail />} link={"mailto:sanket.chauhan4@gmail.com"} />
        <Icon
          icon={<AiOutlineCodepen />}
          link={"https://codepen.io/sankettchauhan"}
        />
      </div>
      <div>&copy; Sanket Chauhan 2021</div>
    </div>
  );
}
