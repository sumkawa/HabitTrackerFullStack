'use client';
import React from 'react';
import styles from './AnalyticsProvider.module.css';
import AnalyticsCard from '../AnalyticsCard';
import FriendsCard from '../FriendsCard';

export const AnalyticsContext = React.createContext();

function AnalyticsProvider({ user, habits }) {
  return (
    <AnalyticsContext.Provider value={{ user, habits }}>
      <div className={styles.analyticsProviderContainer}>
        <AnalyticsCard />
        <FriendsCard />
      </div>
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsProvider;
