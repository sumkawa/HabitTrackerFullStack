import React from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import './styles.css';

function HabitCreationBehavior({
  behavior,
  setBehavior,
  scrollLast,
  scrollNext,
}) {
  return (
    <div className='box two'>
      <h1 className='animate-character-second'>
        Now let's define the behavior.
      </h1>
      <h2 className='secondary-text'>
        Remember to make your behavior attractive, frictionless, and easy.
      </h2>
      <div className='input-paragraph'>
        {behavior === '' ? (
          <div>I will [behavior] at [time] in [location]</div>
        ) : (
          <div>
            I will <span className='behavior-text'>{behavior}</span> at [time]
            in [location]
          </div>
        )}
      </div>
      <h3>
        <div className='form__group__paragraph field'>
          <input
            type='input'
            className='form__field__paragraph'
            placeholder='put my running shoes on'
            name='behavior'
            id='behavior'
            spellCheck={false}
            required
            value={behavior}
            onChange={(event) => {
              setBehavior(event.target.value);
            }}
            autoComplete='off'
          />
          <label htmlFor='name' className='form__label__paragraph'>
            Behavior
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
          disabled={behavior === ''}
        >
          <ArrowRightIcon className='icon' width='35' height='35' />
        </button>
      </div>
    </div>
  );
}

export default HabitCreationBehavior;
