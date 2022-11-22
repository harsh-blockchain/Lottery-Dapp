//login component
import Image from "next/image";
import React, { useState } from "react";
import logo from "../pages/logo.png";

const Login = ({ connectWallet }) => {
  return (
    <div className="bg-[#091b18] min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <Image
          src={logo}
          width={200}
          height={200}
          alt="logo"
          className="rounded-full h-56 w-56 mb-19"
        />

        <div className="text-6xl text-white font-bold py-3">
          The Decentralized lottery
        </div>
        <div className="text-white text-2xl">
          Get Started by login in with your Metamask Wallet
        </div>
        <button
          className="bg-white px-9 py-5 mt-10 rounded-2xl shadow-xl font-bold hover:scale-110 ease-in-out duration-300 transition-all hover:bg-orange-400 text-2xl"
          onClick={connectWallet}
        >
          Login with Metamask
        </button>
      </div>
    </div>
  );
};

export default Login;
