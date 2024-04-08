import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {
  // status = 'loading' | 'authenticated' | 'unauthenticated'
  const { data: session, status } = useSession();

  const isAuthLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  const logoutHandler = () => signOut();

  console.log('session:', session);
  console.log('status:', status);

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!isAuthLoading && isAuthenticated && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button type="button" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthLoading && !isAuthenticated && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
