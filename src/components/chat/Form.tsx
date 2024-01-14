"use client";
import { useState, useRef, useEffect } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useSocket } from "context/SocketContext";
import { useConversation } from "context/ConversationContext";
export const Form = ({
  receiverId,
  senderId,
}: {
  receiverId: string | null | undefined;
  senderId: string | null | undefined;
}) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const { socket, isConnected, emit } = useSocket();
  const { chats, setChats, addNewMessage } = useConversation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/chat/${receiverId}/${senderId}`, {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setChats([...chats, data]);

      setMessage("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }

      if (isConnected) {
        emit("updateChat", { receiverId, senderId, message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#f9f9f9] py-2 px-5 rounded-xl relative flex items-center"
    >
      <input
        ref={inputRef}
        onChange={handleChange}
        className="bg-transparent w-full"
        type="text"
        placeholder="Escribe algo"
      />
      <button
        type="submit"
        className="bg-[#4c7dfc] absolute  right-0 rounded-full p-3"
      >
        <IoSendSharp size={20} className=" text-white  " />
      </button>
    </form>
  );
};
