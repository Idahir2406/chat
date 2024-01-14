"use client";
import { SessionProvider } from "next-auth/react";
import { SessionContextProvider } from "context/SessionContext";
import { SocketProvider } from "context/SocketContext";
import { ConversationProvider } from "context/ConversationContext";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SessionContextProvider>
        <ConversationProvider>
          <SocketProvider>{children}</SocketProvider>
        </ConversationProvider>
      </SessionContextProvider>
    </SessionProvider>
  );
};
