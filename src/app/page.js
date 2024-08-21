import styles from './page.module.css';
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mainDescription}>
        <span className={styles.heroText}>Hi! I'm Summit.</span>
        <p className={styles.descriptionText}>
          Aspiring Software and Electrical Engineer @ Stanford
        </p>
      </div>
    </main>
  );
}
