import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

export default function HomePage({ products }) {
  return (
    <ul>
      {products.map((prod) => (
        <li key={prod.id}>
          <Link href={`/${prod.id}`}>{prod.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log('pages re-generating..');
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'dummy-backend.json',
  );
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
