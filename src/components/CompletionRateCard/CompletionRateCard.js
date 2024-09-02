import React from 'react';
import styles from './CompletionRateCard.module.css';
import { AnalyticsContext } from '../AnalyticsProvider';
import Link from 'next/link';
function CompletionRateCard() {
  const { cumulativeCompletionRate } = React.useContext(AnalyticsContext);
  return (
    <div className={styles.analyticsContainer}>
      <h2 className={styles.sectionTitle}>Completion Rate</h2>
      <div className={styles.analyticsRow}>
        {/* <NumberStat stat={672} percentageVal={100} label={'New Habits'} /> */}
        {/* <CircularProgressBar
          percentageVal={Math.round(cumulativeCompletionRate)}
        /> */}
        <div className={styles.statText}>
          {Math.round(cumulativeCompletionRate)}%
        </div>
        <Link
          href='/habits/profile/analytics'
          className={styles.analyticsButton}
        >
          Analytics
        </Link>
      </div>
    </div>
  );
}

export default CompletionRateCard;
