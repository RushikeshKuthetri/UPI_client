import React, { useState } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import TextInput from '../../components/Common/Form/TextInput'

const LINE_OPTIONS = [
  { label: 'Line 1', value: 'line_1' },
  { label: 'Line 2', value: 'line_2' },
]

const PLANT_OPTIONS = [
  { label: 'Plant A', value: 'plant_a' },
  { label: 'Plant B', value: 'plant_b' },
]

const MAX_REMARK = 250

const EnableManualUpload = () => {
  const [form, setForm] = useState({
    line: '',
    plant: '',
    fromDate: '',
    toDate: '',
    remark: '',
  })

  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }))

  const handleRemark = (e) => {
    if (e.target.value.length <= MAX_REMARK)
      setForm((prev) => ({ ...prev, remark: e.target.value }))
  }

  const handleSubmit = () => console.log('Submitted:', form)

  return (
    <div className="w-full h-full">

      {/* Page Title */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Enable Manual Upload
        </h2>
      </div>

      {/* Card */}
      <div className="flex flex-col gap-5 px-5 py-5 rounded-xl border border-[var(--form-border)]">

        {/* Row 1 — 4 fields */}
        <div className="flex flex-wrap gap-4">

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
            <FormLabel required>Plant Name</FormLabel>
            <SelectInput
              options={PLANT_OPTIONS}
              value={form.plant}
              onChange={handleSelect('plant')}
              placeholder="Select Plant"
            />
          </div>

          <div className="flex flex-col gap-1 w-[180px]">
            <FormLabel required>Select From Date</FormLabel>
            <TextInput
              type="date"
              value={form.fromDate}
              onChange={(e) => setForm((prev) => ({ ...prev, fromDate: e.target.value }))}
              placeholder="dd/mm/yyyy"
            />
          </div>

          <div className="flex flex-col gap-1 w-[180px]">
            <FormLabel required>Select To Date</FormLabel>
            <TextInput
              type="date"
              value={form.toDate}
              onChange={(e) => setForm((prev) => ({ ...prev, toDate: e.target.value }))}
              placeholder="dd/mm/yyyy"
            />
          </div>

        </div>

        {/* Row 2 — Remark textarea */}
        <div className="flex flex-col gap-1 w-full">
          <FormLabel required>Remark</FormLabel>
          <div className="relative">
            <textarea
              value={form.remark}
              onChange={handleRemark}
              placeholder="Enter Remark here..."
              rows={5}
              className="w-full px-3 py-2 rounded-lg text-[13px] outline-none resize-none transition"
              style={{
                background: 'var(--input-enable-bg)',
                border: '1px solid var(--input-enable-border)',
                color: 'var(--picker-text)',
              }}
            />
            {/* Character counter */}
            <span
              className="absolute bottom-2 right-3 text-[11px]"
              style={{ color: 'var(--search-placeholder)' }}
            >
              {form.remark.length} / {MAX_REMARK}
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <SubmitButton onClick={handleSubmit} />
        </div>

      </div>
    </div>
  )
}

export default EnableManualUpload