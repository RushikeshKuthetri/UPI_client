import React, { useState } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import TimeInput from '../../components/Common/Form/TimeInput'
import { CalendarCheck, ClockFading, Merge, PersonStanding, RefreshCcw, SendHorizontal, SquarePen, Upload } from 'lucide-react'
import CheckboxInput from '../../components/Common/Form/CheckboxInput'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import IconButton from '../../components/Common/Form/IconButton'

const PLANT_OPTIONS = [
  { label: 'Plant A', value: 'plant_a' },
  { label: 'Plant B', value: 'plant_b' },
]

const LINE_OPTIONS = [
  { label: 'Line 1', value: 'line_1' },
  { label: 'Line 2', value: 'line_2' },
]

// ── Tooltip Icon Button ──────────────────────────────────────────


const MOCK_DATA = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  selected: false,
  resource: 'U1CLML',
  material: 'N53CEM...',
  startTime: '00:00:00',
  stopTime: '07:22:02',
  duration: '07:22:02',
  reason: 'GM02',
  remarks: 'test',
  sapStatus: '',
}))

const RESOURCE_MOCK_DATA = [
  { id: 1, selected: false, resource: '24:00:00' },

]

const GradeChange = () => {
  const [tableData, setTableData] = useState(MOCK_DATA)
  const [resourceData, setResourceData] = useState(RESOURCE_MOCK_DATA)
  const [form, setForm] = useState({
    date: '',
    plant: '',
    line: '',
    startTime: '',
    endTime: '',
  })

  const toggleSelect = (id) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, selected: !row.selected } : row))
    )
  }

  const toggleResourceSelect = (id) => {
  setResourceData((prev) =>
    prev.map((row) => (row.id === id ? { ...row, selected: !row.selected } : row))
  )
}

  const columns = [
    {
      key: 'selected',
      label: 'Select',
      render: (value, row) => (
        <CheckboxInput
          checked={value}
          onChange={() => toggleSelect(row.id)}
        />
      ),
    },
    { key: 'resource', label: 'Resource' },
    { key: 'material', label: 'Material' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'stopTime', label: 'Stop Time' },
    { key: 'duration', label: 'Duration' },
    { key: 'reason', label: 'Reason' },
    { key: 'remarks', label: 'Remarks' },
    {
      key: 'action',
      label: 'Action',
      render: (_, row) => (
        <button className="transition hover:opacity-70" style={{ color: '#8A38F5' }}>
          <SquarePen size={16} strokeWidth={2.5} />
        </button>
      ),
    },
    {
      key: 'sapStatus',
      label: 'SAP status',
      render: (value) => (
        <span className="text-sm" style={{ color: 'var(--text-color)' }}>
          {value || '—'}
        </span>
      ),
    },
  ]

  const resourceColumns = [
  {
    key: 'selected',
    label: 'Select',
    render: (value, row) => (
      <CheckboxInput
        checked={value}
        onChange={() => toggleResourceSelect(row.id)}
      />
    ),
  },
  { key: 'resource', label: 'Resource' },
]

  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }))

  const handleReset = () =>
    setForm({ date: '', plant: '', line: '', startTime: '', endTime: '' })

  const handleSubmit = () => console.log('Submitted:', form)

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Grade Change
        </h2>
      </div>

      {/* Filters */}
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

      {/* Actions row */}
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
        <div className="flex my-2 items-center justify-end gap-4 mx-6">
          <IconButton icon={ClockFading} tooltip="Shift Duration" />
          <IconButton icon={Merge} tooltip="Merge" />
          <IconButton icon={PersonStanding} tooltip="Person" />
          <IconButton icon={Upload} tooltip="Upload" />
          <IconButton icon={CalendarCheck} tooltip="Calendar" />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <Table1
          columns={columns}
          data={tableData}
        />
        <Pagination/>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <label > Resource Wise Duration</label>
          <div className="overflow-x-auto w-full mt-2 mb-4">
    <Table1
      columns={resourceColumns}
      data={resourceData}
    />
  </div>
      </div>

    </div>
  )
}

export default GradeChange