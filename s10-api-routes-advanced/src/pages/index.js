import Head from 'next/head';

import { getFeaturedEvents } from '@/helpers/api-util';
import EventList from '@/components/events/EventList';
import NewsletterRegistration from '@/components/input/NewsletterRegistration';

export default function HomePage({ featuredEvents }) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <NewsletterRegistration />
      {featuredEvents.isError && <p>Server Error: {featuredEvents.message}</p>}
      {!featuredEvents.isError && <EventList items={featuredEvents} />}
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
