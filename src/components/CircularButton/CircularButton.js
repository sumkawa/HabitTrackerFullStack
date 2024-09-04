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
  const today = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  console.log('today', today);

  React.useEffect(() => {
    console.log(`SomeComponent render for habitUuid: ${habitUuid}`);
    console.log('Checked state on render:', checked);
  }, []);

  console.log('TODAY: ', today);
  const handleClick = async (event) => {
    event.stopPropagation();
    console.log(`Handling click for habitUuid: ${habitUuid}`);
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
      formData.append('today', today);
      console.log('form data today: ', today);
      console.log('form data today type: ', typeof today);
      await logHabit(formData);

      setChecked((prevChecked) => {
        const newState = {
          ...prevChecked,
          [habitUuid]: !prevChecked[habitUuid],
        };
        console.log('Setting new checked state:', newState);
        return newState;
      });

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
      formData.append('today', today);
      await undoLogHabit(formData);

      setChecked((prevChecked) => {
        const newState = {
          ...prevChecked,
          [habitUuid]: !prevChecked[habitUuid],
        };
        console.log('Setting new checked state:', newState);
        return newState;
      });

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
