import React, { useState } from 'react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import SearchBar from '../../components/Common/Form/SearchInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import CheckboxInput from '../../components/Common/Form/CheckboxInput'
import { SquarePen } from 'lucide-react'

const MOCK_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  srNo: i + 1,
  plantName: 'Aditya Cement Works',
  displayName: 'Aditya Cement Works',
  businessUnit: 'UTCL',
  isActive: i === 0,
}))

const PlantDetails = () => {
  const [tableData, setTableData] = useState(MOCK_DATA)
  const [search, setSearch] = useState('')

  const filtered = tableData.filter(
    (row) =>
      row.plantName.toLowerCase().includes(search.toLowerCase()) ||
      row.displayName.toLowerCase().includes(search.toLowerCase()) ||
      row.businessUnit.toLowerCase().includes(search.toLowerCase())
  )

  const toggleActive = (id) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, isActive: !row.isActive } : row))
    )
  }

  const columns = [
    { key: 'srNo', label: 'Sr No.' },
    { key: 'plantName', label: 'Plant Name' },
    { key: 'displayName', label: 'Display Name' },
    { key: 'businessUnit', label: 'Business Unit' },
    {
      key: 'isActive',
      label: 'Is Active',
      render: (value, row) => (
        <CheckboxInput
          checked={value}
          onChange={() => toggleActive(row.id)}
        />
      ),
    },
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
  ]

  return (
    <div className="w-full h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Plant Details
        </h2>
        <SearchBar
          placeholder="Search..."
          width="w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Card */}
      <div className="flex flex-col gap-2 border border-[var(--form-border)] rounded-xl p-3 overflow-hidden">

        {/* Add Button */}
        <div className="flex justify-end">
          <SubmitButton>Add Plant</SubmitButton>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <Table1
            columns={columns}
            data={filtered}
          />
        </div>

        <Pagination />

      </div>
    </div>
  )
}

export default PlantDetails