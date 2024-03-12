import styles from './NewsletterRegistration.module.css';

export default function NewsletterRegistration() {
  const registrationHandler = (e) => {
    e.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
