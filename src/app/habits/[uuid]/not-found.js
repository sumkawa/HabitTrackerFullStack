import Link from 'next/link';
import { LinkBreak2Icon } from '@radix-ui/react-icons';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <main className={styles.errorContainer}>
      <LinkBreak2Icon className={styles.notFoundIcon} />
      <h2 className={styles.textErrorCenter}>Uh oh.</h2>
      <p>We couldn't find the requested user.</p>
      <Link href='/habits/' className={styles.notFound}>
        Go Back
      </Link>
    </main>
  );
}
