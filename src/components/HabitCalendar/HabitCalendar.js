'use client';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactToolTip from 'react-tooltip';
import './styles.css';

const HabitCalendar = ({ values }) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 3);
  return (
    <div className='CalendarContainer'>
      <CalendarHeatmap
        startDate={startDate}
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
