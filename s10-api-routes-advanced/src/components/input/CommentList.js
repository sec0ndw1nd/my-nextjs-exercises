import styles from './CommentList.module.css';

export default function CommentList({ comments }) {
  if (comments.length === 0) {
    return (
      <div>
        <p>No comment yet.</p>
      </div>
    );
  }

  return (
    <ul className={styles.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((comm) => (
        <li key={comm._id}>
          <p>{comm.text}</p>
          <div>
            By <address>{comm.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}
