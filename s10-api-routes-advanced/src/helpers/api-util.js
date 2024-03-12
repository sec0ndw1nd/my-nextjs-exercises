import baseUrl from '@/pages/api/baseUrl';

export async function getAllEvents() {
  const response = await fetch(baseUrl + '/events.json');
  if (!response.ok) {
    console.error(
      `**************** SERVER ERROR: ${response.statusText} (${response.status})`,
    );
    return {
      isError: true,
      message: response.statusText,
    };
  }

  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  if (allEvents.isError) return allEvents;

  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
