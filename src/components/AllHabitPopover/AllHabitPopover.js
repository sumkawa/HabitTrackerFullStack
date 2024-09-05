'use client';
import React from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import './styles.css';
import HabitCreationTitle from '../HabitCreationTitle';
import HabitCreationBehavior from '../HabitCreationBehavior';
import HabitCreationTime from '../HabitCreationTime';
import HabitCreationLocation from '../HabitCreationLocation';
import AllHabitCreationSummary from '../AllHabitCreationSummary';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';

const weekValues = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

function AllHabitPopover() {
  const [habitTitle, setHabitTitle] = React.useState('');
  const [behavior, setBehavior] = React.useState('');
  const [time, setTime] = React.useState('10:00');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [weekdays, setWeekdays] = React.useState(weekValues);
  const [isAM, setIsAm] = React.useState('AM');
  const [identity, setIdentity] = React.useState('');
  const wrapperRef = React.useRef(null);
  React.useEffect(() => {
    if (dialogOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [dialogOpen]);

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

  const handleWeekdayChange = (day) => {
    setWeekdays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleAllChange = () => {
    setWeekdays({
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
    });
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
                      handleAllChange={handleAllChange}
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
                    <AllHabitCreationSummary
                      habitTitle={habitTitle}
                      behavior={behavior}
                      time={time}
                      location={location}
                      scrollLast={scrollLast}
                      setIsAm={setIsAm}
                      identity={identity}
                      setIdentity={setIdentity}
                      weekdays={weekdays}
                      setDialogOpen={setDialogOpen}
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

export default AllHabitPopover;
