import styles from './page.module.css';

export default function Habits() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Build Better Habits.</h1>
        <p className={styles.subtitle}>Get started with atoms.</p>
      </div>
    </main>
  );
}
