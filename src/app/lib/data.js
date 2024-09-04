import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export async function fetchHabits(userId) {
  console.log('RAN FETCH HABITS');
  try {
    const data = await sql`
      SELECT
        uuid,
        name,
        streak,
        date_started,
        last_day_logged,
        behavior,
        time,
        location,
        tag_name,
        identity,
        days_of_week,
        dates_repeated::TEXT AS dates_repeated,
        longest_streak
      FROM habits
      WHERE user_uuid = ${userId}
      ORDER BY date_started DESC
    `;
    const habits = [];

    for (let habit of data.rows) {
      const normalizeToStartOfDay = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
      };

      const lastDayLogged = normalizeToStartOfDay(habit.last_day_logged);
      const currentDate = normalizeToStartOfDay(new Date());
      const timeDifference = currentDate - lastDayLogged;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      if (daysDifference > 2) {
        habit.streak = 0;
        await sql`
          UPDATE habits
          SET streak = ${habit.streak}
          WHERE uuid = ${habit.uuid} AND user_uuid = ${userId}
        `;
      }

      // Convert dates_repeated back to JSON
      habit.dates_repeated = JSON.parse(habit.dates_repeated);
      habits.push(habit);
    }

    return habits;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch habits.');
  }
}

export async function createHabit(habit) {
  try {
    await sql`
      INSERT INTO habits (
        uuid, user_uuid, name, streak, date_started, last_day_logged, behavior, time, location, tag_name, identity, days_of_week, dates_repeated, longest_streak
      ) VALUES (
        ${habit.uuid}, ${habit.user_uuid}, ${habit.name}, ${habit.streak}, ${
      habit.date_started
    }, ${habit.last_day_logged},
        ${habit.behavior}, ${habit.time}, ${habit.location}, ${
      habit.tag_name
    }, ${habit.identity}, ${habit.days_of_week},
        ${sql.json(habit.dates_repeated)}, ${habit.longest_streak ?? 0}
      )
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create habit.');
  }
}

export async function fetchUserByEmail(email) {
  try {
    const { rows } = await sql`
      SELECT
        uuid,
        name,
        email,
        timezone,
        completed_today,
        friends,
        incoming_friend_requests,
        friend_requests
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    return rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function createUser(user) {
  try {
    // Check if the email already exists
    const { rows } = await sql`
      SELECT email FROM users WHERE email = ${user.email} LIMIT 1
    `;

    if (rows.length > 0) {
      console.log('User with this email already exists.');
      return { success: false, message: 'User already exists' };
    }

    const userId = uuidv4();

    // Create the user with initialized `completed_today`, `friends`, `friend_requests`,
    // and `incoming_friend_requests` as empty JSON arrays
    await sql`
      INSERT INTO users (uuid, name, email, timezone, completed_today, friends, friend_requests, incoming_friend_requests)
      VALUES (
        ${userId}, ${user.name}, ${user.email}, ${user.timezone},
        '{}'::jsonb,   -- Initialize completed_today as an empty JSON object
        '[]'::jsonb,   -- Initialize friends as an empty JSON array
        '[]'::jsonb,   -- Initialize friend_requests as an empty JSON array
        '[]'::jsonb    -- Initialize incoming_friend_requests as an empty JSON array
      )
    `;

    return { success: true, uuid: userId };
  } catch (error) {
    console.error('Database Error:', error.message, error.stack);
    throw new Error('Failed to create user.');
  }
}

export async function fetchTags(userId) {
  try {
    const data = await sql`
      SELECT
        id,
        tag_name,
        tag_color
      FROM tags
      WHERE user_uuid = ${userId}
      ORDER BY tag_name ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tags.');
  }
}
