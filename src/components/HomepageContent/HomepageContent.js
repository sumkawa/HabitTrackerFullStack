"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
function HomepageContent() {
  return (
    <motion.div
      className={styles.mainDescription}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.span
        className={styles.heroText}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      >
        Hi! I'm Summit.
      </motion.span>
      <motion.p
        className={styles.descriptionText}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        Aspiring Software and Electrical Engineer @ Stanford
      </motion.p>
    </motion.div>
  );
}

export default HomepageContent;
