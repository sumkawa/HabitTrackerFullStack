'use client';
import React from 'react';
import './styles.css';
import HabitCard from '../HabitCard';
import HabitPopover from '../HabitPopover';
import HabitCardPlaceholder from '../HabitCardPlaceholder';

export const HabitContext = React.createContext();

function HabitsProvider({ habits, tags, user }) {
  const [checked, setChecked] = React.useState(() => {
    const getTodayInUserTimezone = (timezone) => {
      const date = new Date().toLocaleString('en-US', { timeZone: timezone });
      const localDate = new Date(date);
      return `${localDate.getFullYear()}-${String(
        localDate.getMonth() + 1
      ).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
    };

    const today = getTodayInUserTimezone(user.timezone);

    const initialCheckBoxes = {};
    habits.forEach((habit) => {
      const habitDate = new Date(habit.last_day_logged);
      const habitLastDayLogged = `${habitDate.getFullYear()}-${String(
        habitDate.getMonth() + 1
      ).padStart(2, '0')}-${String(habitDate.getDate()).padStart(2, '0')}`;

      initialCheckBoxes[habit.uuid] = habitLastDayLogged === today;
    });

    return initialCheckBoxes;
  });

  return (
    <HabitContext.Provider value={{ habits, tags, checked, setChecked }}>
      <div className='habitsContainer'>
        <span className='habitsContainerHeroText'>My Habits</span>
        <div>
          {habits.length === 0 ? (
            <HabitCardPlaceholder />
          ) : (
            habits.map((habit, index) => (
              <HabitCard
                key={`${habit.uuid}-${index}`}
                habitObject={habit}
                user={user}
              />
            ))
          )}
        </div>
        <span className='add-habit'>
          <HabitPopover />
        </span>
      </div>
    </HabitContext.Provider>
  );
}

export default HabitsProvider;
