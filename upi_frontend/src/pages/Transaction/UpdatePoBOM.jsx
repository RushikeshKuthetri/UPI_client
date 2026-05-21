import React, { useState } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import { Plus, RefreshCcw, RotateCcw } from 'lucide-react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import AddBOMItemModal from '../../components/Common/Modals/AddBOMItemModal'
import CheckboxInput from '../../components/Common/Form/CheckboxInput'


const PLANT_OPTIONS = [
  { label: 'Plant A', value: 'plant_a' },
  { label: 'Plant B', value: 'plant_b' },
]

const LINE_OPTIONS = [
  { label: 'Line 1', value: 'line_1' },
  { label: 'Line 2', value: 'line_2' },
]

const RESOURCE_OPTIONS = [
  { label: 'Resource 1', value: 'resource_1' },
  { label: 'Resource 2', value: 'resource_2' },
]

const MATERIAL_OPTIONS = [
  { label: 'Material A', value: 'material_a' },
  { label: 'Material B', value: 'material_b' },
]

const MOCK_DATA = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  goods: 'CDOMINDG055950OAUCK',
  baseMaterial: false,
  visible: false,
}))

const UpdatePoBOM = () => {

     const [form, setForm] = useState({
        plant: '',
        line: '',
        resource: '',
        material: '',
      })
      const [tableData, setTableData] = useState(MOCK_DATA)
      const [showAddModal, setShowAddModal] = useState(false)
    
      const handleSelect = (name) => (e) =>
        setForm((prev) => ({ ...prev, [name]: e.target.value }))
    
      const handleReset = () =>
        setForm({ plant: '', line: '', resource: '', material: '' })
    
      const handleSubmit = () => {
        console.log('Submitted:', form)
      }
    
       const handleCheckbox = (id, field) => {
        setTableData((prev) =>
          prev.map((row) => (row.id === id ? { ...row, [field]: !row[field] } : row))
        )
      }
    
      const columns = [
        { key: 'goods', label: 'Goods' },
        {
          key: 'baseMaterial',
          label: 'Base Material',
          render: (value, row) => (
            <div className="flex justify-center">
      <CheckboxInput checked={value} onChange={() => handleCheckbox(row.id, 'baseMaterial')} />
    </div>
          ),
        },
        {
          key: 'visible',
          label: 'Visible',
          render: (value, row) => (
                <div className="flex justify-center">
      <CheckboxInput checked={value} onChange={() => handleCheckbox(row.id, 'visible')} />
    </div>
          ),
        },
      ]
    

  return (
      <div className="w-full h-full">

      {/* Page Title */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Update PO BOM
        </h2>
      </div>

      {/* Filter Card */}
      <div
        className="flex w-full flex-wrap items-end gap-4 px-4 py-4 rounded-xl border border-[var(--form-border)]"
    
      >

        {/* Select Plant */}
       <div className="flex flex-col gap-1 w-[180px]">
    <FormLabel required>Select Plant</FormLabel>
    <SelectInput
      options={PLANT_OPTIONS}
      value={form.plant}
      onChange={handleSelect('plant')}
      placeholder="Select Plant"
    />
  </div>

  <div className="flex flex-col gap-1 w-[180px]">
    <FormLabel required>Select Line</FormLabel>
    <SelectInput
      options={LINE_OPTIONS}
      value={form.line}
      onChange={handleSelect('line')}
      placeholder="Select Line"
    />
  </div>

  <div className="flex flex-col gap-1 w-[180px]">
    <FormLabel required>Select Resource</FormLabel>
    <SelectInput
      options={RESOURCE_OPTIONS}
      value={form.resource}
      onChange={handleSelect('resource')}
      placeholder="Select Resource"
    />
  </div>

  <div className="flex flex-col gap-1 w-[180px]">
    <FormLabel required>Select Material</FormLabel>
    <SelectInput
      options={MATERIAL_OPTIONS}
      value={form.material}
      onChange={handleSelect('material')}
      placeholder="Select Material"
    />
  </div>

  <div className="flex items-center gap-2 pb-[2px]">
    <button
      onClick={handleReset}
      className="flex items-center gap-1.5 px-4 py-[7px] rounded-lg text-sm font-medium transition hover:opacity-80"
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
    <div>
      <div className=" py-1">
          <button
          onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: 'var(--submit-button-bg)' }}
          >
            {/* <Plus size={14} /> */}
           + Add BOM Item
          </button>
        </div>

         <Table1
          columns={columns}
          data={tableData}
        />

        {/* Pagination */}
        <Pagination />

      </div>

      {showAddModal && (
  <AddBOMItemModal
    onClose={() => setShowAddModal(false)}
    onSave={(data) => console.log('BOM Item:', data)}
  />
)}


    </div>
  )
}

export default UpdatePoBOM