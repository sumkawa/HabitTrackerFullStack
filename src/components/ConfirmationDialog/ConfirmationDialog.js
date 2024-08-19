'use client';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import './styles.css';

function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className='DialogOverlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>
        <motion.div
          className='DialogContent'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dialog.Title className='DialogTitle'>{title}</Dialog.Title>
          <Dialog.Description className='DialogDescription'>
            {description}
          </Dialog.Description>
          <div className='ButtonGroup'>
            <button className='Button ConfirmButton' onClick={onConfirm}>
              Confirm
            </button>
            <button className='Button CancelButton' onClick={onCancel}>
              Cancel
            </button>
          </div>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ConfirmationDialog;
