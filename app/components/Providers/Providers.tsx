"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// Define a React component called Providers, which wraps other components
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};
