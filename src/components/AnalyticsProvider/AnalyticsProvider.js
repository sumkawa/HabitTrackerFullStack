'use client';
import React from 'react';
import styles from './AnalyticsProvider.module.css';
import AnalyticsCard from '../AnalyticsCard';
import FriendsCard from '../FriendsCard';
import CompletionRateCard from '../CompletionRateCard';

export const AnalyticsContext = React.createContext();

function AnalyticsProvider({
  user,
  habits,
  completionRates,
  cumulativeCompletionRate,
  friendDetails,
}) {
  return (
    <AnalyticsContext.Provider
      value={{ user, habits, completionRates, cumulativeCompletionRate, friendDetails }}
    >
      <div className={styles.analyticsProviderContainer}>
        <div className={styles.analyticsCardContainer}>
          <AnalyticsCard />
        </div>
        <div className={styles.friendsCardsContainer}>
          <CompletionRateCard />
          <FriendsCard />
        </div>
      </div>
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
