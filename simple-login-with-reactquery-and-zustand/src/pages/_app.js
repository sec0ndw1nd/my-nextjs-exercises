import '@/styles/globals.css';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient(/* options */));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} /> {/* devtools */}
      </Hydrate>
    </QueryClientProvider>
  );
}
