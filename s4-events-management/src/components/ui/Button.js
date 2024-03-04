import Link from 'next/link';

import styles from './Button.module.css';

export default function Button({ children, link }) {
  return (
    <Link className={styles.btn} href={link}>
      {children}
    </Link>
  );
}
