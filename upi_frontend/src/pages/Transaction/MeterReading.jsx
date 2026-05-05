import { PersonStanding, RefreshCcw, SendHorizontal, Sigma, SquarePen } from 'lucide-react'
import React, { useState } from 'react'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import TextInput from '../../components/Common/Form/TextInput'
import IconButton from '../../components/Common/Form/IconButton'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'

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
    meterId: 'AC00001',
    description: 'LS CRUSHER (MAIN DRIVE)',
    meterNumber: 'CRMCC',
    meterReading: 0,
    manualUploadReason: '',
    sapStatus: '',
}))

const MeterReading = () => {

    const [form, setForm] = useState({
        date: '',
        plant: '',
        line: '',
        startTime: '',
        endTime: '',
    })

    const [tableData, setTableData] = useState(MOCK_DATA)

    const columns = [
        { key: 'meterId', label: 'Meter ID' },
        { key: 'description', label: 'Description' },
        { key: 'meterNumber', label: 'Meter Number' },
        { key: 'meterReading', label: 'Meter Reading' },
        { key: 'manualUploadReason', label: 'Manual Upload Reason' },
        {
            key: 'action',
            label: 'Action',
            render: (_, row) => (
                <button
                    className="transition hover:opacity-70"
                    style={{ color: '#8A38F5' }}
                >
                    <SquarePen size={15} strokeWidth={2.5} />
                </button>
            ),
        },
        {
            key: 'sapStatus',
            label: 'SAP status',
            render: (value) => (
                <span className="text-sm" style={{ color: 'var(--text-color)' }}>
                    {value || ''}
                </span>
            ),
        },
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
                    Meter Reading
                </h2>
            </div>

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
                    <IconButton icon={PersonStanding} tooltip="Run of Job" />
                    <IconButton icon={Sigma} tooltip="Run Calculation" />


                </div>


            </div>
            {/* Table */}
            <div className="overflow-x-auto w-full mt-1">
                <Table1
                    columns={columns}
                    data={tableData}
                />
                <Pagination />
            </div>

        </div>
    )
}

export default MeterReading