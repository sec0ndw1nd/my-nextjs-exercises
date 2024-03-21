import FeaturedPosts from '@/components/home-page/FeaturedPosts';
import Hero from '@/components/home-page/Hero';

// { title, image, excerpt, date, slug }
const DUMMY_POSTS = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started With Nextjs',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2024-03-21',
  },
  {
    slug: 'getting-started-with-nextjs2',
    title: 'Getting Started With Nextjs 2',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2024-03-21',
  },
  {
    slug: 'getting-started-with-nextjs3',
    title: 'Getting Started With Nextjs 3',
    image: 'getting-started-nextjs.png',
    excerpt:
      'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
    date: '2024-03-21',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}
