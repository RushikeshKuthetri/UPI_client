import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

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
            <span className="text-sm font-medium text-[var(--header-text-color)]">
              Welcome{" "}
              {/* <span className="font-semibold">{authProvider?.username}</span> */}
               <span className="font-semibold">Rahul</span>
            </span>

            <button
            //   onClick={() => onLogoutClick(instance)}
              className="
      flex items-center justify-center
      p-2 rounded-lg
      transition-all duration-200
      text-[var(--header-text-color)]
      hover:bg-[var(--left-drawer-active-tab)]
      hover:text-[#111111]
    "
            >
              <BiLogOutCircle size={20} className="rotate-90" />
            </button>
          </div>
 
    </div>
  );
}
