import React, { useEffect, useState } from 'react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import SearchBar from '../../components/Common/Form/Inputs/SearchInput'
import CheckboxInput from '../../components/Common/Form/Inputs/CheckboxInput'
import { SquarePen } from 'lucide-react'
import AddRoleModal from '../../components/Common/Modals/AddRoleModal'
import { getAPI } from '../../utils/api'
import ActionButton from '../../components/Common/Form/Buttons/ActionButton'
import Title from '../../components/Common/TitleAndLabel/Title'

const ManageRoles = () => {
  const [tableData, setTableData] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Fetch Roles API
  const fetchRoles = async () => {
    try {
      const response = await getAPI(
        '/role-mapping/roles'
      )

      console.log(
        'Roles:',
        response.data
      )

      // API response mapping
      const formattedData =
        response.data.map(
          (item, index) => ({
            id: item.RoleId,
            srNo: index + 1,
            roleName:
              item.RoleName,
            description: '',
            isActive:
              item.IsActive,
          })
        )

      setTableData(formattedData)

    } catch (error) {
      console.error(
        'Error fetching roles:',
        error
      )
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  // Search filter
  const filtered = tableData.filter(
    (row) =>
      row.roleName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      row.description
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )

  // Toggle checkbox
  const toggleActive = (id) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
            ...row,
            isActive:
              !row.isActive,
          }
          : row
      )
    )
  }

  // Table columns
  const columns = [
    {
      key: 'srNo',
      label: 'Sr No.',
    },
    {
      key: 'roleName',
      label: 'Role Name',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'isActive',
      label: 'Is Active',
      render: (value, row) => (
        <div className="flex justify-center">
          <CheckboxInput
            checked={value}
            onChange={() =>
              toggleActive(row.id)
            }
          />
        </div>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      render: (_, row) => (
        <button
          className="transition hover:opacity-70"
          style={{
            color: '#8A38F5',
          }}
        >
          <SquarePen
            size={15}
            strokeWidth={2.5}
          />
        </button>
      ),
    },
  ]

  return (
    <div className="w-full h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <Title label="Manage Roles" />

        <SearchBar
          placeholder="Search..."
          width="w-[300px]"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      {/* Card */}
      <div className="flex flex-col gap-2 border border-[var(--form-border)] rounded-xl p-3 overflow-hidden">

        {/* Add Button */}
        <div className="flex justify-end">
          <ActionButton onClick={() => setShowModal(true)} label={"Add Role"} />
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <Table1
            columns={columns}
            data={filtered}
          />
        </div>

        {/* Pagination */}
        <Pagination />
      </div>

      {/* Add Role Modal */}
      {showModal && (
        <AddRoleModal
          onClose={() =>
            setShowModal(false)
          }
          onSave={(data) =>
            console.log(
              'New Role:',
              data
            )
          }
        />
      )}
    </div>
  )
}

export default ManageRoles