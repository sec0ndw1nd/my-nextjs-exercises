// import { useSession, getSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
import ProfileForm from './profile-form';

import classes from './user-profile.module.css';

function UserProfile() {
  /* const router = useRouter();

  // Redirect away if NOT auth
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      alert('You need to log in.');
      router.push('/auth');
      // window.location.href = '/auth';
    },
  });

  if (status === 'loading') {
    return <p className={classes.profile}>Loading...</p>;
  } */

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
