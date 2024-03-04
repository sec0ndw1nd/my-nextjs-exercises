import { useParams } from 'next/navigation';

export default function FilteredEventsPage() {
  const params = useParams();

  console.log(params);

  return (
    <>
      <h1>Filtered Events</h1>
    </>
  );
}
