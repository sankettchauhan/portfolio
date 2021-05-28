import styles from "./Contact.module.css";

function Form() {
  return (
    <form
      className={styles.form}
      action="https://usebasin.com/f/bf812690e301"
      method="post"
    >
      <p className={styles.p} type="Name:">
        <input
          className={styles.input}
          placeholder="Your name"
          type="text"
          name="name"
        ></input>
      </p>
      <p className={styles.p} type="Email:">
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Your email"
        ></input>
      </p>
      <p className={styles.p} type="Message:">
        <textarea
          type="text"
          className={styles.input}
          placeholder="Your message"
          name="message"
        ></textarea>
      </p>
      <button type="submit" className={styles.button}>
        Send Message
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <div className={styles.contact}>
      <div className={styles.title}>
        Thanks for taking out the time to reach out. How can i help you today?
      </div>
      <Form />
    </div>
  );
}
