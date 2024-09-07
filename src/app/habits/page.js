import HabitsInfoText from "@/components/HabitsInfoText";
import Image from "next/image"; // Import Image from Next.js
import styles from "./page.module.css";

export default function Habits() {
  return (
    <main className={styles.main}>
      <HabitsInfoText />
    </main>
  );
}
