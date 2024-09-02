'use client';
import React from 'react';
import styles from './AnalyticsCard.module.css';
import { AnalyticsContext } from '../AnalyticsProvider';
import CircularProgressBar from '../CircularProgressBar';
import StatisticBezel from '../StatisticBezel';

function AnalyticsCard() {
  const { user, habits, cumulativeCompletionRate } =
    React.useContext(AnalyticsContext);
  let totalTimes = 0;
  let longestStreak = 0;
  habits.forEach((habit) => {
    totalTimes += habit.dates_repeated.length;
    habit.longest_streak > longestStreak
      ? (longestStreak = habit.longest_streak)
      : (longestStreak = longestStreak);
  });
  const totalHabitCount = habits.length;
  return (
    <div className={styles.analyticsContainer}>
      <h2 className={styles.sectionTitle}>At a glance</h2>
      <div className={styles.analyticsRow}>
        <StatisticBezel
          statistic={totalTimes}
          description={'Habits Completed'}
        />
        <StatisticBezel
          statistic={longestStreak}
          description={'Longest Streak'}
        />
        <StatisticBezel
          statistic={totalHabitCount}
          description={'New Habits So far'}
        />
      </div>
    </div>
  );
}

export default AnalyticsCard;
