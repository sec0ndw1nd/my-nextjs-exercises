import ReactMarkDown from 'react-markdown';

import PostHeader from './PostHeader';
import styles from './PostContent.module.css';

export default function PostContent({ post }) {
  return (
    <article className={styles.content}>
      <PostHeader
        title={post.title}
        image={`/images/posts/${post.slug}/${post.image}`}
      />
      <ReactMarkDown>{post.content}</ReactMarkDown>
    </article>
  );
}

/* const DUMMY_POST = {
  slug: 'getting-started-with-nextjs',
  title: 'Getting Started With Nextjs',
  image: 'getting-started-nextjs.png',
  date: '2024-03-21',
  content: '# This is a first post!',
}; */
