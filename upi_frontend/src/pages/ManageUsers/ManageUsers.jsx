import React, { useState } from 'react'
import SearchBar from '../../components/Common/Form/SearchInput'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import { SquarePen } from 'lucide-react'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import EditUserModal from '../../components/Common/Modals/EditUserModal'

const ManageUsers = () => {

      const [selectedUser, setSelectedUser] = useState(null)

    const columns = [
        { key: 'srNo', label: 'Sr No.' },
        { key: 'name', label: 'Name' },
        { key: 'userName', label: 'User Name' },
        {
            key: 'status',
            label: 'Status',
            render: (value) => (
                <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-red-100 text-red-400 border border-red-200">
                    {value}
                </span>
            ),
        },
    ]

    const tableData = [1, 2, 3, 4, 5, 6, 7].map((num) => ({
        srNo: num,
        name: 'Rawans CCR2',
        userName: 'Rahul',
        status: 'Deactive',
    }))

    const renderActions = (row) => (
    <button
      className="text-purple-500 hover:text-purple-700 transition"
      onClick={() => setSelectedUser(row)} // 👈 open modal with row data
    >
      <SquarePen size={18} />
    </button>
  )

  const handleSave = (updatedData) => {
    console.log('Updated user data:', updatedData)
    // call your API / dispatch action here
  }

    return (
        <div className="w-full h-full ">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
                    Manage Users
                </h2>
                <SearchBar placeholder="Search..." width="w-[300px]" />
            </div>

            {/* Table card */}
            <div className="border rounded-xl border-[var(--form-border)]   p-2 flex flex-col gap-2">

                {/* Add User button */}
                <div className="flex justify-end">
                    <SubmitButton/>
                </div>

                <Table1
                    columns={columns}
                    data={tableData}
                    renderActions={renderActions}
                />

                <Pagination />
            </div>

             {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}

        </div>
    )
}

export default ManageUsers