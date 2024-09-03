'use client';
import React, { useEffect, useState, useCallback } from 'react';
import HabitPopover from '../HabitPopover';
import Dashboard from '../Dashboard';
import './styles.css';

export const HabitContext = React.createContext();

function HabitsProvider({ habits, tags, user, completionRates, isAll }) {
  const [checked, setChecked] = useState(() => {
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

    console.log('Initializing checked state:', initialCheckBoxes);
    return initialCheckBoxes;
  });

  // Logging for renders
  useEffect(() => {
    console.log('HabitsProvider re-rendered');
    console.log('Current checked state:', checked);
  });

  // Optional: You might want to log when habits or user data changes
  useEffect(() => {
    console.log('Habits data changed:', habits);
    console.log('User data:', user);
  }, [habits, user]);

  // Function to update the checked state and log the change
  const updateChecked = useCallback(
    (newState) => {
      console.log('Updating checked state:', newState);
      setChecked(newState);
    },
    [setChecked]
  );

  return (
    <HabitContext.Provider
      value={{
        habits,
        tags,
        user,
        checked,
        setChecked: updateChecked,
        completionRates,
      }}
    >
      <div className='habitsContainer'>
        <span className='add-habit'>
          <HabitPopover />
        </span>
        <Dashboard isAll={isAll} />
      </div>
    </HabitContext.Provider>
  );
}

export default HabitsProvider;
