import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  ExitIcon,
  PersonIcon,
  BarChartIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

import './styles.css';

const MyProfileDropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className='IconButtonNav' aria-label='Customise options'>
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='DropdownMenuContent' sideOffset={5}>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className='DropdownMenuSubTrigger'>
              My Profile
              <div className='RightSlot'>
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className='DropdownMenuSubContent'
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Item className='DropdownMenuItem'>
                  <Link href='/habits/profile'>Dashboard </Link>

                  <div className='RightSlot'>
                    <PersonIcon />
                  </div>
                </DropdownMenu.Item>
                <DropdownMenu.Item className='DropdownMenuItem'>
                  Analytics
                  <div className='RightSlot'>
                    <BarChartIcon />
                  </div>
                </DropdownMenu.Item>
                <DropdownMenu.Item className='DropdownMenuItem'>
                  Name Window…
                </DropdownMenu.Item>
                <DropdownMenu.Separator className='DropdownMenu.Separator' />
                <DropdownMenu.Item className='DropdownMenuItem'>
                  Developer Tools
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className='DropdownMenuSeparator' />

          <DropdownMenu.Item className='DropdownMenuItem'>
            New Tab
          </DropdownMenu.Item>
          <DropdownMenu.Item className='DropdownMenuItem'>
            <a href='/api/auth/logout' style={{ textDecoration: 'none' }}>
              Log Out
            </a>{' '}
            <div className='RightSlot'>
              <ExitIcon />
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className='DropdownMenuArrow' />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MyProfileDropdown;
