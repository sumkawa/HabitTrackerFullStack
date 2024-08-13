import React from 'react';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import './styles.css';

function HabitCreationSummary({
  habitTitle,
  behavior,
  time,
  location,
  handleSubmit,
  scrollLast,
  setIsAm,
}) {
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
    <div className='box five'>
      <h1 className='animate-character-second'>{habitTitle}</h1>
      <h2 className='secondary-text'>How's it look?</h2>
      <div className='input-paragraph'>
        <div>
          I will <span className='behavior-text'>{behavior}</span> at{' '}
          <span className='time-text'>
            {`${convertTwentyFourToString(time, setIsAm)} ${isAmOrPm(time)}`}
          </span>{' '}
          in <span className='location-text'>{location}</span>
        </div>
      </div>
      <h3 className='submit-button-container'>
        <form onSubmit={handleSubmit}>
          <input
            className='button-submission'
            value='Looks Good!'
            type='submit'
          />
        </form>
      </h3>
      <div className='footer'>
        <button className='button' onClick={scrollLast}>
          <ArrowLeftIcon className='icon' width='35' height='35' />
        </button>
      </div>
    </div>
  );
}

export default HabitCreationSummary;
