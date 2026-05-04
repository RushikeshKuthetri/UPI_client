import React from "react";

const CheckboxInput = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer ">
      
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="
          w-4 h-4
          accent-purple-600
          cursor-pointer
        "
      />

      <span className="select-none">{label}</span>
    </label>
  );
};

export default CheckboxInput;
