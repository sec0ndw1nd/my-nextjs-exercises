import EventList from '@/components/events/EventList';
import { getFeaturedEvents } from '@/dummy-data';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <EventList items={featuredEvents} />
    </>
  );
}
