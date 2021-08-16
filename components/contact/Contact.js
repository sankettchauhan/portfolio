import styles from "./Contact.module.css";

function Form() {
  return (
    <form
      className={styles.form}
      action="https://usebasin.com/f/bf812690e301"
      method="post"
    >
      <p className={styles.p}>
        <input
          className={styles.input}
          placeholder="Your name"
          type="text"
          name="name"
        ></input>
      </p>
      <p className={styles.p}>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Your email"
        ></input>
      </p>
      <p className={styles.p}>
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
    <div className={styles.contact} id="contact">
      <div className={styles.title}>
        Want to contact me? Just fill out the form and I'll reach out to you!
      </div>
      <Form />
    </div>
  );
}
