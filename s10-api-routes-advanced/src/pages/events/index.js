import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { useRouter } from 'next/router';
import { getAllEvents } from '@/helpers/api-util';

export default function EventsPage({ prefetchedAllEvents: events }) {
  const router = useRouter();

  if (events.isError) {
    return <p>Server Error: {events.message}</p>;
  }

  const findEventsHandler = (selected) => {
    const fullPath = `/events/${selected.year}/${selected.month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      prefetchedAllEvents: allEvents,
    },
    revalidate: 60,
  };
}
