import { UserIcon } from "../littleComponents/UserIcon";
import Link from "next/link";

const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/getusers");
  const data = await res.json();
  return data;
};

export const NewChats = async ({
  session
}: {
  session: any;
}) => {
  const users = await getUsers();

  return users.map((user: any) => (
    session?.user?._id.toString() !== user._id ? (
      <Link href={`/chat/${user._id}`} 
      key={user._id}
      className="flex items-center gap-4 hover:bg-slate-200 rounded-md p-2 cursor-pointer"
    >
      <UserIcon />
      <div className="flex flex-col justify-center ">
        <h1 className="text-lg font-normal text-[#658fff]">{user.username}</h1>
        <h2 className="text-xs font-light">hola</h2>
      </div>
    </Link>
    ):(<></>)
  ));
};
