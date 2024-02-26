'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './index.module.css';

export default function NavLink({ children, href }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link
      }
    >
      {children}
    </Link>
  );
}
