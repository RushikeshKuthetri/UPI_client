'use client';
import React, { useState } from 'react';
import FormLabel from '../../components/Common/TitleAndLabel/InputLabel';
import SelectInput from '../../components/Common/Form/Inputs/SelectInput';
import SubmitButton from '../../components/Common/Form/Buttons/SubmitButton';
import Table1 from '../../components/Common/Table/Table';
import Pagination from '../../components/Common/Pagination/Pagination';
import { RefreshCcw, Plus } from 'lucide-react';
import AddNewModal from '../../components/Common/Modals/AddNewModal';
import DateTimePicker from '../../components/Common/Form/Inputs/DatePicker';
import ResetButton from '../../components/Common/Form/Buttons/ResetButton';
import ActionButton from '../../components/Common/Form/Buttons/ActionButton';
import Title from '../../components/Common/TitleAndLabel/Title';

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
    if (!form.date || !form.plant || !form.line) {
      alert('Please fill in all required fields (Date, Plant Name, and Line)');
      return;
    }
    setTableData(MOCK_DATA);
    setShowTable(true);
  };

  return (
    <div className="w-full h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <Title label="Stoppage Alert" />
      </div>

      {/* Filters */}
      <div className="flex w-full flex-wrap items-end justify-start gap-4 px-4 py-3.5 rounded-xl border border-[var(--form-border)]">

        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Select Date</FormLabel>
          <DateTimePicker
            value={form.date}
            // onChange={(date) => setStartDate(date)}
            onChange={(date) => setForm((prev) => ({ ...prev, date }))}
            placeholder="Select Date"
            showTime={false}
            dateFormat="dd/MM/yyyy"
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
          <ResetButton onClick={handleReset} />
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>

      {/* Contents seen after clicking Submit Button */}
      {showTable && (
        <>
          <div className="flex my-2 items-center justify-start gap-2">
            <ActionButton icon={Plus} label="Add New" onClick={() => setIsModalOpen(true)} />

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