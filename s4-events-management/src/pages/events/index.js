import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { getAllEvents } from '@/dummy-data';
import { useRouter } from 'next/router';

export default function EventsPage() {
  const router = useRouter();

  const allEvents = getAllEvents();

  const findEventsHandler = (selected) => {
    const fullPath = `/events/${selected.year}/${selected.month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </>
  );
}
