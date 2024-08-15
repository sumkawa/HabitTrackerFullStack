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
