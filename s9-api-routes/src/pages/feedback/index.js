import { useState } from 'react';
import { extractData, getFeedbackPath } from '../api/feedback';

export default function FeedbackPage({ feedbackItems }) {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = (feedbackId) => {
    fetch(`/api/${feedbackId}`)
      .then((res) => res.json())
      .then((data) => setFeedbackData(data.feedback));
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems?.map((fb) => (
          <li key={fb.id}>
            <p>
              feedback: {fb.text}{' '}
              <button onClick={loadFeedbackHandler.bind(null, fb.id)}>
                Show Details
              </button>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = getFeedbackPath();
  const data = extractData(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
