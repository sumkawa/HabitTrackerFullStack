import React from "react";
import {
  fetchUserByEmail,
  fetchHabits,
  fetchTags,
  createUser,
  fetchFriendsDetails,
} from "@/app/lib/data";
import { getSession } from "@auth0/nextjs-auth0";
import ProfileContent from "@/components/ProfileContent";
import ToastShelf from "@/components/ToastShelf";
import { formatDateToTimeZone } from "../../../helpers/dateUtils";

export default async function Profile() {
  const session = await getSession();

  if (!session?.user) {
    return <div>Unauthorized. Please log in.</div>;
  }

  let dbUser = await fetchUserByEmail(session.user.email);

  if (!dbUser) {
    const result = await createUser({
      name: session.user.name,
      email: session.user.email,
      timezone: "America/Los_Angeles",
    });

    if (result.success) {
      dbUser = await fetchUserByEmail(session.user.email);
    } else {
      return <div>{result.message}</div>;
    }
  }

  const habits = await fetchHabits(dbUser.uuid);
  const tags = await fetchTags(dbUser.uuid);
  const friendDetails = await fetchFriendsDetails(dbUser.friends);
  const newHabits = habits.map((habit) => ({ ...habit }));

  let totalExpected = 0;
  let totalCompleted = 0;

  function calculateExpectedDays(habit) {
    const startDate = new Date(habit.date_started);
    const endDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    let expectedDays = 0;

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = formatDateToTimeZone(d, dbUser.timezone, {
        weekday: "long",
      });

      if (habit.days_of_week.includes(dayOfWeek)) {
        expectedDays++;
      }
    }

    return expectedDays;
  }

  function calculateCompletedDays(habit) {
    if (!habit.dates_repeated || habit.dates_repeated.length === 0) {
      return 0;
    }

    return habit.dates_repeated.filter((date) => {
      const completedDate = formatDateToTimeZone(date.date, dbUser.timezone);
      const dayOfWeek = formatDateToTimeZone(completedDate, dbUser.timezone, {
        weekday: "long",
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
      <ProfileContent
        key={JSON.stringify(newHabits)}
        user={dbUser}
        habits={newHabits}
        tags={tags}
        completionRates={habitCompletionRates}
        cumulativeCompletionRate={cumulativeCompletionRate}
        friendDetails={friendDetails}
      />
      <ToastShelf />
    </main>
  );
}
