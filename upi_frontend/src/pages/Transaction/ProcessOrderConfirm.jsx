import React, { useState } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import TextInput from '../../components/Common/Form/TextInput'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import { Eye, RefreshCcw, SquarePen, Undo2 } from 'lucide-react'

const PLANT_OPTIONS = [
  { label: 'Plant A', value: 'plant_a' },
  { label: 'Plant B', value: 'plant_b' },
]

const LINE_OPTIONS = [
  { label: 'Line 1', value: 'line_1' },
  { label: 'Line 2', value: 'line_2' },
]

const MOCK_DATA = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  resource: 'U1CLML',
  processOrder: '000001327500',
  material: 'FINECOAL',
  operation: 20,
  yield: 3500,
  uom: 'MT',
  isouom: 'MT',
  unit1: 'KWH',
  isoUnit1: 'KWH',
}))

const ProcessOrderConfirm = () => {
  const [form, setForm] = useState({ date: '', plant: '', line: '' })
  const [tableData, setTableData] = useState(MOCK_DATA)

  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }))

  const handleReset = () => setForm({ date: '', plant: '', line: '' })
  const handleSubmit = () => console.log('Submitted:', form)

  const columns = [
    { key: 'resource', label: 'Resource' },
    { key: 'processOrder', label: 'Process Order' },
    { key: 'material', label: 'Material' },
    { key: 'operation', label: 'Operation' },
    { key: 'yield', label: 'Yield' },
    { key: 'uom', label: 'UOM' },
    { key: 'isouom', label: 'ISOUOM' },
    { key: 'unit1', label: 'Unit 1' },
    { key: 'isoUnit1', label: 'ISOUnit 1' },
    {
      key: 'action',
      label: 'Action',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button className="transition hover:opacity-70" style={{ color: '#8A38F5' }}>
            <SquarePen size={15} strokeWidth={2.5} />
          </button>
          <button className="transition hover:opacity-70" style={{ color: '#22b8cf' }}>
            <Eye size={15} strokeWidth={2.5} />
          </button>
          <button className="transition hover:opacity-70" style={{ color: 'var(--text-color)' }}>
            <Undo2 size={15} strokeWidth={2.5} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full h-full">

      {/* Title */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Process Order Confirm
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

      {/* Table section label */}
      <div className="my-2 mb-1">
        <h3 className="text-[15px] font-semibold text-[">
          Process Order Confirm
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <Table1 columns={columns} data={tableData} />
        <Pagination />
      </div>

    </div>
  )
}

export default ProcessOrderConfirm