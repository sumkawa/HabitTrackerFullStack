import React from 'react';
import './styles.css';

function LabelButton({ tag }) {
  return (
    <div className='round'>
      <button
        style={{
          backgroundColor: 'var(--color-widget-background)',
          color: `${tag.tag_color}`,
          fontSize: '1rem',
          fontWeight: '500',
          borderRadius: '0.25rem',
          padding: '0.125rem 0.625rem',
          border: '1px solid var(--color-border)',
        }}
        className='label-button'
        onClick={(event) => {
          alert('Button clicked!');
        }}
      >
        {tag.tag_name}
      </button>
    </div>
  );
}

export default LabelButton;
