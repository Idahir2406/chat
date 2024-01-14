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

  messages: Message[];

}

interface ConversationContextProps {
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[]>>;
  addNewMessage: (message: Message, chatId: string) => void;
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
  const [chats, setChats] = useState([]  );

  const addNewMessage = (message: Message) => {
    setChats([...chats, message]);
  };

  return (
    <ConversationContext.Provider value={{ chats, setChats, addNewMessage }}>
      {children}
    </ConversationContext.Provider>
  );
};
