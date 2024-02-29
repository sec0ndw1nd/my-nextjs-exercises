import Link from 'next/link';
import styles from './page.module.css';
import MealsGrid from '@/components/Meals/MealsGrid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.h1}>
          Delicious meals, created{' '}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p className={styles.p}>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense
          fallback={<p className={styles.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
