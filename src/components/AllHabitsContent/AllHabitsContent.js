import React from 'react';
import styles from './AllHabitsContent.module.css';
import AllHabitsProvider from '../AllHabitsProvider';

function AllHabitsContent({ user, habits, tags, completionRates }) {
  return (
    <div className={styles.container}>
      <div className={styles.habitsHeader}>
        <h1 className={styles.span}>{user.name}'s Habits</h1>
      </div>
      <section className={styles.content}>
        <div className={styles.contentItem}>
          <AllHabitsProvider
            habits={habits}
            tags={tags}
            user={user}
            completionRates={completionRates}
            isAll
          />
        </div>
      </section>
    </div>
  );
}

export default AllHabitsContent;
