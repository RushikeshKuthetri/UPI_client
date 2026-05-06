import React, { useState } from 'react'
import { X } from 'lucide-react'
import FormLabel from '../Form/InputLabel'
import TextInput from '../Form/TextInput'
import SelectInput from '../Form/SelectInput'
import SubmitButton from '../Form/SubmitButton'

const MENU_OPTIONS = [
  { label: 'Grade Change', value: 'grade_change' },
  { label: 'Meter Reading', value: 'meter_reading' },
  { label: 'Process Order Confirm', value: 'process_order' },
  { label: 'Stoppage Entry', value: 'stoppage_entry' },
  { label: 'Stoppage Alert', value: 'stoppage_alert' },
  { label: 'StandBy Equipment', value: 'standby_equipment' },
  { label: 'Update PO BOM', value: 'update_po_bom' },
  { label: 'Enable Manual Upload', value: 'manual_upload' },
]

const AddRoleMenuModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    roleName: '',
    menuId: '',
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
        className="relative w-[420px] rounded-2xl px-6 py-6 shadow-2xl flex flex-col gap-4"
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
          className="text-center text-[18px] font-bold"
          style={{ color: 'var(--title)' }}
        >
          Add Role Menu
        </h2>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex flex-col gap-1">
            <FormLabel required>Role Name</FormLabel>
            <TextInput
              name="roleName"
              value={form.roleName}
              onChange={handleChange}
              placeholder="Enter Role Name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel required>Menu ID</FormLabel>
            <SelectInput
              options={MENU_OPTIONS}
              value={form.menuId}
              onChange={(e) => setForm((prev) => ({ ...prev, menuId: e.target.value }))}
              placeholder="Select Menu ID"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 mt-2">
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

export default AddRoleMenuModal