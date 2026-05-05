import React from "react";
import { BiLogOutCircle, BiUser } from "react-icons/bi";

export default function Header() {
  return (
    <div  className="w-full h-14 shadow-left-drawer-light dark:shadow-left-drawer-dark bg-[var(--bg-header)] px-6 flex items-center justify-between relative z-50">
 

 
      {/* LEFT: Brand */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/adityabirlalogo.png" className="h-[50px] w-[50px]" alt="logo1" />
          {/* <img src="/loader.png" className="h-[45px] w-[80px] align-center mb-[5px]" alt="logo2" /> */}
        </div>
 
      
 
         <h1 className=" -ml-2 text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl text-[var(--header-text-color)] font-medium font-poppins tracking-tight text-center">
         UTCL Process Integrator
        </h1>
      </div>
 
      {/* RIGHT: User + Logout */}
     <div className="flex items-center gap-3">
  
  {/* Help icon */}
  <button className="flex items-center  justify-center w-8 h-8 rounded-full border-2 border-[#FFFFF] transition hover:opacity-80">
    <span className="text-[#FFFFFF] text-sm font-bold">?</span>
  </button>

  {/* Vertical divider */}
  <div className="w-[1.5px] h-8 bg-[var(--header-text-color)] opacity-60" />

  {/* Person icon + Welcome text */}
  <div className="flex items-center gap-2">
    <button className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--header-text-color)] transition hover:opacity-80">
      <BiUser size={18} className="text-black" />
    </button>
    <div className="flex flex-col leading-tight">
      <span className="text-xs text-[var(--header-text-color)] opacity-80">Welcome,</span>
      <span className="text-sm font-bold text-[var(--header-text-color)]">John Doe</span>
    </div>
  </div>

  {/* Logout */}
  {/* <button
    className="flex items-center justify-center p-2 rounded-lg transition-all duration-200 text-[var(--header-text-color)] hover:bg-[var(--left-drawer-active-tab)] hover:text-[#111111]"
  >
    <BiLogOutCircle size={20} className="rotate-90" />
  </button> */}

</div>
 
    </div>
  );
}
