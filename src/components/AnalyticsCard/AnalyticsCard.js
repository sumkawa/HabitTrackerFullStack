'use client';
import React from 'react';
import styles from './AnalyticsCard.module.css';
import { AnalyticsContext } from '../AnalyticsProvider';
import CircularProgressBar from '../CircularProgressBar';

function AnalyticsCard() {
  const { user, habits } = React.useContext(AnalyticsContext);
  console.log(user);
  console.log(habits);

  return (
    <div className={styles.analyticsContainer}>
      <h2 className={styles.sectionTitle}>Analytics</h2>
      <div className={styles.analyticsRow}>
        <CircularProgressBar percentageVal={90} label={'text'} />
        <CircularProgressBar percentageVal={35} label={'text'} />
        <CircularProgressBar percentageVal={70} label={'text'} />
      </div>
    </div>
  );
}

export default AnalyticsCard;
