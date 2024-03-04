import Link from 'next/link';

import styles from './Button.module.css';

export default function Button({ children, link, onClick }) {
  if (link) {
    return (
      <Link className={styles.btn} href={link}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}
