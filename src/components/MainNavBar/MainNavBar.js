import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons';
import { cookies } from 'next/headers';
import { LIGHT_COLORS, DARK_COLORS } from '@/constants';
import DarkLightToggle from '@/components/DarkLightToggle';
import './styles.css';
import Link from 'next/link';

const MainNavBar = () => {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'light';

  const themeColors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  return (
    <NavigationMenu.Root className='NavigationMenuRoot'>
      <NavigationMenu.List className={`NavigationMenuList ${theme}`}>
        <NavigationMenu.Item>
          <NavigationMenu.Link className='NavigationMenuLink' href='/habits'>
            Habits
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className='NavigationMenuLink'
            href='https://github.com/radix-ui'
          >
            Github
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className='NavigationMenuIndicator'>
          <div className='Arrow' />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className='ViewportPosition'>
        <NavigationMenu.Viewport className='NavigationMenuViewport' />
      </div>
      <DarkLightToggle initialTheme={theme} />
    </NavigationMenu.Root>
  );
};

// eslint-disable-next-line react/display-name
const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames('ListItemLink', className)}
          {...props}
          ref={forwardedRef}
        >
          <div className='ListItemHeading'>{title}</div>
          <p className='ListItemText'>{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default MainNavBar;
