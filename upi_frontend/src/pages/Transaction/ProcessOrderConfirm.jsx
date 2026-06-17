import React, { useState } from 'react'
import FormLabel from '../../components/Common/TitleAndLabel/InputLabel'
import SelectInput from '../../components/Common/Form/Inputs/SelectInput'
import TextInput from '../../components/Common/Form/Inputs/TextInput'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import { Eye, RefreshCcw, SquarePen, Undo2 } from 'lucide-react'
import DateTimePicker from '../../components/Common/Form/Inputs/DatePicker'
import PoDetailsModal from '../../components/Common/Modals/PoDetailsModal'
import ResetButton from '../../components/Common/Form/Buttons/ResetButton'
import Title from '../../components/Common/TitleAndLabel/Title'
import SubmitButton from '../../components/Common/Form/Buttons/SubmitButton'

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
  const [tableData, setTableData] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [isPoModalOpen, setIsPoModalOpen] = useState(false)

  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }))

  const handleReset = () => {
    setForm({ date: '', plant: '', line: '' })
    setTableData([])
    setShowTable(false)
  }

  const handleSubmit = () => {
    console.log('Submitted:', form)
    setTableData(MOCK_DATA)
    setShowTable(true)
  }

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
          <button className="transition hover:opacity-70" style={{ color: '#22b8cf' }} onClick={() => setIsPoModalOpen(true)}>
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
        <Title label="Process Order Confirm" />
      </div>

      {/* Filter Card */}
      <div className="flex w-full flex-wrap items-end justify-start gap-4 px-4 py-4 rounded-xl border border-[var(--form-border)]">
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

      {showTable && (
        <>
          {/* Table section label */}
          <div className="my-2 mb-1">
            <h3 className="text-[15px] font-semibold text-[var(--title)]">
              Process Order Confirm
            </h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <Table1 columns={columns} data={tableData} />
            <Pagination />
          </div>
        </>
      )}

      <PoDetailsModal isOpen={isPoModalOpen} onClose={() => setIsPoModalOpen(false)} />

    </div>
  )
}

export default ProcessOrderConfirm