import { useContext, useRef, useState } from 'react';
import styles from './NewsletterRegistration.module.css';
import NotificationContext from '@/store/notification-context';

export default function NewsletterRegistration() {
  const { showNotification } = useContext(NotificationContext);
  const emailInputRef = useRef();

  const registrationHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // success
        if (res.ok) return res.json();

        // failed
        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        showNotification({
          title: 'Success!',
          message: data.message || 'Successfully registered for newsletter!',
          status: 'success',
        });
      })
      .catch((error) => {
        showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
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
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
