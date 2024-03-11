import { useRef, useState } from 'react';

export default function HomePage() {
  const [loadedFeedbacks, setLoadedFeedbacks] = useState();
  const [message, setMessage] = useState();
  const emailInputRef = useRef();
  const textareaInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const text = textareaInputRef.current.value;

    const reqBody = {
      email,
      text,
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { message } = data;
        setMessage(message);
      });
  };

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => {
        setLoadedFeedbacks(data.feedback);
      });
  };

  return (
    <div>
      <h1>The Home Page</h1>
      {message && <p>{message}</p>}
      <form type="email" onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={textareaInputRef}></textarea>
        </div>
        <button type="submit">Send Feedback</button>
      </form>
      <hr />
      <div>
        <button type="button" onClick={loadFeedbackHandler}>
          Load Feedbacks
        </button>
        <ul>
          {loadedFeedbacks?.map((fb) => (
            <li key={fb.id}>
              <p>feedback: {fb.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
