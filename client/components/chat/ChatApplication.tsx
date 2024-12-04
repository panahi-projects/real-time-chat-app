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
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("receive_message");
    };
  });

  useEffect(() => {
    socket.emit("client_ready", "Hello from client");
  }, []);
  return (
    <div className="h-screen max-h-screen max-w-screen-sm mx-auto md:container md:p-20 md:pt-4">
      {user.current ? (
        <>
          <Chat user={user.current} chat={chat} typing={typing} />
          <Input setChat={setChat} user={user.current} socket={socket} />
        </>
      ) : (
        <Signup user={user} socket={socket} input={input} setInput={setInput} />
      )}
    </div>
  );
};

export default ChatApplication;
