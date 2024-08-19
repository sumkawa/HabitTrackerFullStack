'use client';
import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import './styles.css';

function ConfirmationPopover({
  title,
  description,
  onConfirm,
  onCancel,
  children,
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className='PopoverContent' sideOffset={5}>
          <Popover.Arrow className='PopoverArrow' />
          <h3 className='PopoverTitle'>{title}</h3>
          <p className='PopoverDescription'>{description}</p>
          <div className='PopoverButtonGroup'>
            <button className='Button ConfirmButton' onClick={onConfirm}>
              Confirm
            </button>
            <button className='Button CancelButton' onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ConfirmationPopover;
