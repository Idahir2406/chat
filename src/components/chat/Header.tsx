import { UserIcon } from "../littleComponents/UserIcon";
const getReceiverData = async (receiverId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${receiverId}`);
  const data = await res.json();
  return data;
};

export const Header = async ({ receiverId }: { receiverId: string }) => {
  const { username } = await getReceiverData(receiverId);

  return (
    <header className="bg-white/5 border-b">
      <div className="flex items-center gap-2 p-2 justify-between">
        <div className="flex gap-2">
          <UserIcon />
          <div className="flex flex-col justify-center text-[#658fff]">
            <h1 className="text-lg font-bold">{username}</h1>
          </div>
        </div>
      </div>
    </header>
  );
};
