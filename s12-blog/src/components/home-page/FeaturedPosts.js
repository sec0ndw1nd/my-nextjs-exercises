import PostsGrid from '../posts/PostsGrid';
import styles from './FeaturedPosts.module.css';

export default function FeaturedPosts({ posts }) {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
