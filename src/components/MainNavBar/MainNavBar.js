import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons';
import { cookies } from 'next/headers';
import { LIGHT_COLORS, DARK_COLORS } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';

import DarkLightToggle from '@/components/DarkLightToggle';
import NavBarButtons from '@/components/NavBarButtons';

import './styles.css';

const MainNavBar = () => {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'light';

  const themeColors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  return (
    <NavigationMenu.Root className='NavigationMenuRoot'>
      <div>
        <NavigationMenu.List className={`NavigationMenuList ${theme}`}>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href='/' className='NavigationMenuLink'>
                Home
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href='/habits' className='NavigationMenuLink'>
                Habits
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link
                href='https://github.com/radix-ui'
                className='NavigationMenuLink'
              >
                Github
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className='NavigationMenuIndicator'>
            <div className='Arrow' />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className='ViewportPosition'>
          <NavigationMenu.Viewport className='NavigationMenuViewport' />
        </div>
      </div>
      <div className='toggleAndAuthButtons'>
        <NavBarButtons />
        <DarkLightToggle initialTheme={theme} />
      </div>
    </NavigationMenu.Root>
  );
};

// eslint-disable-next-line react/display-name
const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          className={classNames('ListItemLink', className)}
          {...props}
          ref={forwardedRef}
        >
          <div className='ListItemHeading'>{title}</div>
          <p className='ListItemText'>{children}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

export default MainNavBar;
