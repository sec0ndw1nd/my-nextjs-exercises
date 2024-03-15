import { useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './Comments.module.css';

function getComments(eventId, callback) {
  fetch(`/api/comments/${eventId}`)
    .then((res) => res.json())
    .then((data) => callback(data.comments));
}

export default function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      getComments(eventId, setComments);
    }
  }, [showComments, eventId]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    // send data to API
    console.log('send:', commentData);
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('returned:', data);
        getComments(eventId, setComments);
      });
  };

  console.log(comments);

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}
