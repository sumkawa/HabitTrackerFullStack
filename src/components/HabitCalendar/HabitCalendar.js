'use client';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactToolTip from 'react-tooltip';
import './styles.css';

const HabitCalendar = ({ values, startDate }) => {
  const today = new Date();
  return (
    <div className='CalendarContainer'>
      <CalendarHeatmap
        startDate={new Date(startDate)}
        endDate={today}
        values={values}
        showWeekdayLabels={true}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': 'HELLO WORLD',
          };
        }}
      />
    </div>
  );
};

export default HabitCalendar;
