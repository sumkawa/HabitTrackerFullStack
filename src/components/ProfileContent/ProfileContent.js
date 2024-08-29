'use client';

import React from 'react';
import HabitsProvider from '@/components/HabitsProvider';
import ToastShelf from '@/components/ToastShelf';
import styles from './ProfileContent.module.css';
import AnalyticsProvider from '../AnalyticsProvider';

export default function ProfileContent({ user, habits, tags }) {
  return (
    <div className={styles.container}>
      <div className={styles.habitsHeader}>
        <p>Welcome back, </p>
        <h1 className={styles.span}>{user.name}</h1>
      </div>
      <section className={styles.content}>
        <div className={styles.contentItem}>
          <HabitsProvider habits={habits} tags={tags} user={user} />
          <ToastShelf />
        </div>
        <div className={styles.contentItem}>
          <AnalyticsProvider user={user} habits={habits} />
        </div>
      </section>
    </div>
  );
}
