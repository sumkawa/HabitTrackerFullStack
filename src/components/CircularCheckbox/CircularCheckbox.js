import React from 'react';
import './styles.css';

function CircularCheckbox({ id, checked, setChecked }) {
  return (
    <div className='round'>
      <input
        type='checkbox'
        id={`check-habit-${id}`}
        checked={checked[id] === true}
        onChange={(event) => {
          setChecked({ ...checked, [id]: event.target.checked });
        }}
      />
      <label htmlFor={`check-habit-${id}`} />
    </div>
  );
}

export default CircularCheckbox;
