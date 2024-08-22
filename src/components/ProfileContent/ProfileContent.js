'use client';

import React from 'react';
import HabitsProvider from '@/components/HabitsProvider';
import ToastShelf from '@/components/ToastShelf';
import styles from './ProfileContent.module.css';

export default function ProfileContent({ user, habits, tags }) {
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <div className={styles.habitsHeader}>
          <p>Welcome back, </p>
          <h1 className={styles.span}>{user.name}</h1>
        </div>
        <HabitsProvider habits={habits} tags={tags} user={user} />
        <ToastShelf />
      </section>
    </div>
  );
}
