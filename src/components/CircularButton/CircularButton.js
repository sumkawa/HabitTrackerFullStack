'use client';
import React from 'react';
import { ToastContext } from '../ToastProvider';
import { HabitContext } from '../HabitsProvider';
import { CheckIcon } from '@radix-ui/react-icons';
import { logHabit, undoLogHabit } from '@/app/lib/actions';
import styles from './CircularButton.module.css';

function CircularButton({ habitUuid, userUuid, timezone, disabled }) {
  const { createToast } = React.useContext(ToastContext);
  const [loading, setLoading] = React.useState(false);
  const { checked, setChecked } = React.useContext(HabitContext);

  const handleClick = async (event) => {
    event.stopPropagation();

    if (loading) return; // Prevent multiple submissions
    if (checked[habitUuid]) {
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

      setChecked((prevChecked) => ({
        ...prevChecked,
        [habitUuid]: true,
      }));

      createToast('Habit logged for today! Nice work.', 'success');
    } catch (error) {
      console.error('Error logging habit:', error);
      createToast('Failed to log habit', 'error');
      throw error; // Rethrow if this needs to be caught higher up in the tree
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

      setChecked((prevChecked) => ({
        ...prevChecked,
        [habitUuid]: false,
      }));

      createToast('Habit log undone.', 'notice');
    } catch (error) {
      console.error('Error undoing habit log:', error);
      createToast('Failed to undo habit log', 'error');
      throw error; // Rethrow if necessary
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.circularButtonWrapper}>
      <button
        className={`${styles.circularButton} ${styles[checked[habitUuid]]} ${
          disabled || loading ? styles.circularButtonDisabled : ''
        }`}
        onClick={handleClick}
        disabled={disabled || loading}
      >
        {checked[habitUuid] ? <CheckIcon height='20px' width='20px' /> : null}
      </button>
    </div>
  );
}

export default CircularButton;
