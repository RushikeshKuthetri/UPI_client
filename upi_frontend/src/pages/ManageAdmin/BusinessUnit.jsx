import React, { useState } from 'react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import SearchBar from '../../components/Common/Form/SearchInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import { SquarePen } from 'lucide-react'

const MOCK_DATA = [
  { id: 1, srNo: 1, buCode: 'UTCL', shortName: 'UTCL' },
]

const BusinessUnit = () => {
  const [tableData, setTableData] = useState(MOCK_DATA)
  const [search, setSearch] = useState('')

  const filtered = tableData.filter(
    (row) =>
      row.buCode.toLowerCase().includes(search.toLowerCase()) ||
      row.shortName.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'srNo', label: 'Sr No.' },
    { key: 'buCode', label: 'BU Code' },
    { key: 'shortName', label: 'Short Name' },
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
          Business Unit
        </h2>
        <SearchBar
          placeholder="Search..."
          width="w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Card */}
   {/* Card */}
<div className="flex flex-col gap-2 border border-[var(--form-border)] rounded-xl p-3 overflow-hidden">

  {/* Add Button */}
  <div className="flex justify-end">
    <SubmitButton>Add Business Unit</SubmitButton>
  </div>

  {/* Table — wrap in overflow-x-auto */}
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

export default BusinessUnit