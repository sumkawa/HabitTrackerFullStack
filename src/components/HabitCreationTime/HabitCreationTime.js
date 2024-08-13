import React from 'react';
import TimePicker from 'react-time-picker';
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import './styles.css';

function HabitCreationTime({
  behavior,
  time,
  setTime,
  weekdays,
  handleWeekdayChange,
  scrollLast,
  scrollNext,
  setIsAm,
}) {
  const weekValues = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  };

  const weekdaysList = Object.keys(weekValues);

  function isAmOrPm(dateString) {
    const hour = Number(dateString.slice(0, 2));
    return hour >= 12 ? 'PM' : 'AM';
  }

  function convertTwentyFourToString(dateString) {
    let hour = Number(dateString.slice(0, 2));
    const minute = dateString.slice(3);

    if (hour >= 12) {
      hour = hour > 12 ? hour - 12 : hour;
    } else {
      hour = hour === 0 ? 12 : hour;
    }

    const stringTime = `${hour}:${minute}`;
    return stringTime;
  }

  return (
    <div className='box three'>
      <h1 className='animate-character-second'>Now let's set up your time.</h1>
      <h2 className='secondary-text'>
        The more specific the time, the more routine the habit becomes.
      </h2>
      <div className='input-paragraph'>
        {time === '' ? (
          <div>
            I will <span className='behavior-text'>{behavior}</span> at [time]
            in [location]
          </div>
        ) : (
          <div>
            I will <span className='behavior-text'>{behavior}</span> at{' '}
            <span className='time-text'>
              {`${convertTwentyFourToString(time, setIsAm)} ${isAmOrPm(time)}`}
            </span>{' '}
            in [location]
          </div>
        )}
      </div>
      <div className='weekday-input-container'>
        <div className='weekDays-selector'>
          {weekdaysList.map((day) => (
            <React.Fragment key={day}>
              <input
                type='checkbox'
                id={`weekday-${day}`}
                className='weekday'
                checked={weekdays[day]}
                onChange={() => handleWeekdayChange(day)}
              />
              <label htmlFor={`weekday-${day}`}>
                {day.charAt(0).toUpperCase()}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='time-input-container'>
        <TimePicker
          onChange={setTime}
          value={time}
          disableClock={true}
          clearIcon={null}
        />
      </div>
      <div className='footer'>
        <button className='button' onClick={scrollLast}>
          <ArrowLeftIcon className='icon' width='35' height='35' />
        </button>
        <button className='button' onClick={scrollNext}>
          <ArrowRightIcon className='icon' width='35' height='35' />
        </button>
      </div>
    </div>
  );
}

export default HabitCreationTime;
