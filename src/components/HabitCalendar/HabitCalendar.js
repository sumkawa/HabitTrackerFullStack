'use client';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './styles.css';

const HabitCalendar = ({ values, startDate }) => {
  const today = new Date();
  console.log(new Date(startDate));
  return (
    <div className='CalendarContainer'>
      <CalendarHeatmap
        startDate={new Date(startDate)}
        endDate={today}
        values={values}
        showWeekdayLabels={true}
        onClick={(value) =>
          alert(`Clicked on value with count: ${value.count}`)
        }
      />
    </div>
  );
};

export default HabitCalendar;
