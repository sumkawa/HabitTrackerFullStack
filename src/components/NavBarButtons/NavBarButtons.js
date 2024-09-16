"use client";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { SignupButton } from "@/components/buttons/signup-button";
import { LoginButton } from "@/components/buttons/login-button";
import { LoadingPlaceholder } from "@/components/buttons/loading-placeholder";
import MyProfileDropdown from "../MyProfileDropdown";

const NavBarButtons = () => {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  if (
    pathname === "/" ||
    pathname === "/portfolio" ||
    pathname === "/portfolio/event-explorer"
  ) {
    return;
  }
  if (isLoading) {
    return <LoadingPlaceholder />;
  }
  return (
    <div className="nav-bar__buttons">
      {!user && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {user && (
        <>
          <MyProfileDropdown />
        </>
      )}
    </div>
  );
};

export default NavBarButtons;
