'use client';

import React, { useState } from 'react';
import SelectInput from './SelectInput';
import { ClockIcon } from 'lucide-react';

/* ---------- Time Picker (HH:MM) ---------- */
const TimePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [hours, setHours] = useState(
    value ? parseInt(value.split(':')[0]) : null
  );
  const [minutes, setMinutes] = useState(
    value ? parseInt(value.split(':')[1]) : null
  );

  const pad = (n) => String(n).padStart(2, '0');

  const handleSelect = (h, m) => {
    setHours(h);
    setMinutes(m);
    onChange(`${pad(h)}:${pad(m)}`);
    setIsOpen(false);
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = [0, 15, 30, 45];

  return (
    <div className="relative w-[90px]">
      {/* Input */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between px-2 py-[5px] rounded-lg text-[13px] cursor-pointer"
        style={{
          background: 'var(--input-enable-bg)',
          border: '1px solid var(--input-enable-border)',
        }}
      >
        <span className="text-[var(--select-input-value)]">
          {hours !== null && minutes !== null
            ? `${pad(hours)}:${pad(minutes)}`
            : 'hh:mm'}
        </span>
        <ClockIcon size={14} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border rounded-lg shadow flex">
          <div className="max-h-[150px] overflow-y-auto">
            {hourOptions.map((h) => (
              <div
                key={h}
                onClick={() => handleSelect(h, minutes ?? 0)}
                className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100"
              >
                {pad(h)}
              </div>
            ))}
          </div>

          <div className="max-h-[150px] overflow-y-auto border-l">
            {minuteOptions.map((m) => (
              <div
                key={m}
                onClick={() => handleSelect(hours ?? 0, m)}
                className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100"
              >
                {pad(m)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- Main Days + Time Component ---------- */
const DaysTimeInput = ({
  label,
  required,
  value = { days: '', time: '' },
  onChange,
  error,
}) => {
  const DAY_OPTIONS = [
    { label: '0 Day', value: '0' },
    { label: '1 Day', value: '1' },
    { label: '2 Days', value: '2' },
    { label: '3 Days', value: '3' },
    { label: '4 Days', value: '4' },
    { label: '5 Days', value: '5' },
  ];

  const handleDaysChange = (e) => {
    onChange({ ...value, days: e.target.value });
  };

  const handleTimeChange = (time) => {
    onChange({ ...value, time });
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Row */}
      <div className="flex items-center gap-2">
        {/* Days Dropdown */}
        <div className="w-[120px]">
          <SelectInput
            options={DAY_OPTIONS}
            value={value.days}
            onChange={handleDaysChange}
            placeholder="Days"
          />
        </div>

        {/* Time Picker */}
        <TimePicker value={value.time} onChange={handleTimeChange} />
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
};

export default DaysTimeInput;