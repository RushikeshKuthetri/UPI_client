import React, { useState } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import { Check, ClockFading, Merge, RefreshCcw, SendHorizontal, Split, SquarePen, TableProperties ,Undo2,Upload, X} from 'lucide-react'
import IconButton from '../../components/Common/Form/IconButton'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import TextInput from '../../components/Common/Form/TextInput'

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
const [editingId, setEditingId] = useState(null)
const [editForm, setEditForm] = useState({})

const inlineInput = (field, placeholder) => (value, row) => {
  if (editingId === row.id) {
    return (
      <input
        value={editForm[field] ?? ''}
        onChange={handleEditChange(field)}
        placeholder={placeholder}
        className="px-1 py-0.5 rounded text-[12px] outline-none border"
        style={{
          background: 'var(--input-enable-bg)',
          border: '1px solid var(--input-enable-border)',
          color: 'var(--picker-text)',
          width: '60px',       // 👈 fixed width instead of minWidth
        }}
      />
    )
  }
  return <span>{value || '—'}</span>
}

const inlineSelect = (field, options, placeholder) => (value, row) => {
  if (editingId === row.id) {
    return (
      <select
        value={editForm[field] ?? ''}
        onChange={handleEditChange(field)}
        className="px-1 py-0.5 rounded text-[12px] outline-none border"
        style={{
          background: 'var(--input-enable-bg)',
          border: '1px solid var(--input-enable-border)',
          color: 'var(--picker-text)',
          width: '75px',       // 👈 fixed width
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    )
  }
  return <span>{value || '—'}</span>
}

// dummy options
const TYPE_OPTIONS = [{ label: 'Type A', value: 'type_a' }]
const REASON_OPTIONS = [{ label: 'GM02', value: 'gm02' }]
const DEPT_OPTIONS = [{ label: 'Dept 1', value: 'dept_1' }]
const EQUIP_OPTIONS = [{ label: 'Equip 1', value: 'equip_1' }]

const columns = [
  { key: 'resource', label: 'Resource' },
  { key: 'stopTime', label: 'Stop Time', render: inlineInput('stopTime', 'Stop Time') },
  { key: 'startTime', label: 'Start Time', render: inlineInput('startTime', 'Start Time') },
  { key: 'duration', label: 'Duration' },
  { key: 'material', label: 'Material', render: inlineInput('material', 'Material') },
  { key: 'type', label: 'Type', render: inlineSelect('type', TYPE_OPTIONS, 'Type') },
  { key: 'reason', label: 'Reason', render: inlineSelect('reason', REASON_OPTIONS, 'Reason') },
  { key: 'department', label: 'Department', render: inlineSelect('department', DEPT_OPTIONS, 'Depart..') },
  { key: 'equipment', label: 'Equipment', render: inlineSelect('equipment', EQUIP_OPTIONS, 'Equipme..') },
  { key: 'remarks', label: 'Remarks', render: inlineInput('remarks', 'Remarks') },
  {
    key: 'action',
    label: 'Action',
    render: (_, row) => {
      if (editingId === row.id) {
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={handleEditSave}
              className="transition hover:opacity-70"
              style={{ color: '#22c55e' }}
            >
              <Check size={15} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleEditCancel}
              className="transition hover:opacity-70"
              style={{ color: '#ef4444' }}
            >
              <X size={15} strokeWidth={2.5} />
            </button>
          </div>
        )
      }
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row)}
            className="transition hover:opacity-70"
            style={{ color: '#8A38F5' }}
          >
            <SquarePen size={15} strokeWidth={2.5} />
          </button>
          <button
            className="transition hover:opacity-70"
            style={{ color: '#14B8A6' }}
          >
            <Undo2 size={15} strokeWidth={2.5} />
          </button>
        </div>
      )
    },
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

const handleEditClick = (row) => {
  setEditingId(row.id)
  setEditForm({ ...row })
}

const handleEditSave = () => {
  setTableData((prev) =>
    prev.map((row) => (row.id === editingId ? { ...editForm } : row))
  )
  setEditingId(null)
  setEditForm({})
}

const handleEditCancel = () => {
  setEditingId(null)
  setEditForm({})
}

const handleEditChange = (field) => (e) =>
  setEditForm((prev) => ({ ...prev, [field]: e.target.value }))

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
          <TextInput
              name="date"
              value={form.date}
            //   onChange={handleChange}
              placeholder="dd/mm/yyyy"
              type="date"
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