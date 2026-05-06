'use client';
import React, { useState } from 'react';
import FormLabel from '../../components/Common/Form/InputLabel';
import SelectInput from '../../components/Common/Form/SelectInput';
import SubmitButton from '../../components/Common/Form/SubmitButton';
import Table1 from '../../components/Common/Table/Table';
import Pagination from '../../components/Common/Pagination/Pagination';
import { RefreshCcw, Plus } from 'lucide-react';
import AddNewModal from '../../components/Common/Modals/AddNewModal';

const PLANT_OPTIONS = [
  { label: 'Plant A', value: 'plant_a' },
  { label: 'Plant B', value: 'plant_b' },
];

const LINE_OPTIONS = [
  { label: 'Line 1', value: 'line_1' },
  { label: 'Line 2', value: 'line_2' },
];

const MOCK_DATA = [
  {
    id: 1,
    resource: 'U1CLML',
    stopDate: '06/05/2026',
    stopTime: '07:22:02',
    reason: 'GM02',
    stack: 'A1',
  },
];

const StoppageAlert = () => {
  const [form, setForm] = useState({
    date: '',
    plant: '',
    line: '',
  });

  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // ✅ Modal state added
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { key: 'resource', label: 'Resource' },
    { key: 'stopDate', label: 'Stop Date' },
    { key: 'stopTime', label: 'Stop Time' },
    { key: 'reason', label: 'Stoppage Reason' },
    { key: 'stack', label: 'Stack Position' },
  ];

  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }));

  const handleReset = () => {
    setForm({ date: '', plant: '', line: '' });
    setShowTable(false);
    setTableData([]);
  };

  const handleSubmit = () => {
    setTableData(MOCK_DATA);
    setShowTable(true);
  };

  return (
    <div className="w-full h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Stoppage Alert
        </h2>
      </div>

      {/* Filters */}
      <div className="flex w-full flex-wrap items-end justify-center gap-4 px-4 py-6 rounded-xl border border-[var(--form-border)]">

        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Select Date</FormLabel>
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, date: e.target.value }))
            }
            className="px-3 py-[5px] rounded-lg text-[13px] outline-none transition w-full"
            style={{
              background: 'var(--input-enable-bg)',
              border: '1px solid var(--input-enable-border)',
              color: form.date
                ? 'var(--picker-text)'
                : 'var(--search-placeholder)',
            }}
          />
        </div>

        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Plant Name</FormLabel>
          <SelectInput
            options={PLANT_OPTIONS}
            value={form.plant}
            onChange={handleSelect('plant')}
            placeholder="Select Plant"
          />
        </div>

        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Select Line</FormLabel>
          <SelectInput
            options={LINE_OPTIONS}
            value={form.line}
            onChange={handleSelect('line')}
            placeholder="Select Line"
          />
        </div>

        <div className="flex items-center gap-2 pb-[2px]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-[6px] rounded-lg text-sm font-medium transition hover:opacity-80"
            style={{
              border: '1.5px solid var(--button-border)',
              background: 'var(--button-bg)',
              color: 'var(--text-color)',
            }}
          >
            <RefreshCcw size={14} />
            Reset
          </button>

          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>

      {/* Contents seen after clicking Submit Button */}
      {showTable && (
        <>
          <div className="flex my-2 items-center justify-start gap-2">
            <button
              onClick={() => setIsModalOpen(true)} // ✅ added
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium text-white transition hover:opacity-90"
              style={{ background: 'var(--submit-button-bg)' }}
            >
              <Plus size={14} />
              Add New
            </button>

            <label className="text-[var(--text-color)] text-sm font-medium">
              2 items selected
            </label>
          </div>

          <div className="overflow-x-auto w-full mt-2">
            <Table1 columns={columns} data={tableData} />
            <Pagination />
          </div>
        </>
      )}

      {/* ✅ Modal render */}
      <AddNewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};

export default StoppageAlert;