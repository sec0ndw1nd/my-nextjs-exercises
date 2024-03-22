import Image from 'next/image';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import PostHeader from './PostHeader';
import styles from './PostContent.module.css';

export default function PostContent({ post }) {
  const customMarkdown = {
    /* img(image) {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    }, */

    p({ node, children }) {
      // override if it's an image in paragraph
      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{children}</p>;
    },

    code(props) {
      console.log(props);
      return (
        <SyntaxHighlighter style={atomDark} language="javascript">
          {props.children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader
        title={post.title}
        image={`/images/posts/${post.slug}/${post.image}`}
      />
      <Markdown components={customMarkdown}>{post.content}</Markdown>
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
