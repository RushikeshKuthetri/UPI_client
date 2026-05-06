'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import FormLabel from '../Form/InputLabel';
import SelectInput from '../Form/SelectInput';
import TimeRangeInput from '../Form/TimeRangeInput';
import DaysTimeInput from '../Form/DaysTimeInput';

const AddNewModal = ({ isOpen, onClose }) => {

 
  const [timeRange, setTimeRange] = useState({
    from: '',
    to: '',
  });

  const [downtime, setDowntime] = useState({
    days: '',
    time: '',
  });

  const [startDowntime, setStartDowntime] = useState({
    days: '',
    time: '',
  });

  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl px-6 py-5 shadow-2xl flex flex-col"
        style={{ background: 'var(--modal-bg, #f4f4f4)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:opacity-70"
          style={{ color: 'var(--card-subtle)' }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2
          className="text-center text-[18px] font-semibold mb-4"
          style={{ color: 'var(--title)' }}
        >
          Stoppage Alert Information
        </h2>

        {/* Stop Info */}
        <h3 className="text-[14px] font-semibold mb-2 text-orange-600">
          Stop Information :
        </h3>

        <div className="grid grid-cols-3 gap-x-5 gap-y-3 mb-4">

          <div className="flex flex-col gap-1">
            <FormLabel required>Line</FormLabel>
            <SelectInput placeholder="Select Line" />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Resource</FormLabel>
            <SelectInput placeholder="Select Resource" />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Stop Date</FormLabel>
            <input
              type="date"
              className="w-full px-3 py-[5px] rounded-lg text-[13px]"
              style={{
                background: 'var(--input-enable-bg)',
                border: '1px solid var(--input-enable-border)',
              }}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <TimeRangeInput
              fromValue={timeRange.from}
              toValue={timeRange.to}
              onFromChange={(val) =>
                setTimeRange((prev) => ({ ...prev, from: val }))
              }
              onToChange={(val) =>
                setTimeRange((prev) => ({ ...prev, to: val }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Stoppage Type</FormLabel>
            <SelectInput placeholder="Select Stoppage Type" />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Impact on Dispatch</FormLabel>
            <SelectInput placeholder="Select Impact in Dispatch" />
          </div>

          <div className="flex flex-col gap-1">
            <DaysTimeInput
              label="Expected Downtime"
              required
              value={downtime}
              onChange={setDowntime}
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Stock Position</FormLabel>
            <SelectInput placeholder="Select Stock Position" />
          </div>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <FormLabel required>Reason for Stoppage</FormLabel>
          <textarea
            rows={3}
            placeholder="Enter Reason for Stoppage..."
            className="w-full px-3 py-2 rounded-lg text-[13px]"
            style={{
              background: 'var(--input-enable-bg)',
              border: '1px solid var(--input-enable-border)',
            }}
          />
          <div className="text-right text-xs mt-1 text-gray-400">0 / 10</div>
        </div>

        {/* Start Info */}
        <h3 className="text-[14px] font-semibold mb-2 text-orange-600">
          Start Information :
        </h3>

        <div className="grid grid-cols-3 gap-x-5 gap-y-3 mb-4">

          <div className="flex flex-col gap-1">
            <FormLabel required>Start Date</FormLabel>
            <input
              type="date"
              className="w-full px-3 py-[5px] rounded-lg text-[13px]"
              style={{
                background: 'var(--input-enable-bg)',
                border: '1px solid var(--input-enable-border)',
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Start Time</FormLabel>
            <input
              type="time"
              className="w-full px-3 py-[5px] rounded-lg text-[13px]"
              style={{
                background: 'var(--input-enable-bg)',
                border: '1px solid var(--input-enable-border)',
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <DaysTimeInput
              label="Expected Downtime"
              required
              value={startDowntime}
              onChange={setStartDowntime}
            />
          </div>
        </div>

        {/* Root Cause */}
        <div className="mb-5">
          <FormLabel required>Root Cause for Stoppage</FormLabel>
          <textarea
            rows={3}
            placeholder="Root Cause for Stoppage..."
            className="w-full px-3 py-2 rounded-lg text-[13px]"
            style={{
              background: 'var(--input-enable-bg)',
              border: '1px solid var(--input-enable-border)',
            }}
          />
          <div className="text-right text-xs mt-1 text-gray-400">0 / 10</div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-sm font-medium"
            style={{
              border: '1.5px solid var(--button-border)',
              background: 'var(--button-bg)',
              color: 'var(--text-color)',
            }}
          >
            Close
          </button>

          <button
            className="px-5 py-1.5 rounded-lg text-sm font-medium text-white"
            style={{ background: 'var(--submit-button-bg)' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewModal;