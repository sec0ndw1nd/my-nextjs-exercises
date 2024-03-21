import ReactMarkDown from 'react-markdown';

import PostHeader from './PostHeader';
import styles from './PostContent.module.css';

const DUMMY_POST = {
  slug: 'getting-started-with-nextjs',
  title: 'Getting Started With Nextjs',
  image: 'getting-started-nextjs.png',
  date: '2024-03-21',
  content: '# This is a first post!',
};

export default function PostContent() {
  return (
    <article className={styles.content}>
      <PostHeader
        title={DUMMY_POST.title}
        image={`/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`}
      />
      <ReactMarkDown>{DUMMY_POST.content}</ReactMarkDown>
    </article>
  );
}
