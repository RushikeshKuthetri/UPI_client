import React, { useState } from 'react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import SearchBar from '../../components/Common/Form/SearchInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'

import { SquarePen } from 'lucide-react'
import AddRoleMenuModal from '../../components/Common/Modals/AddRoleMenuModal'

const MOCK_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  srNo: i + 1,
  role: 'CCR Operator SA',
  menus: 'Grade Change, Meter Reading, Process Order Confirm, Stoppage Entry',
}))

const RoleMenuMapping = () => {
  const [tableData] = useState(MOCK_DATA)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = tableData.filter(
    (row) =>
      row.role.toLowerCase().includes(search.toLowerCase()) ||
      row.menus.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'srNo', label: 'Sr No.' },
    { key: 'role', label: 'Role' },
    { key: 'menus', label: 'Menus' },
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
          Role Menu Mapping
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
          <SubmitButton onClick={() => setShowModal(true)}>
            Add Role Menu
          </SubmitButton>
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

      {/* Modal */}
      {showModal && (
        <AddRoleMenuModal
          onClose={() => setShowModal(false)}
          onSave={(data) => console.log('New Role Menu:', data)}
        />
      )}

    </div>
  )
}

export default RoleMenuMapping