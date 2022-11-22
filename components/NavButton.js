import React from "react";

const NavButton = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive
          ? "bg-[#036756] hover-[#036757] font-bold text-white py-2 px-2 rounded-lg hover:scale-110 duration-300 transition-all transform"
          : "text-white font-semibold hover:text-slate-300 hover:scale-110 duration-300 transition-all transform"
      }`}
    >
      {title}
    </button>
  );
};

export default NavButton;
