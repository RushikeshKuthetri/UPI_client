
import { CalendarDays, Clock } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const TextInput = ({
  value,
  onChange,
  error,
  placeholder,
  rows = 1,
  isPassword = false,
  disabled,
  type = "text"
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputId = useId();
  const inputRef = useRef(null);


  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;





 
  useEffect(() => {
  const style = document.createElement("style");
  style.innerHTML = `
    input.no-password-toggle::-ms-reveal,
    input.no-password-toggle::-ms-clear {
      display: none;
    }

    input.no-password-toggle::-webkit-password-toggle-button {
      visibility: hidden;
      pointer-events: none;
    }

    input[type="date"]::-webkit-calendar-picker-indicator,
    input[type="time"]::-webkit-calendar-picker-indicator {
      opacity: 0;
      display: none;
    }

    /* ✅ number arrows remove */
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  `;
  document.head.appendChild(style);

  return () => document.head.removeChild(style);
}, []);

  const isDate = type === "date";
  const isTime = type === "time";
  const isNumber = type === "number";
  const hasRightIcon = isPassword || isDate || isTime  || isNumber ;

  const handleKeyDown = (e) => {
  if (isNumber && ["e", "E", "+", "-"].includes(e.key)) {
    e.preventDefault();
  }
};

  return (

    <div className="relative w-full">
      {rows === 1 ? (
        <>

          {/* <input
            ref={inputRef}
            disabled={disabled}
            id={inputId}
            type={inputType}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            style={
              isDate || isTime
                ? { colorScheme: "light dark" }
                : undefined
            }
            className={`w-full p-0.5 rounded-lg border
                border-[var(--input-enable-border)]
                text-[var(--picker-text)]
                focus:outline-none
                focus:ring-[0.2px] focus:ring-[#767575] 
                placeholder:text-sm
                placeholder:text-[var(--search-placeholder)]
                pl-2
                transition-all duration-200
                ${disabled ? "bg-[var(--input-disable-bg)] cursor-not-allowed": "bg-[var(--input-enable-bg)]"}
                ${hasRightIcon ? "pr-10" : ""}
                ${isPassword ? "no-password-toggle" : ""}
  `}
          /> */}

          <input
  ref={inputRef}
  disabled={disabled}
  id={inputId}
  type={inputType}
  value={value}
  placeholder={placeholder}
  onChange={onChange}
  onKeyDown={handleKeyDown}
  style={
    isDate || isTime
      ? { colorScheme: "light dark" }
      : undefined
  }
  className={`w-full p-0.5 rounded-lg border
    border-[var(--input-enable-border)]
    text-[var(--picker-text)]
    focus:outline-none
    focus:ring-[0.2px] focus:ring-[#767575]
    placeholder:text-sm
    placeholder:text-[var(--search-placeholder)]
    pl-2
    transition-all duration-200
    ${disabled ? "bg-[var(--input-disable-bg)] cursor-not-allowed" : "bg-[var(--input-enable-bg)]"}
    ${hasRightIcon ? "pr-10" : ""}
    ${isPassword ? "no-password-toggle" : ""}
  `}
/>


          {/* ✅ PASSWORD ICON */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 "
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}


          {isDate && (
            <CalendarDays
              size={18}
              onClick={() => inputRef.current?.showPicker()}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
            />
          )}



          {isTime && (
            <Clock
              size={18}
              onClick={() => inputRef.current?.showPicker()}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
            />
          )}

        </>
      ) : (
        <>
          <label
            htmlFor={inputId}
            className={`absolute left-1 transition-all duration-200 pointer-events-none
              ${isFocused || value
                ? "text-xs -top-2 text-slate-300 px-1.5"
                : "text-slate-400 top-2 px-1.5"
              }`}
          >
            {placeholder}
          </label>

          <textarea
            id={inputId}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            className={`w-full p-1.5 rounded-lg border
              ${error ? "border-red-500" : "border-slate-600"}
              focus:outline-none resize-none`}
          />
        </>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
