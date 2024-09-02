import React from 'react';
import styles from './StatisticBezel.module.css';

function StatisticBezel({ statistic, description }) {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.heroText}>{statistic}</div>
        <p className={styles.descriptionText}>{description}</p>
      </div>
    </div>
  );
}

export default StatisticBezel;
