'use client';
import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { Pencil2Icon, ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons';
import styles from './EditHabitButton.module.css';
import TextInput from '../TextInput';
import { updateHabit } from '@/app/lib/actions';
import { deleteHabit } from '@/app/lib/actions';
import ConfirmationPopover from '../ConfirmationPopover';
import { ToastContext } from '../ToastProvider';
import LabelButton from '../LabelButton';
import { HabitContext } from '../HabitsProvider';
import './styles.css';

function EditHabitButton({ editOpen, setEditOpen, habit, user }) {
  // habit.tag_name = 'Fitness'
  // params.uuid = the user uuid
  const [behavior, setBehavior] = useState(habit.behavior);
  const [time, setTime] = useState(habit.time);
  const [location, setLocation] = useState(habit.location);
  const [identity, setIdentity] = useState(habit.identity || '');
  const [weekdays, setWeekdays] = useState({
    sunday: habit.days_of_week.includes('Sunday'),
    monday: habit.days_of_week.includes('Monday'),
    tuesday: habit.days_of_week.includes('Tuesday'),
    wednesday: habit.days_of_week.includes('Wednesday'),
    thursday: habit.days_of_week.includes('Thursday'),
    friday: habit.days_of_week.includes('Friday'),
    saturday: habit.days_of_week.includes('Saturday'),
  });
  const { createToast } = React.useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const weekdaysList = Object.keys(weekdays);

  const [showConfirmPopover, setShowConfirmPopover] = useState(false);
  const { tags } = React.useContext(HabitContext);

  const tag = tags.find((tag) => tag.tag_name === habit.tag_name);
  function handleWeekdayChange(day) {
    setWeekdays((prev) => ({ ...prev, [day]: !prev[day] }));
  }

  function convertTwentyFourToString(dateString) {
    let hour = Number(dateString.slice(0, 2));
    const minute = dateString.slice(3, 5);
    let amOrPm = '';
    if (hour >= 12) {
      hour = hour > 12 ? hour - 12 : hour;
      amOrPm = 'PM';
    } else {
      hour = hour === 0 ? 12 : hour;
      amOrPm = 'AM';
    }

    return `${hour}:${minute} ${amOrPm}`;
  }
  const handleSaveChanges = async () => {
    if (loading) return;
    const daysOfWeek = Object.keys(weekdays)
      .filter((day) => weekdays[day])
      .map((day) => day.charAt(0).toUpperCase() + day.slice(1));
    const formData = new FormData();
    formData.append('habit_uuid', habit.uuid);
    formData.append('user_uuid', user.uuid);
    formData.append('name', habit.name);
    formData.append('behavior', behavior);
    formData.append('time', time);
    formData.append('location', location);
    formData.append('tag_name', habit.tag_name);
    formData.append('identity', identity);
    daysOfWeek.forEach((day) => {
      formData.append('days_of_week', day);
    });
    setLoading(true);
    try {
      await updateHabit(formData);

      createToast('Habit updated successfully!', 'success');
      setEditOpen(false);
    } catch (error) {
      console.error('Error updating habit:', error);
      createToast('Failed to update habit', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHabit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await deleteHabit(habit.uuid, user.uuid);
      createToast('Habit deleted successfully!', 'success');
      setEditOpen(false);
    } catch (error) {
      console.error('Error deleting habit:', error);
      createToast('Failed to delete habit', 'error');
    } finally {
      setLoading(false);
    }
  };

  function handleCancelClick() {
    setShowConfirmPopover(true);
  }

  function handleConfirmCancel() {
    setShowConfirmPopover(false);
    setEditOpen(false);
  }

  function handleCancelPopoverClose() {
    setShowConfirmPopover(false);
  }

  return (
    <Dialog.Root open={editOpen} onOpenChange={setEditOpen}>
      <Dialog.Trigger asChild>
        <div className={styles.editButtonWrapper}>
          <button
            onClick={(e) => {
              setEditOpen(true);
              e.stopPropagation();
            }}
            className={styles.editButton}
          >
            <Pencil2Icon height='30px' width='30px' />
          </button>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className={styles.DialogOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.Header}></div>
            <motion.div
              className={styles.DialogContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Dialog.Close asChild>
                <ConfirmationPopover
                  title='Cancel Editing'
                  description='Are you sure you want to cancel? All unsaved changes will be lost.'
                  onConfirm={handleConfirmCancel}
                  onCancel={handleCancelPopoverClose}
                >
                  <button className={styles.headerExit}>
                    <ArrowLeftIcon width='35' height='35' />
                  </button>
                </ConfirmationPopover>
              </Dialog.Close>
              <Dialog.Title className={styles.DialogTitle}>
                Edit Habit
              </Dialog.Title>
              <Dialog.Description className={styles.DialogDescription}>
                Make changes to your habit here. Click save when you're done.
              </Dialog.Description>

              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <TextInput
                    name='behavior-edit'
                    id='behavior-edit'
                    placeholder='Behavior'
                    value={behavior}
                    onChange={(e) => setBehavior(e.target.value)}
                  />
                </div>
                <div className={styles.timeInputContainer}>
                  <TimePicker
                    onChange={setTime}
                    value={time}
                    disableClock={true}
                    clearIcon={null}
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.weekdayInputContainer}>
                    <div className={styles.weekDaysSelector}>
                      {weekdaysList.map((day) => (
                        <React.Fragment key={day}>
                          <input
                            type='checkbox'
                            id={`weekday-${day}`}
                            className='weekday'
                            checked={weekdays[day]}
                            onChange={() => handleWeekdayChange(day)}
                          />
                          <label htmlFor={`weekday-${day}`}>
                            {day.charAt(0).toUpperCase()}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <TextInput
                    name='location-edit'
                    id='location-edit'
                    placeholder='Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <TextInput
                    name='identity-edit'
                    id='identity-edit'
                    placeholder='Identity'
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                  />
                </div>
              </form>

              <p className='card-description'>
                <span>I will </span>
                <span className='behavior'>{behavior}</span>
                <span> at </span>
                <span className='time'>{convertTwentyFourToString(time)}</span>
                <span> in </span>
                <span className='location'>{location}</span>
                {identity && (
                  <>
                    <span> to become </span>
                    <span className='identity'>{identity}</span>
                  </>
                )}
              </p>

              <div
                style={{
                  display: 'flex',
                  marginTop: 25,
                  justifyContent: 'flex-end',
                }}
              >
                <ConfirmationPopover
                  title='Delete Habit'
                  description='Are you sure you want to delete this habit? This will delete all associated data.'
                  onConfirm={handleDeleteHabit}
                  onCancel={handleCancelPopoverClose}
                >
                  <button
                    type='button'
                    className={`${styles.Button} ${styles.red}`}
                  >
                    <TrashIcon width='25' height='25' />
                  </button>
                </ConfirmationPopover>
                <Dialog.Close asChild>
                  <button
                    className={`${styles.Button} ${styles.green}`}
                    onClick={handleSaveChanges}
                  >
                    Save changes
                  </button>
                </Dialog.Close>
                <ConfirmationPopover
                  title='Cancel Editing'
                  description='Are you sure you want to cancel? All unsaved changes will be lost.'
                  onConfirm={handleConfirmCancel}
                  onCancel={handleCancelPopoverClose}
                >
                  <button
                    type='button'
                    className={`${styles.Button} ${styles.Cancel}`}
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </ConfirmationPopover>
              </div>
            </motion.div>
          </motion.div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default EditHabitButton;
