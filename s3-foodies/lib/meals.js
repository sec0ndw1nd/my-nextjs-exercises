import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  // just delay 2000ms
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error('Loading meals Failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  // throw new Error('Loading meals Failed');
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
