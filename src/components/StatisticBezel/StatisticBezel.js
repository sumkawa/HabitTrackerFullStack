import React from 'react';
import styles from './StatisticBezel.module.css';

function StatisticBezel({ statistic, description }) {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.heroText}>{statistic}</div>
        <div className={styles.descriptionText}>{description}</div>
      </div>
    </div>
  );
}

export default StatisticBezel;
