import React from 'react';
import HabitsProvider from '@/components/HabitsProvider';
import styles from './ProfileContent.module.css';
import AnalyticsProvider from '../AnalyticsProvider';

export default function ProfileContent({
  user,
  habits,
  tags,
  completionRates,
  cumulativeCompletionRate,
  friendDetails,
}) {
  return (
//     <div class="content">
//   <div class="left-top">Left Column Top</div>
//   <div class="left-bottom">Left Column Bottom</div>
//   <div class="right">Right Column</div>
// </div>

    <div className={styles.container}>
      <div className={styles.habitsHeader}>
        <p>Welcome back, </p>
        <h1 className={styles.span}>{user.name}</h1>
      </div>
      <section className={styles.content}>
        <div className={styles.analyticsContainer}>
          <AnalyticsProvider
            user={user}
            habits={habits}
            completionRates={completionRates}
            cumulativeCompletionRate={cumulativeCompletionRate}
            friendDetails={friendDetails}
          />
        </div>
        <div className={styles.habitsContainer}>
          <HabitsProvider
            habits={habits}
            tags={tags}
            user={user}
            completionRates={completionRates}
            isAll={false}
          />
        </div>
      </section>
    </div>
  );
}
