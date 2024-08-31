'use client';
import React from 'react';
import styles from './AnalyticsCard.module.css';
import { AnalyticsContext } from '../AnalyticsProvider';
import CircularProgressBar from '../CircularProgressBar';

function AnalyticsCard() {
  const { user, habits } = React.useContext(AnalyticsContext);
  const [totalCompletedDays, totalExpectedDays] = habits.reduce(
    ([totalCompleted, totalExpected], habit) => {
      // Calculate the number of days since the habit started until the last day logged
      const dateStarted = new Date(habit.date_started);
      const lastDayLogged = new Date(habit.last_day_logged);
      const daysSinceStart = Math.floor(
        (lastDayLogged - dateStarted) / (1000 * 60 * 60 * 24)
      );

      // Calculate the expected number of completions based on the days of the week
      const expectedDays =
        habit.days_of_week.length * Math.ceil(daysSinceStart / 7);

      // Get the actual number of completions
      const completedDays = habit.dates_repeated.length;

      return [totalCompleted + completedDays, totalExpected + expectedDays];
    },
    [0, 0]
  );

  // Calculate the overall completion rate
  const completionRate = totalExpectedDays
    ? Math.floor((totalCompletedDays / totalExpectedDays) * 100)
    : 0;
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
