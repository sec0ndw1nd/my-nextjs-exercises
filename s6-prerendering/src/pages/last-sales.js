import { useEffect, useState } from 'react';

import baseUrl from './api/baseUrl';
import useSWR from 'swr';

export default function LastSalesPage({ sales: prefetchedSales }) {
  // 2. prefetch된 데이터를 초기값으로 사용
  const [sales, setSales] = useState(prefetchedSales);

  // 3. 이후 업데이트는 클라이언트에서 (useSWR이 포커싱마다 알아서 업데이트 해줌)
  const { data, error } = useSWR(baseUrl + '/sales.json', (url) =>
    fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          ...data[key],
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }
  if (!data && !sales) {
    return <p>No data yet.</p>;
  }

  return (
    <>
      <h1>LaseSalesPage</h1>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}{' '}
          </li>
        ))}
      </ul>
    </>
  );
}

// 1. prefetching한 데이터를 페이지에 전달  (seo에 유리)
export async function getStaticProps() {
  const response = await fetch(baseUrl + '/sales.json');
  const data = await response.json();

  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      ...data[key],
    });
  }

  return {
    props: {
      sales: transformedSales,
      revalidate: 10,
    },
  };
}
