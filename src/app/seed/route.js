// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';
// import { users, tags, habits } from '../lib/placeholder-data.js';
// import { validate as uuidValidate } from 'uuid';

// const client = await db.connect();

// function isValidUUID(uuid) {
//   return uuidValidate(uuid);
// }

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL,
//       username VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       if (!isValidUUID(user.uuid)) {
//         throw new Error(`Invalid UUID: ${user.uuid}`);
//       }
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (uuid, name, email, password, username)
//         VALUES (${user.uuid}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.username})
//         ON CONFLICT (email) DO NOTHING;
//       `;
//     })
//   );

//   return insertedUsers;
// }

// async function seedTags() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS tags (
//       id SERIAL PRIMARY KEY,
//       user_uuid UUID REFERENCES users(uuid) ON DELETE CASCADE,
//       tag_name VARCHAR(255) NOT NULL,
//       tag_color VARCHAR(7) NOT NULL,
//       UNIQUE(user_uuid, tag_name)
//     );
//   `;

//   const insertedTags = await Promise.all(
//     tags.map((tag) => {
//       if (!isValidUUID(tag.user_uuid)) {
//         throw new Error(`Invalid UUID: ${tag.user_uuid}`);
//       }
//       return client.sql`
//         INSERT INTO tags (user_uuid, tag_name, tag_color)
//         VALUES (${tag.user_uuid}, ${tag.tag_name}, ${tag.tag_color})
//         ON CONFLICT (user_uuid, tag_name) DO NOTHING;
//       `;
//     })
//   );

//   return insertedTags;
// }

// async function seedHabits() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS habits (
//       uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_uuid UUID REFERENCES users(uuid) ON DELETE CASCADE,
//       name VARCHAR(255) NOT NULL,
//       streak INT NOT NULL,
//       date_started DATE NOT NULL,
//       last_day_logged DATE NOT NULL,
//       behavior TEXT NOT NULL,
//       time TIME,
//       location VARCHAR(255),
//       tag_name VARCHAR(255),
//       identity TEXT NOT NULL,
//       days_of_week VARCHAR(255)[] NOT NULL,
//       dates_repeated JSONB NOT NULL
//     );
//   `;

//   const insertedHabits = await Promise.all(
//     habits.map((habit) => {
//       if (!isValidUUID(habit.uuid) || !isValidUUID(habit.user_uuid)) {
//         throw new Error(`Invalid UUID: ${habit.uuid} or ${habit.user_uuid}`);
//       }
//       return client.sql`
//         INSERT INTO habits (
//           uuid, user_uuid, name, streak, date_started, last_day_logged, behavior, time, location, tag_name, identity, days_of_week, dates_repeated
//         ) VALUES (
//           ${habit.uuid}, ${habit.user_uuid}, ${habit.name}, ${habit.streak}, ${
//         habit.date_started
//       },
//           ${habit.last_day_logged}, ${habit.behavior}, ${habit.time}, ${
//         habit.location
//       },
//           ${habit.tag_name}, ${habit.identity}, ${habit.days_of_week},
//           ${JSON.stringify(habit.dates_repeated)}
//         ) ON CONFLICT (uuid) DO NOTHING;
//       `;
//     })
//   );

//   return insertedHabits;
// }

// export async function GET() {
//   try {
//     await client.sql`BEGIN`;
//     await seedUsers();
//     await seedTags();
//     await seedHabits();
//     await client.sql`COMMIT`;

//     return new Response(
//       JSON.stringify({ message: 'Database seeded successfully' }),
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
