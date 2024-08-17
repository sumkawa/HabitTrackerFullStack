import React from 'react';
import './styles.css';

function CircularCheckbox({ id, checked, setChecked, onClick, disabled }) {
  return (
    <div className='round'>
      <input
        type='checkbox'
        id={`check-habit-${id}`}
        checked={checked[id] === true}
        onChange={(event) => {
          setChecked({ ...checked, [id]: event.target.checked });
          if (onClick) {
            onClick(event);
          }
        }}
        disabled={disabled}
      />
      <label htmlFor={`check-habit-${id}`} />
    </div>
  );
}

export default CircularCheckbox;
