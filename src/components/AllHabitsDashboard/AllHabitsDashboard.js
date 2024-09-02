'use client';
import React from 'react';
import Link from 'next/link';
import { AllHabitContext } from '../AllHabitsProvider';
import AllHabitCard from '../AllHabitCard';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import styles from './dashboard.module.css';
import './styles.css';
function AllHabitsDashboard({ isAll }) {
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false);
  const { habits, tags, user, checked, setChecked } =
    React.useContext(AllHabitContext);

  const getTodayInUserTimezone = (timezone) => {
    const date = new Date();
    const localeDate = date.toLocaleString('en-US', { timeZone: timezone });
    const localDate = new Date(localeDate);
    return localDate;
  };

  const today = getTodayInUserTimezone(user.timezone);
  const weekday = today.toLocaleString('en-US', { weekday: 'long' });

  const habitsToday = habits
    .filter((habit) => habit.days_of_week.includes(weekday))
    .sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.time}:00`).getTime();
      const timeB = new Date(`1970-01-01T${b.time}:00`).getTime();
      return timeA - timeB;
    });

  const otherHabits = habits.filter(
    (habit) => !habit.days_of_week.includes(weekday)
  );

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.todaysHabits}>
        <h2 className={styles.sectionTitle}>
          {isAll ? 'All Habits' : "Today's Habits"}
        </h2>
        {habitsToday.length === 0 ? (
          <p>No habits scheduled for today.</p>
        ) : isAll ? (
          habits.map((habit, index) => (
            <AllHabitCard
              key={`${habit.uuid}-${index}`}
              habitObject={habit}
              user={user}
            />
          ))
        ) : (
          habitsToday.map((habit, index) => (
            <AllHabitCard
              key={`${habit.uuid}-${index}`}
              habitObject={habit}
              user={user}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AllHabitsDashboard;
