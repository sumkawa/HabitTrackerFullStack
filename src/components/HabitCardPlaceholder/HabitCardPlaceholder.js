import React from 'react';
import './styles.css';

function HabitCardPlaceholder() {
  return (
    <div className='outline'>
      <div className='card'>
        <div className='container-card bg-white-box'>
          <div className='habit-card-header-placeholder'>
            <div className='card-title-placeholder'>
              Looks like you don't have any habits.
            </div>
          </div>
          <p className='card-description-placeholder'>
            <span>Make one to get started.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HabitCardPlaceholder;
