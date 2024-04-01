import Image from 'next/image';
import Markdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import PostHeader from './PostHeader';
import styles from './PostContent.module.css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

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

    code({ children, className }) {
      const lang = className.split('language-')[1];
      console.log(lang);

      return (
        <SyntaxHighlighter style={atomDark} language={lang}>
          {children}
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
