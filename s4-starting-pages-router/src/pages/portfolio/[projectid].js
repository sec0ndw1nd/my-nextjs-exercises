import { useRouter } from 'next/router';

export default function PortfolioProjectPage() {
  const router = useRouter();

  return (
    <div>
      <h1>{`Project: ${router.query.projectid}`}</h1>
    </div>
  );
}
