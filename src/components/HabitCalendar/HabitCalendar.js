import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import './styles.css';

const generateDateArray = (start, end) => {
  const dates = [];
  let currentDate = new Date(start);
  while (currentDate < end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const processValues = (
  startDate,
  endDate,
  values,
  daysOfWeek,
  userTimeZone
) => {
  const dateArray = generateDateArray(startDate, endDate);
  const valueMap = new Map(values.map((v) => [v.date, v]));
  return dateArray
    .map((date) => {
      const dateString = new Intl.DateTimeFormat('en-CA', {
        timeZone: userTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);

      const dayOfWeek = new Intl.DateTimeFormat('en-US', {
        timeZone: userTimeZone,
        weekday: 'long',
      }).format(date);

      if (valueMap.has(dateString)) {
        return valueMap.get(dateString);
      } else if (
        daysOfWeek
          .map((day) => day.toLowerCase())
          .includes(dayOfWeek.toLowerCase())
      ) {
        return { date: dateString, count: 2 };
      } else {
        return { date: dateString, count: 0 };
      }
    })
    .filter((value) => value !== null && value !== undefined);
};

const HabitCalendar = ({ values, daysOfWeek, user }) => {
  const today = new Date();

  const startDate = new Date(today);
  startDate.setMonth(today.getMonth() - 3);
  startDate.setHours(0, 0, 0, 0);

  const processedValues = processValues(
    startDate,
    today,
    values,
    daysOfWeek,
    user.timezone
  );

  // Get the first and last dates from processedValues
  const firstProcessedDate = new Date(processedValues[0]?.date || startDate);
  const lastProcessedDate = new Date(
    processedValues[processedValues.length - 1]?.date || today
  );

  return (
    <div className='CalendarContainer'>
      <CalendarHeatmap
        startDate={startDate}
        endDate={lastProcessedDate} // Use the last processed date
        values={processedValues}
        classForValue={(value) => {
          if (!value) {
            return 'color-github-0';
          }
          if (value.count === 1) {
            return 'color-github-1';
          }
          if (value.count === 2) {
            return 'color-missed';
          }
          return 'color-github-0';
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
