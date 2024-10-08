import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PersonIcon, ExitIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import './styles.css';

const MyProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
  };

  const handleProfileClick = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button className='IconButtonNav' aria-label='My Profile'>
          <PersonIcon width='24px' height='24px' />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='DropdownMenuContent' sideOffset={5}>
          <DropdownMenu.Item className='DropdownMenuItem'>
            <Link
              href='/habits/profile/'
              className='dropdownLinks'
              passHref
              onClick={handleProfileClick}
            >
              Profile
              <div className='RightSlot'>
                <PersonIcon />
              </div>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className='DropdownMenuSeparator' />
          <DropdownMenu.Item className='DropdownMenuItem'>
            <a href='/api/auth/logout' className='dropdownLinks'>
              Log Out
              <div className='RightSlot'>
                <ExitIcon />
              </div>
            </a>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className='DropdownMenuArrow' />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MyProfileDropdown;
