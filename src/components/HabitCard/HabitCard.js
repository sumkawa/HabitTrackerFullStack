'use client';
import React, { useState } from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import HabitCalendar from '../HabitCalendar';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import CircularButton from '../CircularButton';
import LabelButton from '../LabelButton';
import { HabitContext } from '../HabitsProvider';
import EditHabitButton from '../EditHabitButton';
import './styles.css';

function HabitCard({ habitObject, user }) {
  const { checked, setChecked } = React.useContext(HabitContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // New state for EditHabitButton
  const [loading, setLoading] = useState(false);
  const { tags, params } = React.useContext(HabitContext);
  const tag = tags.find((tag) => tag.tag_name === habitObject.tag_name);

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
                    userUuid={[params.uuid]}
                    timezone={user.timezone}
                    checked={checked}
                    setChecked={setChecked}
                    disabled={loading}
                  />
                  <div className='card-title'>
                    <p>{habitObject.name}</p>
                  </div>
                  <div>
                    <EditHabitButton
                      editOpen={editOpen}
                      setEditOpen={setEditOpen}
                      habit={habitObject}
                      user={user}
                    />
                  </div>
                </div>

                <div className='card-streak'>
                  <p>{habitObject.streak}</p>
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
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>
              <ScrollArea.Root className='ScrollAreaRoot'>
                <ScrollArea.Viewport className='ScrollAreaViewport'>
                  <HabitCalendar
                    values={habitObject.dates_repeated}
                    startDate={habitObject.date_started}
                  />
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation='vertical'>
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar orientation='horizontal'>
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
              <div
                style={{
                  display: 'flex',
                  marginTop: 25,
                  justifyContent: 'flex-end',
                }}
              >
                <Dialog.Close asChild>
                  <button className='Button green'>Save changes</button>
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
