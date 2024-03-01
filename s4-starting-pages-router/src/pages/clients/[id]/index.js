import { useRouter } from 'next/router';

export default function ProjectDetailsPage() {
  const router = useRouter();

  const handleGoBack = () => {
    // router.back();
    router.push('/clients');
    // router.replace('/clients');
  };

  console.log(router.query);
  return (
    <div>
      <h1>ProjectDetailPage</h1>
      <p>{router.query.id}</p>
      <div>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
}
