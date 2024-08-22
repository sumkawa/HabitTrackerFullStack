'use client';

import { motion } from 'framer-motion';
import React from 'react';
import styles from './styles.module.css';

const HabitsInfoText = () => {
  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        Build Better Habits.
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Get started with hydrogen.
      </motion.p>
    </motion.div>
  );
};

export default HabitsInfoText;
