import React from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import HabitCalendar from '../HabitCalendar';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import './styles.css';

function HabitCard({ habitObject, tagsList }) {
  //   tagsList: [
  //     { tagName: 'Fitness', tagColor: '#FF5733' }, // Example color
  //     { tagName: 'Learning', tagColor: '#337AFF' }, // Example color
  //   ],
  // {
  //   name: 'Morning Exercise',
  //   streak: 10,
  //   dateStarted: '2024-07-01',
  //   lastDayLogged: '2024-07-10',
  //   behavior: 'Jogging for 30 minutes',
  //   time: '6:00 AM',
  //   location: 'Neighborhood park',
  //   tagName: 'Fitness',
  //   identity: 'An active person',
  //   datesRepeated: {
  //     '2024-07-01': 2,
  //     '2024-07-02': 6,
  //     '2024-07-03': 8,
  //     '2024-07-04': 2,
  //     '2024-07-05': 4,
  //     '2024-07-06': 2,
  //     '2024-07-07': 1,
  //     '2024-07-08': 1,
  //     '2024-07-09': 2,
  //     '2024-07-10': 5,
  //   },
  // },
  const tag = tagsList.filter((tag) => tag.tagName === habitObject.tagName)[0];

  const TAGS = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className='outline'>
          <div className='card'>
            <div className='container-card bg-white-box'>
              <p className='card-title'>{habitObject.name}</p>
              <span
                style={{
                  backgroundColor: 'var(--color-widget-background)',
                  color: `${tag.tagColor}`,
                  fontSize: '1rem',
                  fontWeight: '500',
                  borderRadius: '0.25rem',
                  padding: '0.125rem 0.625rem',
                }}
              >
                {tag.tagName}
              </span>
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
        {/*  <HabitCalendar
                  values={habitObject.datesRepeated}
                  startDate={habitObject.dateStarted}
                />*/}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay'>
          <div className='Header'></div>
          <Dialog.Content className='DialogContent'>
            <Dialog.Close asChild>
              <button className='header-exit'>
                <ArrowLeftIcon />
              </button>
            </Dialog.Close>
            <Dialog.Title className='DialogTitle'>
              {habitObject.name}
            </Dialog.Title>
            <Dialog.Description className='DialogDescription'>
              Make changes to your profile here. Click save when youre done.
            </Dialog.Description>
            <ScrollArea.Root className='ScrollAreaRoot'>
              <ScrollArea.Viewport className='ScrollAreaViewport'>
                <HabitCalendar
                  values={habitObject.datesRepeated}
                  startDate={habitObject.dateStarted}
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
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default HabitCard;
