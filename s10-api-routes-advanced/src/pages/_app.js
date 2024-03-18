import Head from 'next/head';

import '../styles/globals.css';
import Layout from '@/components/layout/Layout';
import { NotificationContextProvider } from '@/store/notification-context';

export default function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
