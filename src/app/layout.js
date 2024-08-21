import React from 'react';
import DarkLightToggle from '@/components/DarkLightToggle';
import './styles.css';
import MainNavBar from '@/components/MainNavBar';
import { cookies } from 'next/headers';
import { LIGHT_COLORS, DARK_COLORS } from '@/constants';
import ToastProvider from '@/components/ToastProvider';

export const metadata = {
  title: 'Habit Tracker',
};

export default function RootLayout({ children }) {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'light';

  const themeColors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  return (
    <html lang='en' data-color-theme={theme} style={themeColors}>
      <ToastProvider>
        <body>
          <div className='header'>
            <div>ICON</div>
            <MainNavBar />
          </div>
          {children}
        </body>
      </ToastProvider>
    </html>
  );
}
