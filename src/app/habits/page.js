import HabitsInfoText from '@/components/HabitsInfoText';
import styles from './page.module.css';
import { cookies } from 'next/headers';
export default function Habits() {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'light';
  return (
    <main className={styles.main}>
      <HabitsInfoText />
    </main>
  );
}
