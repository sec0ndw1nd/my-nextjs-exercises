import EventList from '@/components/events/EventList';
import { getFeaturedEvents } from '@/helpers/api-util';

export default function HomePage({ featuredEvents }) {
  return (
    <>
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
