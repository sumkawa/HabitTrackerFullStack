'use client';
import React from 'react';
import HabitPopover from '../HabitPopover';
import Dashboard from '../Dashboard';

import './styles.css';

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
    <HabitContext.Provider value={{ habits, tags, user, checked, setChecked }}>
      <div className='habitsContainer'>
        <span className='add-habit'>
          <HabitPopover />
        </span>
        <Dashboard />
      </div>
    </HabitContext.Provider>
  );
}

export default HabitsProvider;
