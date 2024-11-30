"use client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Signup from "./Signup";
import Chat, { ChatMessage } from "./Chat";
import Input from "./Input";

export type User = { name: string; id: string } | null; // User can be a filled or null

// Initialize the socket
const socket: Socket = io("http://localhost:3001");

const ChatApplication = () => {
  // Ref for the current user
  const user = useRef<User>(null);
  // State for input field
  const [input, setInput] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([
    {
      content: "Hello Alaki",
      type: "text",
      user: {
        id: "0",
        name: "guest",
      },
    },
    {
      content: "Hi guest",
      type: "text",
      user: {
        id: "1",
        name: "Alaki",
      },
    },
  ]);
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    socket.emit("client_ready", "Hello from client");
  }, []);
  return (
    <div className="h-screen max-h-screen max-w-screen-sm mx-auto md:container md:p-20 md:pt-4">
      {user.current ? (
        <>
          <Chat user={user.current} chat={chat} typing={typing} />
          <Input />
        </>
      ) : (
        <Signup user={user} socket={socket} input={input} setInput={setInput} />
      )}
    </div>
  );
};

export default ChatApplication;
