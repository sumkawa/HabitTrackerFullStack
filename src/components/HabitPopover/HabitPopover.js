'use client';
import React from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import './styles.css';
import HabitCreationTitle from '../HabitCreationTitle';
import HabitCreationBehavior from '../HabitCreationBehavior';
import HabitCreationTime from '../HabitCreationTime';
import HabitCreationLocation from '../HabitCreationLocation';
import HabitCreationSummary from '../HabitCreationSummary';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { createHabit } from '@/app/lib/actions';
import { HabitContext } from '../HabitsProvider';
import { NEXT_CACHE_TAGS_HEADER } from 'next/dist/lib/constants';

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
  const [identity, setIdentity] = React.useState('');

  const wrapperRef = React.useRef(null);

  const { params, tags } = React.useContext(HabitContext);
  console.log(params, NEXT_CACHE_TAGS_HEADER);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !habitTitle ||
      !behavior ||
      !time ||
      !location ||
      !identity ||
      !Object.keys(weekdays).some((day) => weekdays[day])
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', habitTitle);
    formData.append('user_uuid', params.uuid);
    formData.append('behavior', behavior);
    formData.append('time', time);
    formData.append('location', location);
    formData.append('tag_name', 'Fitness'); // Replace with the selected tag
    formData.append('identity', identity); // Adjust as needed
    formData.append(
      'days_of_week',
      Object.keys(weekdays).filter((day) => weekdays[day])
    );
    formData.append('dates_repeated', JSON.stringify([])); // Adjust as needed

    try {
      await createHabit(formData);
      setDialogOpen(false);
      alert('Habit created successfully!');
    } catch (error) {
      console.error('Error creating habit:', error);
      alert('Failed to create habit.');
    }
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
          {/* Animate the overlay and close dialog on click */}
          <Dialog.Overlay asChild>
            <motion.div
              className='PopoverDialogOverlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDialogOpen(false)} // Close on overlay click
            >
              <Dialog.Content asChild>
                {/* Animate the content */}
                <motion.div
                  className='PopoverDialogContent'
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()} // Prevent click propagation to overlay
                >
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
                      identity={identity}
                      setIdentity={setIdentity}
                      tags={tags}
                    />
                  </div>
                </motion.div>
              </Dialog.Content>
            </motion.div>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default HabitPopover;
