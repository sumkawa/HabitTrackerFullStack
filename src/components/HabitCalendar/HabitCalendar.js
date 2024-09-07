import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "./styles.css";

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

  // Normalize the date in values to only include the year-month-day (ignoring time)
  const valueMap = new Map(
    values.map((v) => {
      // Convert each value's date to just the year-month-day format
      const formattedDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: userTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(v.date));
      return [formattedDate, v]; // Use formatted date (without time) as key
    })
  );

  console.log(
    "Value map created with formatted dates (year-month-day): ",
    valueMap
  );

  return dateArray
    .map((date) => {
      const dateString = new Intl.DateTimeFormat("en-CA", {
        timeZone: userTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

      const dayOfWeek = new Intl.DateTimeFormat("en-US", {
        timeZone: userTimeZone,
        weekday: "long",
      }).format(date);

      console.log(`Processing date: ${dateString}, day of week: ${dayOfWeek}`);

      if (valueMap.has(dateString)) {
        console.log(`Found in valueMap: ${valueMap.get(dateString)}`);
        return { date: dateString, count: 1 };
      } else if (
        daysOfWeek
          .map((day) => day.toLowerCase())
          .includes(dayOfWeek.toLowerCase())
      ) {
        console.log(
          `Habit was supposed to be completed on: ${dateString}, marking as missed.`
        );
        return { date: dateString, count: 2 };
      } else {
        console.log(
          `No habit expected or completed on: ${dateString}, marking as not done.`
        );
        return { date: dateString, count: 0 };
      }
    })
    .filter((value) => value !== null && value !== undefined);
};

const HabitCalendar = ({ values, daysOfWeek, user }) => {
  console.log("values: ", values);
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

  const firstProcessedDate = new Date(processedValues[0]?.date || startDate);
  const lastProcessedDate = new Date(
    processedValues[processedValues.length - 1]?.date || today
  );
  console.log("vals: ", processedValues);
  return (
    <div className="CalendarContainer">
      <CalendarHeatmap
        startDate={startDate}
        endDate={lastProcessedDate}
        values={processedValues}
        classForValue={(value) => {
          if (!value) {
            return "color-github-0";
          }
          if (value.count === 1) {
            return "color-github-1";
          }
          if (value.count === 2) {
            return "color-missed";
          }
          return "color-github-0";
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": value.date ? `${value.date}` : "",
          };
        }}
      />
      <ReactTooltip />
    </div>
  );
};

export default HabitCalendar;
