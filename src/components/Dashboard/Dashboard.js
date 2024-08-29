'use client';
import React from 'react';

import { motion } from 'framer-motion';
import { RowSpacingIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { HabitContext } from '../HabitsProvider';
import HabitCard from '../HabitCard';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Collapsible from '@radix-ui/react-collapsible';

import styles from './dashboard.module.css';

function Dashboard() {
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false);
  const { habits, tags, user, checked, setChecked } =
    React.useContext(HabitContext);

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
        <h2 className={styles.sectionTitle}>Today's Habits</h2>
        {habitsToday.length === 0 ? (
          <p>No habits scheduled for today.</p>
        ) : (
          habitsToday.map((habit, index) => (
            <HabitCard
              key={`${habit.uuid}-${index}`}
              habitObject={habit}
              user={user}
            />
          ))
        )}
      </div>

      <Collapsible.Root
        className={styles.collapsibleRoot}
        open={collapsibleOpen}
        onOpenChange={setCollapsibleOpen}
      >
        <Collapsible.Trigger asChild>
          <motion.button
            className={styles.IconButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: collapsibleOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon width='30px' height='30px' />
            </motion.div>
          </motion.button>
        </Collapsible.Trigger>
        <Collapsible.Content className={styles.collapsibleContent}>
          <ScrollArea.Root className={styles.scrollAreaRoot}>
            <ScrollArea.Viewport className={styles.scrollAreaViewport}>
              {otherHabits.length === 0 ? (
                <p>No other habits.</p>
              ) : (
                otherHabits.map((habit, index) => (
                  <HabitCard
                    key={`${habit.uuid}-${index}`}
                    habitObject={habit}
                    user={user}
                  />
                ))
              )}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical'>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

export default Dashboard;
