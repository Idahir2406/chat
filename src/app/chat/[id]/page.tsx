import { Body } from "components/chat/Body";
import { Header } from "components/chat/Header";
import { Form } from "components/chat/Form";
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route";




export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header receiverId={params.id} />
      <Body receiverId={params.id} senderId={session?.user?._id.toString()}/>
      <Form receiverId={params.id} senderId={session?.user?._id.toString()}/>
    </>
  );
}
