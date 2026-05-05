import React, { useState } from 'react'
import { X } from 'lucide-react'
import FormLabel from '../Form/InputLabel'
import TextInput from '../Form/TextInput'
import SubmitButton from '../Form/SubmitButton'

const AddBOMItemModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    processOrderNo: '',
    material: '',
    resource: '',
    plant: '',
    postingDate: '',
    bomMaterials: '',
    movtType: '',
    storageLocation: '',
    batch: '',
    weightfeeder: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave?.(form)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-[500px] rounded-2xl px-5 py-5 shadow-2xl flex flex-col"
        style={{ background: 'var(--modal-bg, var(--card-bg))' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition hover:opacity-70"
          style={{ color: 'var(--card-subtle)' }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2
          className="text-center text-[18px] font-bold mb-5"
          style={{ color: 'var(--title)' }}
        >
          Add BOM Item
        </h2>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">

          <div className="flex flex-col gap-1">
            <FormLabel required>Process Order No.</FormLabel>
            <TextInput
              name="processOrderNo"
              value={form.processOrderNo}
              onChange={handleChange}
              placeholder="Enter User Name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Material</FormLabel>
            <TextInput
              name="material"
              value={form.material}
              onChange={handleChange}
              placeholder="Enter User ID"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Resource</FormLabel>
            <TextInput
              name="resource"
              value={form.resource}
              onChange={handleChange}
              placeholder="Enter Contact No"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Plant</FormLabel>
            <TextInput
              name="plant"
              value={form.plant}
              onChange={handleChange}
              placeholder="Enter SMS Limit"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Posting Date</FormLabel>
            <TextInput
              name="postingDate"
              value={form.postingDate}
              onChange={handleChange}
              placeholder="dd/mm/yyyy"
              type="date"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>BOM Materials</FormLabel>
            <TextInput
              name="bomMaterials"
              value={form.bomMaterials}
              onChange={handleChange}
              placeholder="Enter BOM Materials"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Movt Type</FormLabel>
            <TextInput
              name="movtType"
              value={form.movtType}
              onChange={handleChange}
              placeholder="Enter Movt Type"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Storage Location</FormLabel>
            <TextInput
              name="storageLocation"
              value={form.storageLocation}
              onChange={handleChange}
              placeholder="Enter Storage Location"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Batch</FormLabel>
            <TextInput
              name="batch"
              value={form.batch}
              onChange={handleChange}
              placeholder="Enter Batch"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Weightfeeder</FormLabel>
            <TextInput
              name="weightfeeder"
              value={form.weightfeeder}
              onChange={handleChange}
              placeholder="Enter User Name"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition hover:opacity-80"
            style={{
              border: '1.5px solid var(--button-border)',
              background: 'var(--button-bg)',
              color: 'var(--text-color)',
            }}
          >
            Close
          </button>
          <SubmitButton onClick={handleSave} />
        </div>
      </div>
    </div>
  )
}

export default AddBOMItemModal