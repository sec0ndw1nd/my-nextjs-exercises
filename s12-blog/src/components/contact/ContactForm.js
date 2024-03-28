import { useEffect, useState } from 'react';
import styles from './ContactForm.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactData) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  const data = await res.json();
  return data;
}

export default function ContactForm(params) {
  const [reqStatus, setReqStatus] = useState();
  const [reqError, setReqError] = useState();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });

  useEffect(() => {
    if (reqStatus === 'success' || reqStatus === 'error') {
      const timer = setTimeout(() => {
        setReqStatus(null);
        setReqError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reqStatus]);

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const sendMessageHanlder = async (e) => {
    e.preventDefault();
    console.log('formData:', formData);

    if (
      !formData ||
      !formData.email ||
      !formData.name ||
      !formData.message ||
      formData.email.trim() === '' ||
      formData.name.trim() === '' ||
      formData.message.trim() === ''
    ) {
      // warning notification here
      console.log('invalid input');
      return;
    }

    setReqStatus('pending');

    try {
      await sendContactData(formData);
      setReqStatus('success');
      setFormData({
        email: '',
        name: '',
        message: '',
      });
    } catch (error) {
      setReqStatus('error');
      setReqError(error.message || 'ERROR!!');
    }
  };

  let notification;
  if (reqStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'your message is on its way!',
    };
  } else if (reqStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  } else if (reqStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: reqError,
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              onChange={handleChangeInput}
              value={formData.email}
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              onChange={handleChangeInput}
              value={formData.name}
              required
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            onChange={handleChangeInput}
            value={formData.message}
            required
          ></textarea>
        </div>

        <div className={styles.actions}>
          <button type="submit" onClick={sendMessageHanlder}>
            Send Message
          </button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
