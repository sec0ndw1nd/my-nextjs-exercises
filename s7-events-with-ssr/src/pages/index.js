import EventList from '@/components/events/EventList';
import { getFeaturedEvents } from '@/helpers/api-util';
import Head from 'next/head';

export default function HomePage({ featuredEvents }) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <EventList items={featuredEvents} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
