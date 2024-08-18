'use client';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className={styles.errorContainer}>
      <h2 className={styles.textErrorCenter}>Something went wrong!</h2>
      <button className={styles.errorButton} onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
