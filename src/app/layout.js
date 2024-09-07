import React from "react";
import DarkLightToggle from "@/components/DarkLightToggle";
import "./styles.css";
import MainNavBar from "@/components/MainNavBar";
import { cookies } from "next/headers";
import { LIGHT_COLORS, DARK_COLORS } from "@/constants";
import ToastProvider from "@/components/ToastProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "Habit Tracker",
};

export default function RootLayout({ children }) {
  const savedTheme = cookies().get("color-theme");
  const theme = savedTheme?.value || "dark";

  const themeColors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;

  return (
    <html lang="en" data-color-theme={theme} style={themeColors}>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <body>
        <React.StrictMode>
          <ToastProvider>
            <UserProvider>
              <div className="header">
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
