'use client';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ArrowLeftIcon, RocketIcon } from '@radix-ui/react-icons';
import { Frown } from 'react-feather';
import { motion } from 'framer-motion';
import HabitCalendar from '../HabitCalendar';
import CircularButton from '../CircularButton';
import { HabitContext } from '../HabitsProvider';
import EditHabitButton from '../EditHabitButton';
import 'react-calendar-heatmap/dist/styles.css';
import './styles.css';

function HabitCard({ habitObject, user }) {
  const { checked, setChecked, completionRates } =
    React.useContext(HabitContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // New state for EditHabitButton
  const [loading, setLoading] = useState(false);
  const { tags, params } = React.useContext(HabitContext);
  const tag = tags.find((tag) => tag.tag_name === habitObject.tag_name);
  const [weekdays, setWeekdays] = useState({
    sunday: habitObject.days_of_week.includes('Sunday'),
    monday: habitObject.days_of_week.includes('Monday'),
    tuesday: habitObject.days_of_week.includes('Tuesday'),
    wednesday: habitObject.days_of_week.includes('Wednesday'),
    thursday: habitObject.days_of_week.includes('Thursday'),
    friday: habitObject.days_of_week.includes('Friday'),
    saturday: habitObject.days_of_week.includes('Saturday'),
  });

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

    const stringTime = `${hour}:${minute} ${amOrPm}`;
    return stringTime;
  }
  const weekdaysList = Object.keys(weekdays);
  const streakColor =
    habitObject.streak === 0 ? 'zero-streak' : 'streak-active';
  const habitCompletionRate = completionRates.find((rate) => {
    return rate.habit_uuid === habitObject.uuid;
  })?.completionRate;
  return (
    <Dialog.Root
      open={modalOpen}
      onOpenChange={(isOpen) => !editOpen && setModalOpen(isOpen)} // Check if editOpen is false
    >
      <Dialog.Trigger asChild>
        <div className='outline'>
          <div className='card'>
            <div className='container-card bg-white-box'>
              <div className='habit-card-header'>
                <div className='card-title-container'>
                  <CircularButton
                    id={habitObject.uuid}
                    habitUuid={habitObject.uuid}
                    userUuid={[user.uuid]}
                    timezone={user.timezone}
                    checked={checked}
                    setChecked={setChecked}
                    disabled={loading}
                  />
                  <div className='card-title'>
                    <p>{habitObject.name}</p>
                  </div>
                  <div className='edit-habit-button'>
                    <EditHabitButton
                      editOpen={editOpen}
                      setEditOpen={setEditOpen}
                      habit={habitObject}
                      user={user}
                    />
                  </div>
                </div>

                <div className={`card-streak ${streakColor}`}>
                  {streakColor === 'zero-streak' ? (
                    <Frown width='20' height='20' className='frownIcon' />
                  ) : (
                    <RocketIcon width='20' height='20' className='rocketIcon' />
                  )}

                  <p className='rocketNumber'>{habitObject.streak}</p>
                </div>
              </div>
              <div className='weekdayInputContainer'>
                <div className='weekDaysSelector'>
                  {weekdaysList.map((day, index) => (
                    <React.Fragment key={day}>
                      <input
                        type='checkbox'
                        id={`weekday-${day}-${habitObject.uuid}`}
                        className='weekday'
                        checked={weekdays[day]}
                        onChange={() => handleWeekdayChange(day)}
                      />
                      <label htmlFor={`weekday-${day}`}></label>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <p className='card-description'>
                <span>I will </span>
                <span className='behavior'>{habitObject.behavior}</span>
                <span> at </span>
                <span className='time'>
                  {convertTwentyFourToString(habitObject.time)}
                </span>
                <span> in </span>
                <span className='location'>{habitObject.location}</span>
                <span> to become </span>
                <span className='identity'>{habitObject.identity}</span>
              </p>
            </div>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className='DialogOverlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <div className='Header'></div>
            <motion.div
              className='DialogContent'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // Prevents closing the dialog on content click
            >
              <Dialog.Close asChild>
                <button className='header-exit'>
                  <ArrowLeftIcon width='35' height='35' />
                </button>
              </Dialog.Close>
              <Dialog.Title className='DialogTitle'>
                {habitObject.name}
              </Dialog.Title>
              <Dialog.Description className='DialogDescription'>
                View analytics associated with this specific habit.
              </Dialog.Description>
              <ScrollArea.Root className='ScrollAreaRoot'>
                <ScrollArea.Viewport className='ScrollAreaViewport'>
                  <HabitCalendar
                    values={habitObject.dates_repeated}
                    startDate={habitObject.date_started}
                    daysOfWeek={habitObject.days_of_week}
                    user={user}
                  />
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation='vertical'>
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar orientation='horizontal'>
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
              <div>
                You complete this habit at a rate of {habitCompletionRate}%
              </div>
              <div>
                Your longest streak for this habit is{' '}
                {habitObject.longest_streak}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 80,
                  justifyContent: 'flex-end',
                }}
              >
                <Dialog.Close asChild>
                  <button className='Button green'>Save</button>
                </Dialog.Close>
              </div>
            </motion.div>
          </motion.div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default HabitCard;
