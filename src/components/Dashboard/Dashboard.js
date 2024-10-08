'use client';
import React from 'react';
import Link from 'next/link';
import { HabitContext } from '../HabitsProvider';
import HabitCard from '../HabitCard';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import styles from './dashboard.module.css';
import './styles.css';
import HabitCardPlaceholder from '../HabitCardPlaceholder';
function Dashboard({ isAll }) {
  const { habits, user } = React.useContext(HabitContext);

  const [today, setToday] = React.useState(null);
  const getTodayInUserTimezone = (timezone) => {
    const date = new Date();
    const localeDate = date.toLocaleString('en-US', { timeZone: timezone });
    const localDate = new Date(localeDate);
    return localDate;
  };
  React.useEffect(() => {
    const currentDay = getTodayInUserTimezone(user.timezone);
    setToday(currentDay);
  }, [user.timezone]);

  if (!today) return null;

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
        <Link href="/habits/profile/all-habits" passHref className={styles.viewAllButton}>
         View All
        </Link>
        {habits.length == 0 ? (
          <HabitCardPlaceholder />
        ) : habitsToday.length == 0 ? (
          <p>No habits scheduled for today.</p>
        ) : (
          <ScrollArea.Root className='ScrollAreaRoot'>
            <ScrollArea.Viewport className='ScrollAreaViewport'>
              {isAll
                ? habits.map((habit, index) => (
                    <HabitCard
                      key={`${habit.uuid}-${index}`}
                      habitObject={habit}
                      user={user}
                    />
                  ))
                : habitsToday.map((habit, index) => (
                    <HabitCard
                      key={`${habit.uuid}-${index}`}
                      habitObject={habit}
                      user={user}
                    />
                  ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className='ScrollAreaScrollbar'
              orientation='vertical'
            >
              <ScrollArea.Thumb className='ScrollAreaThumb' />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className='ScrollAreaScrollbar'
              orientation='horizontal'
            >
              <ScrollArea.Thumb className='ScrollAreaThumb' />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className='ScrollAreaCorner' />
          </ScrollArea.Root>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
