import React, { useState } from 'react';
import { X } from 'lucide-react';
import FormLabel from '../TitleAndLabel/InputLabel';
import TextInput from '../Form/Inputs/TextInput';
import DateTimePicker from '../Form/Inputs/DatePicker';
import BackButton from '../Form/Buttons/BackButton';
import NextButton from '../Form/Buttons/NextButton';

const AddBomItemPOModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    processOrderNo: '',
    material: '',
    resource: '',
    plant: '',
    postingDate: null,
    bomMaterials: '',
    movtType: '',
    storageLocation: '',
    batch: '',
    weighfeeder: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm(prev => ({ ...prev, postingDate: date }));
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-[500px] max-w-[95vw] rounded-2xl px-6 py-6 shadow-2xl flex flex-col"
        style={{ background: 'var(--modal-bg, #F9FAFB)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition hover:opacity-70"

        >
          <X size={20} />
        </button>

        <h2 className="text-[18px] font-semibold text-center mb-6 text-[--title]">
          Add BOM Item
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col">
            <FormLabel required>Process Order No.</FormLabel>
            <TextInput
              name="processOrderNo"
              value={form.processOrderNo}
              onChange={handleChange}
              placeholder="Enter User Name"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>Material</FormLabel>
            <TextInput
              name="material"
              value={form.material}
              onChange={handleChange}
              placeholder="Enter User ID"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>Resource</FormLabel>
            <TextInput
              name="resource"
              value={form.resource}
              onChange={handleChange}
              placeholder="Enter Contact No"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>Plant</FormLabel>
            <TextInput
              name="plant"
              value={form.plant}
              onChange={handleChange}
              placeholder="Enter SMS Limit"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>Posting Date</FormLabel>
            <DateTimePicker
              value={form.postingDate}
              onChange={handleDateChange}
              placeholder="dd/mm/yyyy"
              showTime={false}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>BOM Materials</FormLabel>
            <TextInput
              name="bomMaterials"
              value={form.bomMaterials}
              onChange={handleChange}
              placeholder="Enter BOM Materials"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>Movt Type</FormLabel>
            <TextInput
              name="movtType"
              value={form.movtType}
              onChange={handleChange}
              placeholder="Enter Movt Type"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>Storage Location</FormLabel>
            <TextInput
              name="storageLocation"
              value={form.storageLocation}
              onChange={handleChange}
              placeholder="Enter Storage Location"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>Batch</FormLabel>
            <TextInput
              name="batch"
              value={form.batch}
              onChange={handleChange}
              placeholder="Enter Batch"
            />
          </div>

          <div className="flex flex-col">
            <FormLabel required>Weighfeeder</FormLabel>
            <TextInput
              name="weighfeeder"
              value={form.weighfeeder}
              onChange={handleChange}
              placeholder="Enter User Name"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <BackButton onClick={onClose} label="Close" />
          <NextButton onClick={onClose} label="Save" className='' />
        </div>
      </div>
    </div>
  );
};

export default AddBomItemPOModal;
