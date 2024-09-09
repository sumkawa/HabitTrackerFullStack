"use client";

import { motion } from "framer-motion";
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const HabitsInfoText = () => {
  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.textContainer}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          Build Better Habits. Break bad ones
        </motion.h1>
        <motion.div
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Use a clean UI to track your habits, record streaks, and schedule your
          tasks.
        </motion.div>
        <motion.div
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <a href="/api/auth/signup" className={styles.SignUpButton}>
            Sign Up
          </a>
        </motion.div>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/dashboard_new.png"
          alt="Dashboard Image"
          layout="responsive"
          width={2880}
          height={1384}
          priority
        />
      </div>
    </motion.div>
  );
};

export default HabitsInfoText;
