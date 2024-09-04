'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

const CreateHabitSchema = z.object({
  user_uuid: z.string().uuid(),
  name: z.string().min(1),
  behavior: z.string().min(1),
  time: z.string().optional(),
  location: z.string().optional(),
  tag_name: z.string().min(1),
  identity: z.string().optional(),
  days_of_week: z.array(z.string().min(1)),
  dates_repeated: z.string(),
});

export async function createHabit(formData) {
  const habitData = CreateHabitSchema.parse({
    user_uuid: formData.get('user_uuid'),
    name: formData.get('name'),
    behavior: formData.get('behavior'),
    time: formData.get('time'),
    location: formData.get('location'),
    tag_name: formData.get('tag_name'),
    identity: formData.get('identity'),
    days_of_week: formData.getAll('days_of_week'),
    dates_repeated: formData.get('dates_repeated'),
  });

  try {
    await sql`
    INSERT INTO habits (
      uuid, user_uuid, name, streak, date_started, last_day_logged, behavior, time, location, tag_name, identity, days_of_week, dates_repeated, longest_streak
    ) VALUES (
      gen_random_uuid(), ${habitData.user_uuid}, ${habitData.name}, 0, CURRENT_DATE, NULL,
      ${habitData.behavior}, ${habitData.time}, ${habitData.location}, ${habitData.tag_name}, ${habitData.identity}, ${habitData.days_of_week},
      ${habitData.dates_repeated}, 0
    )
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/habits');
}

const AddFriendSchema = z.object({
  user_uuid: z.string().uuid(),
  friend_email: z.string().email(),
});

export async function sendFriendRequest(formData) {
  const friendData = AddFriendSchema.parse({
    user_uuid: formData.get('user_uuid'), // UUID of User A
    friend_email: formData.get('friend_email'), // Email of User B
  });

  // Find the friend by email
  const friendResult = await sql`
    SELECT uuid, friend_requests, incoming_friend_requests, friends FROM users WHERE email = ${friendData.friend_email} LIMIT 1
  `;

  if (friendResult.rows.length === 0) {
    throw new Error('User not found');
  }

  const friend = friendResult.rows[0];
  console.log('Friend: ', friend);
  if (
    friend.incoming_friend_requests.includes(friendData.user_uuid) ||
    friend.friends.includes(friendData.user_uuid)
  ) {
    return {
      message: 'Friend request already sent, or already friends.',
      type: 'warning',
    };
  }
  // Add User A's UUID to User B's incoming_friend_requests
  let incomingFriendRequests = friend.incoming_friend_requests || [];
  incomingFriendRequests.push(friendData.user_uuid);

  await sql`
    UPDATE users SET incoming_friend_requests = ${JSON.stringify(
      incomingFriendRequests
    )}::jsonb WHERE uuid = ${friend.uuid}
  `;

  // Add User B's UUID to User A's friend_requests
  const userResult = await sql`
    SELECT friend_requests FROM users WHERE uuid = ${friendData.user_uuid} LIMIT 1
  `;
  const user = userResult.rows[0];

  let friendRequests = user.friend_requests || [];
  friendRequests.push(friend.uuid);

  await sql`
    UPDATE users SET friend_requests = ${JSON.stringify(
      friendRequests
    )}::jsonb WHERE uuid = ${friendData.user_uuid}
  `;

  return { message: 'Friend request sent successfully' };
}

const ManageFriendRequestSchema = z.object({
  user_uuid: z.string().uuid(),
  friend_uuid: z.string().uuid(),
});

export async function acceptFriendRequest(formData) {
  console.log(
    'Form Data:',
    formData.get('user_uuid'),
    formData.get('friend_uuid')
  );

  const friendData = ManageFriendRequestSchema.parse({
    user_uuid: formData.get('user_uuid'),
    friend_uuid: formData.get('friend_uuid'),
  });
  const [userResult, friendResult] = await Promise.all([
    sql`SELECT incoming_friend_requests, friends FROM users WHERE uuid = ${friendData.user_uuid} LIMIT 1`,
    sql`SELECT friend_requests, friends FROM users WHERE uuid = ${friendData.friend_uuid} LIMIT 1`,
  ]);

  const user = userResult.rows[0];
  const friend = friendResult.rows[0];

  // Remove the friend_uuid from user_uuid's incoming_friend_requests
  let incomingFriendRequests = user.incoming_friend_requests || [];
  incomingFriendRequests = incomingFriendRequests.filter(
    (uuid) => uuid !== friendData.friend_uuid
  );

  // Add friend_uuid to user_uuid's friends list
  let userFriends = user.friends || [];
  userFriends.push(friendData.friend_uuid);

  // Update user_uuid's data
  await sql`
    UPDATE users SET
      incoming_friend_requests = ${JSON.stringify(
        incomingFriendRequests
      )}::jsonb,
      friends = ${JSON.stringify(userFriends)}::jsonb
    WHERE uuid = ${friendData.user_uuid}
  `;

  // Remove user_uuid from friend_uuid's friend_requests
  let friendRequests = friend.friend_requests || [];
  friendRequests = friendRequests.filter(
    (uuid) => uuid !== friendData.user_uuid
  );

  // Add user_uuid to friend_uuid's friends list
  let friendFriends = friend.friends || [];
  friendFriends.push(friendData.user_uuid);

  // Update friend_uuid's data
  await sql`
    UPDATE users SET
      friend_requests = ${JSON.stringify(friendRequests)}::jsonb,
      friends = ${JSON.stringify(friendFriends)}::jsonb
    WHERE uuid = ${friendData.friend_uuid}
  `;

  return { message: 'Friend request accepted successfully' };
}

export async function rejectFriendRequest(formData) {
  const friendData = ManageFriendRequestSchema.parse({
    user_uuid: formData.get('user_uuid'),
    friend_uuid: formData.get('friend_uuid'),
  });

  // Remove the friend_uuid from user_uuid's incoming_friend_requests
  const { rows } = await sql`
    SELECT incoming_friend_requests FROM users WHERE uuid = ${friendData.user_uuid} LIMIT 1
  `;

  let incomingFriendRequests = rows[0].incoming_friend_requests || [];
  incomingFriendRequests = incomingFriendRequests.filter(
    (uuid) => uuid !== friendData.friend_uuid
  );

  await sql`
    UPDATE users SET
      incoming_friend_requests = ${JSON.stringify(
        incomingFriendRequests
      )}::jsonb
    WHERE uuid = ${friendData.user_uuid}
  `;

  return { message: 'Friend request rejected successfully' };
}

export async function fetchFriendsDetails(friendUuids) {
  const friendsDetails = [];

  for (const uuid of friendUuids) {
    const result = await sql`
      SELECT email, completed_today, uuid
      FROM users
      WHERE uuid = ${uuid}
      LIMIT 1
    `;

    if (result.rows.length > 0) {
      const friend = result.rows[0];
      friendsDetails.push({
        uuid: friend.uuid,
        email: friend.email,
        completed_today: friend.completed_today || {},
      });
    }
  }

  return friendsDetails;
}

const LogHabitSchema = z.object({
  habit_uuid: z.string().uuid(),
  user_uuid: z.string().uuid(),
  timezone: z.string(),
  today: z.string(),
});

export async function logHabit(formData) {
  console.log('logging habit');
  // throw new Error('Failed to log habit');
  const habitData = LogHabitSchema.parse({
    habit_uuid: formData.get('habit_uuid'),
    user_uuid: formData.get('user_uuid'),
    timezone: formData.get('timezone'),
    today: formData.get('today'),
  });
  const today = habitData.today;
  const todayTest = new Date().toLocaleDateString('en-CA', {
    timeZone: habitData.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  console.log('DATE FOR LOG HABIT: ', today);
  console.log('Today test: ', todayTest);
  const { rows } = await sql`
    SELECT streak, last_day_logged, dates_repeated, longest_streak
    FROM habits
    WHERE uuid = ${habitData.habit_uuid} AND user_uuid = ${habitData.user_uuid}
    LIMIT 1
  `;

  if (rows.length === 0) {
    throw new Error(`Habit not found for UUID ${habitData.habit_uuid}`);
  }

  const habit = rows[0];
  console.log('habit: ', habit);
  const newStreak =
    habit.last_day_logged === today ? habit.streak : habit.streak + 1;
  const updatedDatesRepeated = [
    ...habit.dates_repeated,
    { date: today, count: 1 },
  ];
  const updatedLongestStreak = Math.max(newStreak, habit.longest_streak);
  const updatedDatesRepeatedJson = JSON.stringify(updatedDatesRepeated);

  const userResult = await sql`
      SELECT
        uuid,
        name,
        email,
        timezone,
        completed_today,
        friends
      FROM users
      WHERE uuid = ${habitData.user_uuid}
      LIMIT 1
    `;
  const user = userResult.rows[0];
  let completedToday = user.completed_today;

  if (!completedToday) {
    completedToday = { [today]: 1 };
  } else {
    completedToday = completedToday;

    if (completedToday[today]) {
      completedToday[today] += 1;
    } else {
      completedToday[today] = 1;
    }
  }
  const completedTodayJson = JSON.stringify(completedToday);

  try {
    await sql`
      UPDATE users
      SET
        completed_today = ${completedTodayJson}::jsonb
      WHERE uuid = ${habitData.user_uuid}
    `;

    await sql`
    UPDATE habits
    SET
      streak = ${newStreak},
      last_day_logged = ${today},
      dates_repeated = ${updatedDatesRepeatedJson}::jsonb,
      longest_streak = ${updatedLongestStreak}
    WHERE uuid = ${habitData.habit_uuid} AND user_uuid = ${habitData.user_uuid}
  `;
  } catch (error) {
    return { message: 'Database Error: Failed to log habit.' };
  }

  revalidatePath('/dashboard/habits/profile');
}

const UndoLogHabitSchema = z.object({
  habit_uuid: z.string().uuid(),
  user_uuid: z.string().uuid(),
});

export async function undoLogHabit(formData) {
  console.log('undoing log habit');
  const habitData = UndoLogHabitSchema.parse({
    habit_uuid: formData.get('habit_uuid'),
    user_uuid: formData.get('user_uuid'),
  });
  const today = new Date().toLocaleDateString('en-CA', {
    timeZone: habitData.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const { rows } = await sql`
    SELECT streak, dates_repeated
    FROM habits
    WHERE uuid = ${habitData.habit_uuid} AND user_uuid = ${habitData.user_uuid}
    LIMIT 1
  `;

  if (rows.length === 0) {
    throw new Error(`Habit not found for UUID ${habitData.habit_uuid}`);
  }

  const habit = rows[0];

  const updatedDatesRepeated = habit.dates_repeated.slice(0, -1);
  const newStreak = habit.streak > 0 ? habit.streak - 1 : 0;
  const lastDayLogged =
    updatedDatesRepeated.length > 0
      ? updatedDatesRepeated[updatedDatesRepeated.length - 1].date
      : null;

  const updatedDatesRepeatedJson = JSON.stringify(updatedDatesRepeated);

  const userResult = await sql`
      SELECT
        uuid,
        name,
        email,
        timezone,
        completed_today,
        friends
      FROM users
      WHERE uuid = ${habitData.user_uuid}
      LIMIT 1
    `;
  const user = userResult.rows[0];

  let completedToday = user.completed_today;
  if (!completedToday) {
    // Initialize completed_today if null
    completedToday = { [today]: 1 };
  } else {
    completedToday[today] -= 1;
  }
  const completedTodayJson = JSON.stringify(completedToday);
  try {
    await sql`
      UPDATE users
      SET
        completed_today = ${completedTodayJson}::jsonb
      WHERE uuid = ${habitData.user_uuid}
    `;
    await sql`
      UPDATE habits
      SET
        streak = ${newStreak},
        last_day_logged = ${lastDayLogged},
        dates_repeated = ${updatedDatesRepeatedJson}::jsonb
      WHERE uuid = ${habitData.habit_uuid} AND user_uuid = ${habitData.user_uuid}
    `;
  } catch (error) {
    throw new Error('Failed to undo habit log');
  }

  revalidatePath('/dashboard/habits/profile');
}

const UpdateHabitSchema = z.object({
  habit_uuid: z.string().uuid(),
  user_uuid: z.string().uuid(),
  name: z.string().min(1),
  behavior: z.string().min(1),
  time: z.string().optional(),
  location: z.string().optional(),
  tag_name: z.string().min(1),
  identity: z.string().optional(),
  days_of_week: z.array(z.string().min(1)),
});

export async function updateHabit(formData) {
  // Parse and validate form data

  const habitData = UpdateHabitSchema.parse({
    habit_uuid: formData.get('habit_uuid'),
    user_uuid: formData.get('user_uuid'),
    name: formData.get('name'),
    behavior: formData.get('behavior'),
    time: formData.get('time'),
    location: formData.get('location'),
    tag_name: formData.get('tag_name'),
    identity: formData.get('identity'),
    days_of_week: formData.getAll('days_of_week'),
  });
  try {
    await sql`
      UPDATE habits
      SET
        name = ${habitData.name},
        behavior = ${habitData.behavior},
        time = ${habitData.time},
        location = ${habitData.location},
        tag_name = ${habitData.tag_name},
        identity = ${habitData.identity},
        days_of_week = ${habitData.days_of_week}
      WHERE
        uuid = ${habitData.habit_uuid} AND user_uuid = ${habitData.user_uuid}
    `;
  } catch (error) {
    throw new Error(error);
  }
  console.log('revalidating...');
  revalidatePath('/habits/profile');
}

export async function deleteHabit(habitUuid, userUuid) {
  try {
    await sql`
      DELETE FROM habits
      WHERE uuid = ${habitUuid} AND user_uuid = ${userUuid}
    `;
  } catch (error) {
    throw new Error('Failed to delete habit');
  }
  revalidatePath('/habits/profile');
}
