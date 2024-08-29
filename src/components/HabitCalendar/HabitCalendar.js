import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import './styles.css';

const generateDateArray = (start, end) => {
  const dates = [];
  let currentDate = new Date(start);
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const processValues = (startDate, endDate, values) => {
  const dateArray = generateDateArray(startDate, endDate);
  const valueMap = new Map(values.map((v) => [v.date, v]));

  return dateArray.map((date) => {
    const dateString = date.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'
    return valueMap.get(dateString) || { date: dateString, count: 0 };
  });
};

const HabitCalendar = ({ values }) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 3);

  const processedValues = processValues(startDate, today, values);
  return (
    <div className='CalendarContainer'>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={processedValues}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value) {
            return 'color-github-0';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': value.date ? `${value.date}` : '',
          };
        }}
      />
      <ReactTooltip />
    </div>
  );
};

export default HabitCalendar;
