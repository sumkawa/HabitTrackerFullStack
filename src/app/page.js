import React from "react";
import styles from "./page.module.css";
import HomepageContent from "@/components/HomepageContent";

export const metadata = {
  title: "Summit Kawakami",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <HomepageContent />
    </main>
  );
}
