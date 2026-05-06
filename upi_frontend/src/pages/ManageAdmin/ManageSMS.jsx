import React, { useState } from 'react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import SearchBar from '../../components/Common/Form/SearchInput'

const MOCK_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  srNo: i + 1,
  resource: 'AC_CementPlant_Line1_CBA',
  smsId: 'AC_CBAHouseTemp',
  description: 'Unit 1,2,3 CBA House Temp',
  plant: 'AC01',
}))

const ManageSMS = () => {
  const [tableData] = useState(MOCK_DATA)
  const [search, setSearch] = useState('')

  const filtered = tableData.filter(
    (row) =>
      row.resource.toLowerCase().includes(search.toLowerCase()) ||
      row.smsId.toLowerCase().includes(search.toLowerCase()) ||
      row.description.toLowerCase().includes(search.toLowerCase()) ||
      row.plant.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'srNo', label: 'Sr No.' },
    { key: 'resource', label: 'Resource' },
    { key: 'smsId', label: 'SMSId' },
    { key: 'description', label: 'Description' },
    { key: 'plant', label: 'Plant' },
    {
      key: 'action',
      label: 'Action',
      render: (_, row) => (
        <button
          className="text-sm font-medium transition hover:opacity-70"
          style={{ color: '#8A38F5' }}
        >
          Assign
        </button>
      ),
    },
  ]

  return (
    <div className="w-full h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Manage SMS
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

export default ManageSMS