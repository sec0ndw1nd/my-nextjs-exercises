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

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
