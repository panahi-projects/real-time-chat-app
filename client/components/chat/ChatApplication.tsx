"use client";
import { useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Signup from "./Signup";

type User = { name: string; id: string } | null; // User can be a filled or null

// Initialize the socket
const socket: Socket = io("http://localhost:3001");

const ChatApplication = () => {
  // Ref for the current user
  const user = useRef<User>(null);
  // State for input field
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <Signup user={user} socket={socket} input={input} setInput={setInput} />
    </div>
  );
};

export default ChatApplication;
