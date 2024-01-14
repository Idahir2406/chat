"use client";
import { createContext,useContext } from "react";
import { useSession } from "next-auth/react";

interface Session {
  user: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
  expires: string;
}

export const SessionContext = createContext<Session | null>(null);

export const useUserSession = () => {
  const session = useContext(SessionContext);
  return session;
}

export const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const { data: session } = useSession();
  const userData: Session = session as Session;
  return (
    <SessionContext.Provider value={userData}>{children}</SessionContext.Provider>
  );
};
