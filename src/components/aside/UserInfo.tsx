"use client";

import { UserIcon } from "../littleComponents/UserIcon";
import { useSession,signOut } from "next-auth/react";
import { AuthButton } from "../littleComponents/AuthButton";
import { GoSignOut } from "react-icons/go";
export const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-2 p-2 justify-between">
      {session ? (
        <>
          <div className="flex gap-2">
            <UserIcon />
            <div className="flex flex-col justify-center text-[#658fff]">
              <h1 className="text-lg font-bold">{session?.user?.name}</h1>
            </div>
          </div>

          <GoSignOut
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          />
        </>
      ) : (
        <AuthButton />
      )}
    </div>
  );
};
