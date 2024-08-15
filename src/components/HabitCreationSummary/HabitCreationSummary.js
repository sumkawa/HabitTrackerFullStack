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
  identity,
  setIdentity,
  tags,
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
      <h1 className='animate-character-second'>Finally - identity</h1>
      <h2 className='secondary-text'>
        Habits are bricks that build the identity you strive towards.
      </h2>
      <div className='input-paragraph'>
        <div>
          {identity === '' ? (
            <span>
              I will <span className='behavior-text'>{behavior}</span> at{' '}
              <span className='time-text'>
                {`${convertTwentyFourToString(time, setIsAm)} ${isAmOrPm(
                  time
                )}`}
              </span>{' '}
              in <span className='location-text'>{location}</span> to become
              [identity]
            </span>
          ) : (
            <span>
              I will <span className='behavior-text'>{behavior}</span> at{' '}
              <span className='time-text'>
                {`${convertTwentyFourToString(time, setIsAm)} ${isAmOrPm(
                  time
                )}`}
              </span>{' '}
              in <span className='location-text'>{location}</span> to become{' '}
              <span className='identity-text'>{identity}</span>
            </span>
          )}
        </div>
      </div>
      <h3>Tag selection</h3>
      <h3>
        <div className='form__group__paragraph field'>
          <input
            type='input'
            className='form__field__paragraph'
            placeholder='an athlete'
            name='identity'
            id='identity'
            spellCheck={false}
            required
            value={identity}
            onChange={(event) => {
              setIdentity(event.target.value);
            }}
          />
          <label htmlFor='name' className='form__label__paragraph'>
            Identity
          </label>
        </div>
      </h3>
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
