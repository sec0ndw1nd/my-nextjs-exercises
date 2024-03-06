import fs from 'fs/promises';
import path from 'path';

export default function ProductDetailPage({ loadedProduct }) {
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'dummy-backend.json',
  );
  const jsonData = await fs.readFile(filePath);

  return JSON.parse(jsonData);
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const pathsWithParams = data.products.map((prod) => ({
    params: { pid: prod.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}
