import { send, upload } from "@/assets";
import Image from "next/image";
import React, { Dispatch, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { ChatMessage } from "./Chat";
import { User } from "./ChatApplication";

interface InputProps {
  user: User;
  socket: Socket;
  setChat: Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const Input: React.FC<InputProps> = ({ user, socket, setChat }) => {
  const [input, setInput] = useState("");
  const uploadInput = useRef<HTMLInputElement | null>(null);

  const userTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const sendMessage = () => {
    if (input) {
      const msg: ChatMessage = {
        content: input,
        type: "text",
        user,
      };
      socket.emit("send_message", msg);
      setChat((prev) => [...prev, msg]);
      setInput("");
    } else {
      uploadInput.current?.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file?.type === "image/jpeg" || file?.type === "image/png") {
      const img = URL.createObjectURL(file);
      const msg: ChatMessage = {
        content: img,
        type: "image",
        user,
      };

      setChat((prev) => [...prev, msg]);
      socket.emit("send_message", msg);
    }
  };

  return (
    <div className="w-full absolute bottom-0 text-xl grid grid-cols-5 gradient md:bg-none md:text-3xl md:flex md:justify-center md:relative">
      <input
        className="focus:outline-none rounded-2xl p-3 text-gray-900 placeholder-slate-200 col-span-4 gradient md:w-6/12 md:mr-3"
        type="text"
        placeholder="Enter your message"
        onChange={(e) => userTyping(e)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.key === "Enter" && sendMessage()
        }
        value={input}
      />
      <input
        className="hidden"
        type="file"
        ref={uploadInput}
        onChange={(e) => handleImageUpload(e)}
      />
      <button
        onClick={sendMessage}
        className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-1/12 md:text-2xl"
      >
        <Image
          src={input ? send : upload}
          className="w-6 md:w-12 mx-auto"
          alt="send"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};

export default Input;
