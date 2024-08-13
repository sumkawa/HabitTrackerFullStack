import React from 'react';
import styles from './page.module.css';
// import { readFile, writeFile } from '../../../helpers/file-helpers';
// import * as Avatar from '@radix-ui/react-avatar';
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import HabitCard from '@/components/HabitCard';
import HabitPopover from '@/components/HabitPopover';

// const DATABASE_PATH = '/src/database.json';

export default function Profile({ params }) {
  const data = [
    {
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      password: 'password123',
      email: 'john.doe@example.com',
      name: 'John Doe',
      username: 'johnnyD',
      tagsList: [
        { tagName: 'Fitness', tagColor: '#FF5733' },
        { tagName: 'Learning', tagColor: '#337AFF' },
      ],
      habits: [
        {
          name: 'Morning Exercise',
          streak: 10,
          dateStarted: '2024-07-01',
          lastDayLogged: '2024-07-10',
          behavior: 'Jogging for 30 minutes',
          time: '6:00 AM',
          location: 'Neighborhood park',
          tagName: 'Fitness',
          identity: 'An active person',
          daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datesRepeated: [
            { date: '2024-07-01', count: 1 },
            { date: '2024-07-02', count: 1 },
            { date: '2024-07-03', count: 1 },
            { date: '2024-07-04', count: 1 },
            { date: '2024-07-05', count: 1 },
            { date: '2024-07-06', count: 1 },
            { date: '2024-07-07', count: 1 },
            { date: '2024-07-08', count: 1 },
            { date: '2024-07-09', count: 1 },
            { date: '2024-07-10', count: 1 },
          ],
        },
        {
          name: 'Reading',
          streak: 5,
          dateStarted: '2024-07-05',
          lastDayLogged: '2024-07-10',
          behavior: 'Reading 20 pages of a book',
          time: '8:00 PM',
          location: 'Living room',
          tagName: 'Learning',
          identity: 'A knowledgeable person',
          daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat'],
          datesRepeated: [
            { date: '2024-07-05', count: 1 },
            { date: '2024-07-06', count: 1 },
            { date: '2024-07-07', count: 1 },
            { date: '2024-07-08', count: 1 },
            { date: '2024-07-10', count: 1 },
          ],
        },
      ],
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174001',
      password: 'securePass456',
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      username: 'janeS',
      tagsList: [
        { tagName: 'Wellness', tagColor: '#FFD700' },
        { tagName: 'Health', tagColor: '#32CD32' },
      ],
      habits: [
        {
          name: 'Meditation',
          streak: 20,
          description:
            'I will meditate for 15 mins every day to become a more mindful person',
          dateStarted: '2024-05-20',
          lastDayLogged: '2024-07-10',
          behavior: 'meditate',
          time: '7:00 AM',
          location: 'home office',
          tagName: 'Wellness',
          identity: 'A mindful person',
          daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datesRepeated: [
            { date: '2024-06-22', count: 5 },
            { date: '2024-06-23', count: 25 },
            { date: '2024-06-24', count: 3 },
            { date: '2024-06-25', count: 4 },
            { date: '2024-06-26', count: 2 },
            { date: '2024-06-27', count: 7 },
            { date: '2024-06-28', count: 2 },
            { date: '2024-06-29', count: 1 },
            { date: '2024-06-30', count: 1 },
            { date: '2024-07-01', count: 1 },
            { date: '2024-07-02', count: 1 },
            { date: '2024-07-03', count: 1 },
            { date: '2024-07-04', count: 1 },
            { date: '2024-07-05', count: 1 },
            { date: '2024-07-06', count: 1 },
            { date: '2024-07-07', count: 1 },
            { date: '2024-07-08', count: 1 },
            { date: '2024-07-09', count: 1 },
            { date: '2024-07-10', count: 1 },
          ],
        },
        {
          name: 'Water Intake',
          streak: 15,
          dateStarted: '2024-06-25',
          lastDayLogged: '2024-07-10',
          behavior: 'drink 8 glasses of water',
          time: 'various times in the day',
          location: 'various locations',
          tagName: 'Health',
          identity: 'A hydrated person',
          daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datesRepeated: [
            { date: '2024-06-25', count: 1 },
            { date: '2024-06-26', count: 1 },
            { date: '2024-06-27', count: 1 },
            { date: '2024-06-28', count: 1 },
            { date: '2024-06-29', count: 1 },
            { date: '2024-06-30', count: 1 },
            { date: '2024-07-01', count: 1 },
            { date: '2024-07-02', count: 1 },
            { date: '2024-07-03', count: 1 },
            { date: '2024-07-04', count: 1 },
            { date: '2024-07-05', count: 1 },
            { date: '2024-07-06', count: 1 },
            { date: '2024-07-07', count: 1 },
            { date: '2024-07-08', count: 1 },
            { date: '2024-07-09', count: 1 },
            { date: '2024-07-10', count: 1 },
          ],
        },
      ],
    },
  ];

  const user = data.find((object) => object.uuid === params.uuid);
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <div className={styles.habitsHeader}>
          <p>Welcome back, </p>
          <h1 className={styles.span}>{user.name}</h1>
        </div>
        <div className={styles.habitsContainer}>
          <span className={styles.habitsContainerHeroText}>My Habits</span>
          <div>
            {user.habits.map((habit, index) => (
              <HabitCard
                key={`${habit}-${index}`}
                habitObject={habit}
                tagsList={user.tagsList}
              />
            ))}
          </div>
          <span className='add-habit'>
            <HabitPopover />
          </span>
        </div>
      </section>
      {/* <aside className={styles.sidebar}>
        <div className={styles.profilePic}>
          <Avatar.Root className={styles.AvatarRoot}>
            <Avatar.Image
              className={styles.AvatarImage}
              src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
              alt='Colm Tuite'
            />
            <Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
              JS
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
        <NavigationMenu.Root className={styles.NavigationMenuRoot}>
          <NavigationMenu.List className={styles.NavigationMenuList}>
            <NavigationMenu.Item className={styles.NavigationMenuItem}>
              <NavigationMenu.Link className={styles.NavigationMenuLink}>
                TEST
              </NavigationMenu.Link>
              <NavigationMenu.Link className={styles.NavigationMenuLink}>
                TEST
              </NavigationMenu.Link>
              <NavigationMenu.Link className={styles.NavigationMenuLink}>
                TEST
              </NavigationMenu.Link>
              <NavigationMenu.Link className={styles.NavigationMenuLink}>
                TEST
              </NavigationMenu.Link>
              <NavigationMenu.Link className={styles.NavigationMenuLink}>
                TEST
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </aside> */}
    </main>
  );
}
