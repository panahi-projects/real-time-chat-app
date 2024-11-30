import { FC, useEffect, useRef } from "react";
import { Message, ServerMessage, Typing } from "./Messages";
import { User } from "./ChatApplication";

export interface ChatMessage {
  user: {
    id: string;
    name: string;
  } | null;
  content: string;
  type: "text" | "user" | "server" | null;
  own?: boolean; // Added dynamically in the component
}

interface ChatProps {
  chat: ChatMessage[];
  user: {
    id: string;
    name?: string;
  };
  typing: User[]; // Array of usernames who are typing
}

const Chat: FC<ChatProps> = ({ chat, user, typing }) => {
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scroller.current) return;

    scroller.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chat]);

  return (
    <div className="h-full pb-12 md:p-4">
      <div className="w-full h-full rounded-md overflow-y-auto bg-gradient-to-t from-cyan-500 to-blue-500 pt-2 md:pt-6">
        {chat.map((message, index) => {
          const enhancedMessage = {
            ...message,
            own: message.user?.id === user.id,
          };
          return message.type === "server" ? (
            <ServerMessage key={index} {...enhancedMessage} />
          ) : (
            <Message key={index} {...enhancedMessage} />
          );
        })}
        {typing[0] && <Typing user={typing[0]} />}
        <div ref={scroller} className="pb-2 md:pb-6" />
      </div>
    </div>
  );
};

export default Chat;
