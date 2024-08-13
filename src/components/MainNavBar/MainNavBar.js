import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { cookies } from 'next/headers';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons';
import { LIGHT_COLORS, DARK_COLORS } from '@/constants';
import DarkLightToggle from '@/components/DarkLightToggle';
import './styles.css';
import Link from 'next/link';

const MainNavBar = () => {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'light';
  return (
    <NavigationMenu.Root className='NavigationMenuRoot'>
      <NavigationMenu.List className={`NavigationMenuList ${theme}`}>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='NavigationMenuTrigger'>
            Habits <CaretDownIcon className='CaretDown' aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='NavigationMenuContent'>
            <ul className='List one'>
              <li style={{ gridRow: 'span 3' }}>
                <NavigationMenu.Link asChild>
                  <Link className='Callout' href='/habits'>
                    <FaceIcon />
                    <div className='CalloutHeading'>Ready to get started?</div>
                    <p className='CalloutText'>
                      Build better habits, from the ground up.
                    </p>
                  </Link>
                </NavigationMenu.Link>
              </li>

              <ListItem
                href='https://stitches.dev/'
                title='Stitches'
                className='ListItemText'
              >
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem href='/colors' title='Colors' className='ListItemText'>
                Beautiful, thought-out palettes with auto dark mode.
              </ListItem>
              <ListItem
                href='https://icons.radix-ui.com/'
                title='Icons'
                className='ListItemText'
              >
                A crisp set of 15x15 icons, balanced and consistent.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='NavigationMenuTrigger'>
            Overview <CaretDownIcon className='CaretDown' aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='NavigationMenuContent'>
            <ul className='List two'>
              <ListItem
                title='Introduction'
                href='/primitives/docs/overview/introduction'
                className='ListItemText'
              >
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem
                title='Getting started'
                href='/primitives/docs/overview/getting-started'
                className='ListItemText'
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </ListItem>
              <ListItem
                title='Styling'
                href='/primitives/docs/guides/styling'
                className='ListItemText'
              >
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem
                title='Animation'
                href='/primitives/docs/guides/animation'
                className='ListItemText'
              >
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem
                title='Accessibility'
                href='/primitives/docs/overview/accessibility'
                className='ListItemText'
              >
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem
                title='Releases'
                href='/primitives/docs/overview/releases'
                className='ListItemText'
              >
                Radix Primitives releases and their changelogs.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
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
