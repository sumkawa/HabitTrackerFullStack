import React from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import './styles.css';

function HabitCreationTitle({ habitTitle, setHabitTitle, scrollNext }) {
  return (
    <div className='box one'>
      <h1 className='animate-character'>Make your habit</h1>
      <h2 className='secondary-text'>First, give it a catchy title:</h2>
      <div className='form__group field'>
        <input
          type='input'
          className='form__field'
          placeholder='Name'
          name='name'
          id='name'
          spellCheck={false}
          required
          value={habitTitle}
          onChange={(event) => {
            setHabitTitle(event.target.value);
          }}
          autoComplete='off'
        />
        <label htmlFor='name' className='form__label'>
          Name
        </label>
      </div>
      <div className='footer'>
        <button className='button' disabled={true}>
          :)
        </button>
        <button
          className='button'
          onClick={scrollNext}
          disabled={habitTitle === ''}
        >
          <ArrowRightIcon className='icon' width='35' height='35' />
        </button>
      </div>
    </div>
  );
}

export default HabitCreationTitle;
