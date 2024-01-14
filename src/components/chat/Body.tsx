"use client"
import { useRef, useState, useEffect } from "react";
import { useSocket } from "context/SocketContext";
import { useConversation } from "context/ConversationContext";

interface ChatMessage {
  sender: string;
  message: string;
  read: boolean;
}

interface Chat {
  participants: [string, string];
  status: string;
  messages: ChatMessage[];
}

export const Body = ({
  receiverId,
  senderId,
}: {
  receiverId: string | null | undefined;
  senderId: string | null | undefined;
}) => {
  const { chats, setChats } = useConversation();
  const { socket, isConnected, on, emit } = useSocket();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const getChats = async (receiverId: string, senderId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat/${receiverId}/${senderId}`
    );
    const data = await res.json();
    console.log(data);
    setChats(data.messages);
  };

  useEffect(() => {
    if (receiverId && senderId) {
      getChats(receiverId, senderId);
    }
  }, [receiverId, senderId]);

  useEffect(() => {
    on("reciveMessage", (data) => {
      const newMessage: ChatMessage = {
        sender: data.senderId,
        message: data.message,
        read: false,
      };
      setChats((state) => [...state, newMessage]);
    });

    return () => {
      socket?.off("reciveMessage");
    };
  }, [on, emit, socket, setChats]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-scroll no-scrollbar flex flex-col gap-2"
    >
      {chats &&
        chats.map(({ sender, message }, index) =>
          sender === senderId ? (
            <div key={index} className="flex justify-end ">
              <div className="bg-[#4c7dfe] rounded-md py-2 px-4 font-normal text-white text-sm w-5/12 right-0">
                {message}
              </div>
            </div>
          ) : (
            <div key={index} className="flex items-start justify-start">
              <div className="bg-[#f9f9f9] rounded-md py-2 px-4 font-normal text-sm w-5/12 left-0">
                {message}
              </div>
            </div>
          )
        )}
    </div>
  );
};
