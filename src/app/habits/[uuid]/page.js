import React from 'react';
import styles from './page.module.css';
import { fetchHabits, fetchTags, fetchUser } from '@/app/lib/data';
import HabitsProvider from '@/components/HabitsProvider';
// import * as Avatar from '@radix-ui/react-avatar';
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import HabitCard from '@/components/HabitCard';
import HabitPopover from '@/components/HabitPopover';
import ToastShelf from '@/components/ToastShelf';

export default async function Profile({ params }) {
  const habits = await fetchHabits(params.uuid);
  const tags = await fetchTags(params.uuid);
  const user = await fetchUser(params.uuid);

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <div className={styles.habitsHeader}>
          <p>Welcome back, </p>
          <h1 className={styles.span}>{user.name}</h1>
        </div>
        <HabitsProvider habits={habits} tags={tags} params={params} />
        <ToastShelf />
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
