'use client';
import React from 'react';
import './styles.css';
import HabitCard from '../HabitCard';
import HabitPopover from '../HabitPopover';

export const HabitContext = React.createContext();

function HabitsProvider({ habits, tags, params, user }) {
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
    console.log(initialCheckBoxes);
    return initialCheckBoxes;
  });

  return (
    <HabitContext.Provider
      value={{ habits, tags, params, checked, setChecked }}
    >
      <div className='habitsContainer'>
        <span className='habitsContainerHeroText'>My Habits</span>
        <div>
          {habits.map((habit, index) => (
            <HabitCard
              key={`${habit}-${index}`}
              habitObject={habit}
              user={user}
            />
          ))}
        </div>
        <span className='add-habit'>
          <HabitPopover />
        </span>
      </div>
    </HabitContext.Provider>
  );
}

export default HabitsProvider;
