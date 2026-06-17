import React, { useState, useRef, useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const helpButtonRef = useRef(null);
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Gradient", path: "/dashboard" },
    { name: "Stoppage Entry", path: "/transaction/stoppage-entry" },
    { name: "Meter Reading", path: "/transaction/meter-reading" },
    { name: "Process Parameter", path: "/transaction/process-order-confirm" },
    { name: "Process Order Confirmation", path: "/transaction/process-order-confirm" },
    { name: "Reversal Process Order", path: "/transaction/grade-change" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpButtonRef.current && !helpButtonRef.current.contains(event.target)) {
        setShowHelpPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHelpItemClick = (path) => {
    navigate(path);
    setShowHelpPopup(false);
  };

  return (
    <div  className="w-full h-14 shadow-left-drawer-light dark:shadow-left-drawer-dark bg-[var(--bg-header)] px-6 flex items-center justify-between relative z-50">
 

 
      {/* LEFT: Brand */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/adityabirlalogo.png" className="h-[50px] w-[50px]" alt="logo1" />
          {/* <img src="/loader.png" className="h-[45px] w-[80px] align-center mb-[5px]" alt="logo2" /> */}
        </div>
 
      
 
         <h1 className=" -ml-2  text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl text-[var(--header-text-color)] font-medium font-poppins tracking-tight text-center">
         UTCL Process Integrator
        </h1> 
      </div>
 
      {/* RIGHT: User + Logout */}
     <div className="flex items-center gap-3 relative">
  
  {/* Help icon */}
  <button 
    ref={helpButtonRef}
    onClick={() => setShowHelpPopup(!showHelpPopup)}
    className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#FFFFF] transition hover:opacity-80"
  >
    <span className="text-[#FFFFFF] text-sm font-bold">?</span>
  </button>

  {/* Help Popup */}
  {showHelpPopup && (
    <div
      className="absolute top-5 right-40 mt-2 bg-[var(--bg-color)] rounded-lg shadow-xl z-50  "
      style={{
        minWidth: "190px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="max-h-[400px] overflow-y-auto">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleHelpItemClick(item.path)}
            onMouseEnter={() => setHoveredItemIndex(index)}
            onMouseLeave={() => setHoveredItemIndex(null)}
            className={`w-full px-2 py-1.5 text-left text-[13px] transition-colors duration-150 cursor-pointer first:rounded-t-lg last:rounded-b-lg ${
              hoveredItemIndex === index
                ? 'bg-[var(--bg-header-hover)] text-[var(--text-color)]'
                : 'text-[var(--text-color)]'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )}

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
