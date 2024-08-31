import React from 'react';
import {
  fetchUserByEmail,
  fetchHabits,
  fetchTags,
  createUser,
} from '@/app/lib/data';
import { getSession } from '@auth0/nextjs-auth0';
import ProfileContent from '@/components/ProfileContent';
import ToastShelf from '@/components/ToastShelf';

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
  console.log(newHabits);
  return (
    <main>
      <ProfileContent
        key={JSON.stringify(newHabits)}
        user={dbUser}
        habits={newHabits}
        tags={tags}
      />
      <ToastShelf />
    </main>
  );
}
