import React from 'react';
import DarkLightToggle from '@/components/DarkLightToggle';
import './styles.css';
import MainNavBar from '@/components/MainNavBar';
import { cookies } from 'next/headers';
import { LIGHT_COLORS, DARK_COLORS } from '@/constants';
import ToastProvider from '@/components/ToastProvider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Head from 'next/head';

export const metadata = {
  title: 'Habit Tracker',
};

export default function RootLayout({ children }) {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'dark';

  const themeColors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  return (
    <html lang='en' data-color-theme={theme} style={themeColors}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <React.StrictMode>
          <ToastProvider>
            <UserProvider>
              <div className='header'>
                <MainNavBar />
              </div>
              {children}
            </UserProvider>
          </ToastProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
