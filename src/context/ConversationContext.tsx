import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Message {
  sender: string;
  message: string;
  read: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface Chat {
  sender: string;
  message: string;
  messages: Message[];
}

interface ChatMessage {
  messageId: string;
  sender: string;
  content: string;
  timestamp: string;
  // Puedes agregar más propiedades según tus requisitos
}


interface ConversationContextProps {
  chats: (Chat | ChatMessage)[]; // Permitir que el array contenga Chat o ChatMessage
  setChats: Dispatch<SetStateAction<(Chat | ChatMessage)[]>>;
  addNewMessage: (message: Message, chatIndex: number) => void;
}
const defaultChats: Chat[] = [];

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};

export const ConversationContext = createContext<
  ConversationContextProps | undefined
>(undefined);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState(defaultChats);

  const addNewMessage = (message: Message, chatIndex: number) => {
    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      updatedChats[chatIndex].messages.push(message);
      return updatedChats;
    });
  };

  return (
    <ConversationContext.Provider value={{ chats, setChats, addNewMessage }}>
      {children}
    </ConversationContext.Provider>
  );
};
