import Link from 'next/link';

const dummyClients = [
  { id: 'max', name: 'Maximilian' },
  { id: 'manu', name: 'Manuel' },
];

export default function ClientPage() {
  return (
    <div>
      <h1>Client Page</h1>
      <ul>
        {dummyClients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
