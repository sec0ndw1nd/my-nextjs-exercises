import Link from 'next/link';
import Header from '@/components/header';

export default function Home() {
  console.log('read me');

  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <div>
        <Link href="/about">About</Link>
      </div>
      <div>
        <Link href="/blog">Blog</Link>
      </div>
    </main>
  );
}
