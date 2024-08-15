'use client';
import React, { useState } from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import HabitCalendar from '../HabitCalendar';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import CircularCheckbox from '../CircularCheckbox';
import LabelButton from '../LabelButton';
import { HabitContext } from '../HabitsProvider';
import './styles.css';

function HabitCard({ habitObject }) {
  const { checked, setChecked } = React.useContext(HabitContext);
  const [modalOpen, setModalOpen] = useState(false);
  const { tags } = React.useContext(HabitContext);
  const tag = tags.find((tag) => tag.tag_name === habitObject.tag_name);

  return (
    <Dialog.Root
      open={modalOpen}
      onOpenChange={setModalOpen}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog.Trigger asChild>
        <div className='outline'>
          <div className='card'>
            <div className='container-card bg-white-box'>
              <div className='habit-card-header'>
                <div className='card-title-container'>
                  <CircularCheckbox
                    id={habitObject.uuid}
                    checked={checked}
                    setChecked={setChecked}
                  />
                  <div className='card-title'>
                    <p>{habitObject.name}</p>
                  </div>
                </div>

                <div className='card-streak'>
                  <p>{habitObject.streak}</p>
                </div>
              </div>
              <LabelButton tag={tag} />
              <p className='card-description'>
                <span>I will </span>
                <span className='behavior'>{habitObject.behavior}</span>
                <span> at </span>
                <span className='time'>{habitObject.time}</span>
                <span> in </span>
                <span className='location'>{habitObject.location}</span>
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
            onClick={() =>
              document.querySelector('[data-state="open"]')?.click()
            }
          >
            <div className='Header'></div>
            <motion.div
              className='DialogContent'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
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
