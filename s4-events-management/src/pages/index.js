import EventList from '@/components/events/EventList';
import { getFeaturedEvents } from '@/dummy-data';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <>
      <h1>Home</h1>
      <EventList items={featuredEvents} />
    </>
  );
}
