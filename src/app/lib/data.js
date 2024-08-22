import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export async function fetchHabits(userId) {
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
            dates_repeated::TEXT AS dates_repeated
          FROM habits
          WHERE user_uuid = ${userId}
          ORDER BY date_started DESC
        `;

    // Convert dates_repeated back to JSON
    const habits = data.rows.map((habit) => ({
      ...habit,
      dates_repeated: JSON.parse(habit.dates_repeated),
    }));

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
        uuid, user_uuid, name, streak, date_started, last_day_logged, behavior, time, location, tag_name, identity, days_of_week, dates_repeated
      ) VALUES (
        ${habit.uuid}, ${habit.user_uuid}, ${habit.name}, ${habit.streak}, ${
      habit.date_started
    }, ${habit.last_day_logged},
        ${habit.behavior}, ${habit.time}, ${habit.location}, ${
      habit.tag_name
    }, ${habit.identity}, ${habit.days_of_week},
        ${sql.json(habit.dates_repeated)}
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
        timezone
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
    // Check if a user with the same email already exists
    const { rows } = await sql`
      SELECT email FROM users WHERE email = ${user.email} LIMIT 1
    `;

    if (rows.length > 0) {
      console.log('User with this email already exists.');
      return { success: false, message: 'User already exists' };
    }

    // Proceed with user creation if the email is unique
    const userId = uuidv4();
    await sql`
      INSERT INTO users (uuid, name, email, timezone)
      VALUES (
        ${userId}, ${user.name}, ${user.email}, ${user.timezone}
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
