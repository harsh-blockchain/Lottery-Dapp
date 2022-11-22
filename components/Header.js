import Image from "next/image";
import React from "react";
import logo from "../pages/logo.png";
import NavButton from "./NavButton";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const Header = ({ account, buy }) => {
  return (
    <header className="grid justify-between items-center p-6 grid-cols-2 md:grid-cols-5">
      <div className="flex items-center space-x-3">
        <Image src={logo} className="h-20 w-20 rounded-full" alt="my-logo" />

        <div>
          <div className="text-xl text-white font-bold">
            Decentralized Lottery Draw
          </div>
          <div className="text-md text-emerald-500 truncate">
            User : {account?.slice(0, 6)}....
            {account?.slice(-6, account?.length)}
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center rounded-md md:col-span-3">
        <div className="bg-[#0a1f1c] space-x-5 px-8 py-4 rounded-xl">
          <NavButton title="Buy Ticket" isActive onClick={buy} />
          <NavButton title="Logout" />
        </div>
      </div>

      <div className="items-center ml-auto text-right">
        <Bars3BottomRightIcon className="h-8 w-8 text-white cursor-pointer hover:scale-125 mr-5 duration-300 transition-all transform" />
      </div>
    </header>
  );
};

export default Header;
