import React from 'react';
import DarkLightToggle from '@/components/DarkLightToggle';
import './styles.css';
import { cookies } from 'next/headers';
import { LIGHT_COLORS, DARK_COLORS } from '@/constants';

export default function RootLayout({ children }) {
  const savedTheme = cookies().get('color-theme');
  const theme = savedTheme?.value || 'light';

  const themeColors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  return (
    <html lang='en' data-color-theme={theme} style={themeColors}>
      <body>
        <div className='header'>
          <DarkLightToggle initialTheme={theme} />
        </div>
        {children}
      </body>
    </html>
  );
}
