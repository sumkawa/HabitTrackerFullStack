'use client';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';
import { SignupButton } from '@/components/buttons/signup-button';
import { LoginButton } from '@/components/buttons/login-button';
import { LogoutButton } from '@/components/buttons/logout-button';
import { LoadingPlaceholder } from '@/components/buttons/loading-placeholder';
import MyProfileDropdown from '../MyProfileDropdown';

const NavBarButtons = () => {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  if (pathname === '/') {
    return;
  }
  if (isLoading) {
    // You can replace this with a spinner or skeleton loader
    return <LoadingPlaceholder />;
  }
  return (
    <div className='nav-bar__buttons'>
      {!user && (
        <>
          <LoginButton />
          <SignupButton />
        </>
      )}
      {user && (
        <>
          <LogoutButton />
          <MyProfileDropdown />
        </>
      )}
    </div>
  );
};

export default NavBarButtons;
