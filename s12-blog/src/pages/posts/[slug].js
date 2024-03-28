import Head from 'next/head';

import PostContent from '@/components/posts/post-detail/PostContent';
import { getPostData, getPostsFiles } from '@/lib/posts-util';

export default function PostDetailPage({ post }) {
  return (
    <>
      <Head>
        <title>Ted Blog | {post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export function getStaticProps({ params }) {
  const slug = params.slug;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilesWithExtension = getPostsFiles();
  const paths = postFilesWithExtension.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
}
