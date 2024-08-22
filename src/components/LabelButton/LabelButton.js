import React from 'react';
import './styles.css';
import { ToastContext } from '../ToastProvider';

function LabelButton({ tag }) {
  const { createToast } = React.useContext(ToastContext);
  function handleCreateToast() {
    createToast('Hello World!', 'notice');
  }
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
          event.preventDefault();
        }}
      >
        {tag.tag_name}
      </button>
    </div>
  );
}

export default LabelButton;
