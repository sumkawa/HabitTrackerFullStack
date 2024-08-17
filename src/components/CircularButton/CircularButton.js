'use client';
import React from 'react';
import { ToastContext } from '../ToastProvider';
import { CheckIcon } from '@radix-ui/react-icons';
import { logHabit } from '@/app/lib/actions';
import './styles.css';

function CircularButton({
  habitUuid,
  userUuid,
  disabled,
  checked,
  setChecked,
}) {
  const { createToast } = React.useContext(ToastContext);
  const [loading, setLoading] = React.useState(false);

  const handleClick = async (event) => {
    event.stopPropagation();

    if (loading) {
      return;
    } else if (checked[habitUuid]) {
      createToast('Already logged habit for the day!', 'notice');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('habit_uuid', habitUuid);
      formData.append('user_uuid', userUuid);

      await logHabit(formData);

      setChecked({ ...checked, [habitUuid]: true });

      createToast('Habit logged for today! Nice work.', 'success');
    } catch (error) {
      console.error('Error logging habit:', error);
      createToast('Failed to log habit', 'error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='circular-button-wrapper'>
      <button
        className={`circular-button ${checked[habitUuid]}`}
        onClick={handleClick}
        disabled={disabled || loading}
      >
        {checked[habitUuid] ? <CheckIcon height='20px' width='20px' /> : <></>}
      </button>
    </div>
  );
}

export default CircularButton;
