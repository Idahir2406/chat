import { Body } from "components/chat/Body";
import { Header } from "components/chat/Header";
import { Form } from "components/chat/Form";
import { getServerSession } from "next-auth/next";
import { authOptions } from "Lib/authOptions";

interface Session { 
  user: {
    _id: string;
    email: string;
    name: string;
    image: string;
  }
}

export default async function page({ params }: { params: { id: string } }) {
  const session:Session|null = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <Header receiverId={params.id} />
      <Body receiverId={params.id} senderId={session?.user?._id.toString()}/>
      <Form receiverId={params.id} senderId={session?.user?._id.toString()}/>
    </>
  );
}
