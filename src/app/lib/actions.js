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
  // Parse and validate form data
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

  const lastDayLogged = new Date().toISOString().split('T')[0];
  console.log('user id:', habitData.user_uuid);
  await sql`
    INSERT INTO habits (
      uuid, user_uuid, name, streak, date_started, last_day_logged, behavior, time, location, tag_name, identity, days_of_week, dates_repeated
    ) VALUES (
      gen_random_uuid(), ${habitData.user_uuid}, ${habitData.name}, 0, ${lastDayLogged}, ${lastDayLogged},
      ${habitData.behavior}, ${habitData.time}, ${habitData.location}, ${habitData.tag_name}, ${habitData.identity}, ${habitData.days_of_week},
      ${habitData.dates_repeated}
    )
  `;

  revalidatePath('/dashboard/habits');
}

const LogHabitSchema = z.object({
  habit_uuid: z.string().uuid(),
  user_uuid: z.string().uuid(),
});

export async function logHabit(formData) {
  const habitData = LogHabitSchema.parse({
    habit_uuid: formData.get('habit_uuid'),
    user_uuid: formData.get('user_uuid'),
  });

  const today = new Date().toISOString().split('T')[0];

  const { rows } = await sql`
    SELECT streak, last_day_logged, dates_repeated
    FROM habits
    WHERE uuid = ${habitData.habit_uuid} AND user_uuid = ${habitData.user_uuid}
    LIMIT 1
  `;

  if (rows.length === 0) {
    throw new Error(`Habit not found for UUID ${habitData.habit_uuid}`);
  }

  const habit = rows[0];

  const newStreak =
    habit.last_day_logged === today ? habit.streak : habit.streak + 1;
  const updatedDatesRepeated = [
    ...habit.dates_repeated,
    { date: today, count: 1 },
  ];

  // Convert the updatedDatesRepeated array to a JSON string
  const updatedDatesRepeatedJson = JSON.stringify(updatedDatesRepeated);

  await sql`
    UPDATE habits
    SET
      streak = ${newStreak},
      last_day_logged = ${today},
      dates_repeated = ${updatedDatesRepeatedJson}::jsonb
    WHERE uuid = ${habitData.habit_uuid} AND user_uuid = ${habitData.user_uuid}
  `;

  revalidatePath('/dashboard/habits');
}
