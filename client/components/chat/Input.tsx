import Image from "next/image";
import { send, upload } from "@/assets";
import { useState } from "react";

const Input = () => {
  const [input, setInput] = useState("x");
  return (
    <div className="w-full absolute bottom-0 text-xl grid grid-cols-5 gradient md:bg-none md:text-3xl md:flex md:justify-center md:relative">
      <input
        className="focus:outline-none rounded-2xl p-3 text-gray-900 placeholder-slate-200 col-span-4 gradient md:w-6/12 md:mr-3"
        type="text"
        placeholder="Enter your message"
      />
      <input className="hidden" type="file" />
      <button className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-1/12 md:text-2xl">
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
