import React, { useState } from 'react'
import { X } from 'lucide-react'
import FormLabel from '../Form/InputLabel'
import TextInput from '../Form/TextInput'
import CheckboxInput from '../Form/CheckboxInput'
import SubmitButton from '../Form/SubmitButton'

const MAX_DESC = 10

const AddRoleModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    roleName: '',
    description: '',
    isActive: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'description' && value.length > MAX_DESC) return
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
        className="relative w-[480px] rounded-2xl px-6 py-6 shadow-2xl flex flex-col gap-4"
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
          Add Role
        </h2>

        {/* Role Name */}
        <div className="flex flex-col gap-1">
          <FormLabel required>Role Name</FormLabel>
          <TextInput
            name="roleName"
            value={form.roleName}
            onChange={handleChange}
            placeholder="Enter Role Name"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <FormLabel required>Description</FormLabel>
          <div className="relative">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter Description here..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none transition"
              style={{
                background: 'var(--input-enable-bg)',
                border: '1px solid var(--input-enable-border)',
                color: 'var(--picker-text)',
              }}
            />
            <span
              className="absolute bottom-2 right-3 text-[11px]"
              style={{ color: 'var(--search-placeholder)' }}
            >
              {form.description.length}/{MAX_DESC}
            </span>
          </div>
        </div>

        {/* Is Active */}
        <div className="flex items-center gap-3">
          <FormLabel required>Is Active</FormLabel>
          <CheckboxInput
            checked={form.isActive}
            onChange={() => setForm((prev) => ({ ...prev, isActive: !prev.isActive }))}
          />
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

export default AddRoleModal