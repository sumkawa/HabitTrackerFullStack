'use client';
import React from 'react';
import { PlusIcon, ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import './styles.css';

import HabitCreationTitle from '../HabitCreationTitle';
import HabitCreationBehavior from '../HabitCreationBehavior';
import HabitCreationTime from '../HabitCreationTime';
import HabitCreationLocation from '../HabitCreationLocation';
import HabitCreationSummary from '../HabitCreationSummary';
import * as Dialog from '@radix-ui/react-dialog';

const weekValues = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

function HabitPopover() {
  const [habitTitle, setHabitTitle] = React.useState('');
  const [behavior, setBehavior] = React.useState('');
  const [time, setTime] = React.useState('10:00');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [weekdays, setWeekdays] = React.useState(weekValues);
  const [isAM, setIsAm] = React.useState('AM');

  const weekdaysList = Object.keys(weekValues);

  const wrapperRef = React.useRef(null);

  const scrollNext = () => {
    if (wrapperRef.current) {
      const { scrollLeft, clientWidth } = wrapperRef.current;
      wrapperRef.current.scrollTo({
        left: scrollLeft + clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollLast = () => {
    if (wrapperRef.current) {
      const { scrollLeft, clientWidth } = wrapperRef.current;
      wrapperRef.current.scrollTo({
        left: scrollLeft - clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDialogOpen(false);
    console.log('submitted');
    console.log(weekdays);
    // would normally be an API post request
  };

  const handleWeekdayChange = (day) => {
    setWeekdays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        scrollNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='popover-container'>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger>
          <PlusIcon width='25' height='25' className='icon-opener' />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='PopoverDialogOverlay'>
            <Dialog.Content className='PopoverDialogContent'>
              <Dialog.Title>
                <VisuallyHidden.Root>Make your habit</VisuallyHidden.Root>
              </Dialog.Title>
              <Dialog.Description>
                <VisuallyHidden.Root>
                  Make your habit here. Click save when done.
                </VisuallyHidden.Root>
              </Dialog.Description>
              <div className='wrapper' ref={wrapperRef}>
                <HabitCreationTitle
                  habitTitle={habitTitle}
                  setHabitTitle={setHabitTitle}
                  scrollNext={scrollNext}
                />
                <HabitCreationBehavior
                  behavior={behavior}
                  setBehavior={setBehavior}
                  scrollNext={scrollNext}
                  scrollLast={scrollLast}
                />
                <HabitCreationTime
                  behavior={behavior}
                  time={time}
                  setTime={setTime}
                  weekdays={weekdays}
                  handleWeekdayChange={handleWeekdayChange}
                  scrollLast={scrollLast}
                  scrollNext={scrollNext}
                  setIsAm={setIsAm}
                />
                <HabitCreationLocation
                  location={location}
                  setLocation={setLocation}
                  behavior={behavior}
                  time={time}
                  scrollLast={scrollLast}
                  scrollNext={scrollNext}
                  setIsAm={setIsAm}
                />
                <HabitCreationSummary
                  habitTitle={habitTitle}
                  behavior={behavior}
                  time={time}
                  location={location}
                  handleSubmit={handleSubmit}
                  scrollLast={scrollLast}
                  setIsAm={setIsAm}
                />
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default HabitPopover;
