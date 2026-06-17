import { PersonStanding, RefreshCcw, SendHorizontal, Sigma, SquarePen } from 'lucide-react'
import React, { useState } from 'react'
import FormLabel from '../../components/Common/TitleAndLabel/InputLabel'
import SelectInput from '../../components/Common/Form/Inputs/SelectInput'
import TextInput from '../../components/Common/Form/Inputs/TextInput'
import IconButton from '../../components/Common/Form/Buttons/IconButton'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import DateTimePicker from '../../components/Common/Form/Inputs/DatePicker'
import CheckboxInput from '../../components/Common/Form/Inputs/CheckboxInput'
import ResetButton from '../../components/Common/Form/Buttons/ResetButton'
import ActionButton from '../../components/Common/Form/Buttons/ActionButton'
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

const MOCK_DATA = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    selected: false,
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

    const [tableData, setTableData] = useState([])
    const [showTable, setShowTable] = useState(false)

    const toggleSelect = (id) => {
        setTableData((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, selected: !row.selected } : row
            )
        );
    };

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

    const handleReset = () => {
        setForm({ date: '', plant: '', line: '', startTime: '', endTime: '' })
        setTableData([])
        setShowTable(false)
    }

    const handleSubmit = () => {
        console.log('Submitted:', form)
        setTableData(MOCK_DATA)
        setShowTable(true)
    }
    return (
        <div className="w-full h-full">
            <div className="flex justify-between items-center mb-3">
                <Title label="Meter Reading" />
            </div>

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
                    <div className="flex items-center justify-between">
                        <div className="flex my-2 items-center justify-start gap-2">
                            <ActionButton icon={SendHorizontal} label="Send to SAP" onClick={() => alert("Send to SAP clicked")} />
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
                </>
            )}

        </div>
    )
}

export default MeterReading