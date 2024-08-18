'use client';
import React from 'react';
import { ToastContext } from '../ToastProvider';
import { CheckIcon } from '@radix-ui/react-icons';
import { logHabit, undoLogHabit } from '@/app/lib/actions';
import './styles.css';

function CircularButton({
  habitUuid,
  userUuid,
  timezone,
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
      createToast('Already logged habit!', 'notice', true, () => undoLog());
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('habit_uuid', habitUuid);
      formData.append('user_uuid', userUuid);
      formData.append('timezone', timezone);

      await logHabit(formData);
      console.log('ran');
      setChecked({ ...checked, [habitUuid]: true });

      createToast('Habit logged for today! Nice work.', 'success');
    } catch (error) {
      console.error('Error logging habit:', error);
      createToast('Failed to log habit', 'error');
    } finally {
      setLoading(false);
    }
  };

  const undoLog = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('habit_uuid', habitUuid);
      formData.append('user_uuid', userUuid);

      await undoLogHabit(formData);

      setChecked({ ...checked, [habitUuid]: false });
      createToast('Habit log undone.', 'notice');
    } catch (error) {
      console.error('Error undoing habit log:', error);
      createToast('Failed to undo habit log', 'error');
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
