'use client';
import React from 'react';
import './styles.css';
import HabitCard from '../HabitCard';
import HabitPopover from '../HabitPopover';

export const HabitContext = React.createContext();

function HabitsProvider({ habits, tags, params }) {
  const initialCheckBoxes = {};
  habits.map((habit) => {
    initialCheckBoxes[habit.uuid] = false;
  });
  const [checked, setChecked] = React.useState(initialCheckBoxes);
  return (
    <HabitContext.Provider value={{ habits, tags, params }}>
      <div className='habitsContainer'>
        <span className='habitsContainerHeroText'>My Habits</span>
        <div>
          {habits.map((habit, index) => (
            <HabitCard
              key={`${habit}-${index}`}
              habitObject={habit}
              checked={checked}
              setChecked={setChecked}
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
