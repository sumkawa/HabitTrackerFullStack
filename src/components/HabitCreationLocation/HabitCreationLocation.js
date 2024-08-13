import React from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import './styles.css';

function HabitCreationLocation({
  location,
  setLocation,
  behavior,
  time,
  scrollLast,
  scrollNext,
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
    <div className='box four'>
      <h1 className='animate-character-second'>Location</h1>
      <h2 className='secondary-text'>
        Habits associated with specific locations are easily remembered.
      </h2>
      <div className='input-paragraph'>
        {location === '' ? (
          <div>
            I will <span className='behavior-text'>{behavior}</span> at{' '}
            <span className='time-text'>
              {`${convertTwentyFourToString(time, setIsAm)} ${isAmOrPm(time)}`}
            </span>{' '}
            in [location]
          </div>
        ) : (
          <div>
            I will <span className='behavior-text'>{behavior}</span> at{' '}
            <span className='time-text'>
              {`${convertTwentyFourToString(time, setIsAm)} ${isAmOrPm(time)}`}
            </span>{' '}
            in <span className='location-text'>{location}</span>
          </div>
        )}
      </div>
      <h3>
        <div className='form__group__paragraph field'>
          <input
            type='input'
            className='form__field__paragraph'
            placeholder='the office'
            name='location'
            id='location'
            spellCheck={false}
            required
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
          <label htmlFor='name' className='form__label__paragraph'>
            Location
          </label>
        </div>
      </h3>

      <div className='footer'>
        <button className='button' onClick={scrollLast}>
          <ArrowLeftIcon className='icon' width='35' height='35' />
        </button>
        <button
          className='button'
          onClick={scrollNext}
          disabled={location === ''}
        >
          <ArrowRightIcon className='icon' width='35' height='35' />
        </button>
      </div>
    </div>
  );
}

export default HabitCreationLocation;
