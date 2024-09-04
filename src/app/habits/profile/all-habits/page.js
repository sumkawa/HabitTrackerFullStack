import React from 'react';
import styles from './AllHabits.module.css';
import { getSession } from '@auth0/nextjs-auth0';
import ToastShelf from '@/components/ToastShelf';

import {
  fetchUserByEmail,
  fetchHabits,
  fetchTags,
  createUser,
} from '@/app/lib/data';
import AllHabitsContent from '@/components/AllHabitsContent';
import { formatDateToTimeZone } from '../../../../helpers/dateUtils';
export default async function AllHabitsPage() {
  const session = await getSession();

  if (!session?.user) {
    return <div>Unauthorized. Please log in.</div>;
  }

  let dbUser = await fetchUserByEmail(session.user.email);

  if (!dbUser) {
    const result = await createUser({
      name: session.user.name,
      email: session.user.email,
      timezone: 'America/Los_Angeles',
    });

    if (result.success) {
      dbUser = await fetchUserByEmail(session.user.email);
    } else {
      return <div>{result.message}</div>;
    }
  }

  const habits = await fetchHabits(dbUser.uuid);
  const tags = await fetchTags(dbUser.uuid);

  const newHabits = habits.map((habit) => ({ ...habit }));

  let totalExpected = 0;
  let totalCompleted = 0;

  function calculateExpectedDays(habit) {
    const startDate = new Date(habit.date_started);
    const endDate = new Date();
    let expectedDays = 0;

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      console.log('ran calculate expected days');
      const dayOfWeek = formatDateToTimeZone(d, dbUser.timezone, {
        weekday: 'long',
      });
      if (habit.days_of_week.includes(dayOfWeek)) {
        expectedDays++;
      }
    }

    return expectedDays;
  }

  function calculateCompletedDays(habit) {
    // Ensure dates_repeated exists and is an array
    if (!habit.dates_repeated || habit.dates_repeated.length === 0) {
      return 0;
    }

    return habit.dates_repeated.filter((date) => {
      console.log('ran calculate completed days');
      const completedDate = formatDateToTimeZone(date.date, dbUser.timezone);
      const dayOfWeek = formatDateToTimeZone(completedDate, dbUser.timezone, {
        weekday: 'long',
      });
      return habit.days_of_week.includes(dayOfWeek);
    }).length;
  }

  const habitCompletionRates = habits.map((habit) => {
    const expectedDays = calculateExpectedDays(habit);
    const completedDays = calculateCompletedDays(habit);
    totalExpected += expectedDays;
    totalCompleted += completedDays;
    const completionRate =
      expectedDays > 0 ? (completedDays / expectedDays) * 100 : 0;

    return {
      habit_uuid: habit.uuid,
      completionRate: completionRate.toFixed(2),
    };
  });

  const cumulativeCompletionRate =
    totalExpected > 0 ? (totalCompleted / totalExpected) * 100 : 0;

  return (
    <main>
      <AllHabitsContent
        key={JSON.stringify(newHabits)}
        user={dbUser}
        habits={newHabits}
        tags={tags}
        completionRates={habitCompletionRates}
        cumulativeCompletionRate={cumulativeCompletionRate}
      />
      <ToastShelf />
    </main>
  );
}
