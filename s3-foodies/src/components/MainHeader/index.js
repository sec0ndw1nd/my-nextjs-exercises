import Link from 'next/link';
import Image from 'next/image';

import logoImg from '@/assets/logo.png';
import styles from './index.module.css';
import MainHeaderBackground from './MainHeaderBackground';
import NavLink from '../NavLink';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />

      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={logoImg} priority alt="A plate with food on it" />
          NextLevel Food
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
