'use client';
import React from 'react';

function WeekDayPicker() {
  const VALID_WEEKDAYS = {
    sunday: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  };
  const [weekdays, setWeekdays] = React.useState(VALID_WEEKDAYS);
  const weekdaysList = Object.keys(VALID_WEEKDAYS);
  return (
    <>
      {weekdaysList.map((option) => (
        <div key={option}>
          <input
            type='checkbox'
            id={option}
            value={option}
            checked={weekdays[option] === true}
            onChange={(event) => {
              setWeekdays({
                ...weekdays,
                [option]: event.target.checked,
              });
            }}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </>
  );
}

export default WeekDayPicker;
