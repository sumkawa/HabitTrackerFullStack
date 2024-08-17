'use client';
import React from 'react';
import './styles.css';
import HabitCard from '../HabitCard';
import HabitPopover from '../HabitPopover';

export const HabitContext = React.createContext();

function HabitsProvider({ habits, tags, params }) {
  const [checked, setChecked] = React.useState({});
  React.useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    const initialCheckBoxes = {};
    habits.forEach((habit) => {
      const habitLastDayLogged = new Date(habit.last_day_logged)
        .toISOString()
        .split('T')[0];
      initialCheckBoxes[habit.uuid] = habitLastDayLogged === today;
    });

    setChecked(initialCheckBoxes);
  }, [habits]);

  return (
    <HabitContext.Provider
      value={{ habits, tags, params, checked, setChecked }}
    >
      <div className='habitsContainer'>
        <span className='habitsContainerHeroText'>My Habits</span>
        <div>
          {habits.map((habit, index) => (
            <HabitCard key={`${habit}-${index}`} habitObject={habit} />
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
