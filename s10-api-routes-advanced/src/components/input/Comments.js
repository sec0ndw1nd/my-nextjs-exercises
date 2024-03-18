import { useContext, useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './Comments.module.css';
import NotificationContext from '@/store/notification-context';

function getComments(eventId, setterCallback, notification) {
  console.log('getComments called');
  fetch(`/api/comments/${eventId}`)
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((data) => {
        throw new Error(data.message || 'Getting comments failed.');
      });
    })
    .then((data) => setterCallback(data.comments))
    .catch((error) => {
      //
      notification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    });
}

export default function Comments({ eventId }) {
  const { showNotification } = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      getComments(eventId, setComments, showNotification);
    }
  }, [showComments, eventId]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    // send data to API
    // console.log('send:', commentData);
    showNotification({
      title: 'Sending comment...!',
      message: 'Your comment is currently being stored.',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
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
        // console.log('returned:', data);
        showNotification({
          title: 'Success!',
          message: data.message || 'Your comment was saved!',
          status: 'success',
        });
        getComments(eventId, setComments, showNotification);
      })
      .catch((error) => {
        // notification error
        showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  };

  console.log('comments', comments);

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
