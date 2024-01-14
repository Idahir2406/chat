"use client";
import { UserIcon } from "../littleComponents/UserIcon";
import Link from "next/link";
import { useState, useEffect } from "react";
const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();
  return data;
};

export const NewChats = ({ session }: { session: any }) => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users");
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  // const users = await getUsers();
  if (!loading)
    return users.map((user: any) =>
      session?.user?._id.toString() !== user._id ? (
        <Link
          href={`/chat/${user._id}`}
          key={user._id}
          className="flex items-center gap-4 hover:bg-slate-200 rounded-md p-2 cursor-pointer"
        >
          <UserIcon />
          <div className="flex flex-col justify-center ">
            <h1 className="text-lg font-normal text-[#658fff]">
              {user.username}
            </h1>
            <h2 className="text-xs font-light">hola</h2>
          </div>
        </Link>
      ) : (
        <></>
      )
    );
};
