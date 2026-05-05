import React, { useState } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import { ClockFading, Merge, RefreshCcw, SendHorizontal, Split, SquarePen, TableProperties ,Undo2,Upload} from 'lucide-react'
import IconButton from '../../components/Common/Form/IconButton'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'

const PLANT_OPTIONS = [
  { label: 'Plant A', value: 'plant_a' },
  { label: 'Plant B', value: 'plant_b' },
]

const LINE_OPTIONS = [
  { label: 'Line 1', value: 'line_1' },
  { label: 'Line 2', value: 'line_2' },
]

const MOCK_DATA = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  resource: 'U1CLML',
  stopTime: '07:22:02',
  startTime: '07:22:02',
  duration: '00:00:23',
  material: 'N53C..',
  type: '',
  reason: '',
  department: '',
  equipment: '',
  remarks: '',
  sapStatus: '',
}))

const StoppageEntry = () => {
  const [form, setForm] = useState({
    date: '',
    plant: '',
    line: '',
  })

const [tableData, setTableData] = useState(MOCK_DATA)

const columns = [
  { key: 'resource', label: 'Resource' },
  { key: 'stopTime', label: 'Stop Time' },
  { key: 'startTime', label: 'Start Time' },
  { key: 'duration', label: 'Duration' },
  { key: 'material', label: 'Material' },
  { key: 'type', label: 'Type' },
  { key: 'reason', label: 'Reason' },
  { key: 'department', label: 'Department' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'remarks', label: 'Remarks' },
  {
    key: 'action',
    label: 'Action',
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <button
          className="transition hover:opacity-70"
          style={{ color: '#8A38F5' }}
        >
          <SquarePen size={15} strokeWidth={2.5} />
        </button>
        <button
          className="transition hover:opacity-70"
          style={{ color: '#14B8A6' }}
        >
          <Split size={15} strokeWidth={2.5} />
        </button>
      </div>
    ),
  },
  {
    key: 'sapStatus',
    label: 'SAP Status',
    render: (value) => (
      <span className="text-sm" style={{ color: 'var(--text-color)' }}>
        {value || '—'}
      </span>
    ),
  },
]

  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }))

  const handleReset = () => setForm({ date: '', plant: '', line: '' })

  const handleSubmit = () => console.log('Submitted:', form)

  return (
    <div className="w-full h-full">

      {/* Page Title */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Stoppage Entry
        </h2>
      </div>

      {/* Filter Card */}
      <div className="flex w-full flex-wrap items-end justify-center gap-4 px-4 py-6 rounded-xl border border-[var(--form-border)]">
        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Select Date</FormLabel>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            className="px-3 py-[5px] rounded-lg text-[13px] outline-none transition w-full"
            style={{
              background: 'var(--input-enable-bg)',
              border: '1px solid var(--input-enable-border)',
              color: form.date ? 'var(--picker-text)' : 'var(--search-placeholder)',
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

       <div className="flex items-center justify-between">
        <div className="flex my-2 items-center justify-start gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: 'var(--submit-button-bg)' }}
          >
            <SendHorizontal size={14} />
            Send to SAP
          </button>
          <label className="text-[var(--text-color)] text-sm font-medium">
            2 items selected
          </label>
        </div>

        {/* Icon buttons with tooltips */}
        <div className="flex my-2 items-center justify-end gap-4 mr-10">
          <IconButton icon={Upload} tooltip="Upload" />
            <IconButton icon={TableProperties} tooltip="Excel Template" />
       
        
        </div>
        
      </div>
      <div className="overflow-x-auto w-full mt-1 mb-8">
  <Table1
    columns={columns}
    data={tableData}
  />
  <Pagination/>
</div>

    </div>
  )
}

export default StoppageEntry