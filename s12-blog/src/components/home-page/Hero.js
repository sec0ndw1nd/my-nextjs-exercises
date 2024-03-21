import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src={`/images/site/dummy.jpg`}
          alt="An image"
          width={300}
          height={300}
        />
      </div>
      <h1>Title Here</h1>
      <p>Text Here</p>
    </section>
  );
}
