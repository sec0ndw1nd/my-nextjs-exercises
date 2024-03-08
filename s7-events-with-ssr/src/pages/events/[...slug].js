import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import baseUrl from '../api/baseUrl';
import Head from 'next/head';

const isInvalid = ({ year, month }) => {
  return (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  );
};

export default function FilteredEventsPage() {
  const slugs = useRouter().query.slug;
  const [loadedEvents, setLoadedEvents] = useState();
  const { data, error } = useSWR(baseUrl + '/events.json', (url) =>
    fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (data) {
      const updatedEvents = [];
      for (const key in data) {
        updatedEvents.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(updatedEvents);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  const filteredYear = +slugs[0];
  const filteredMonth = +slugs[1];
  if (isInvalid({ year: filteredYear, month: filteredMonth }) || error) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${filteredMonth}/${filteredYear}.`}
      />
    </Head>
  );
  const date = new Date(filteredYear, filteredMonth - 1);
  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}
