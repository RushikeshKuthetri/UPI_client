import React, { useEffect, useState } from 'react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import SearchBar from '../../components/Common/Form/Inputs/SearchInput'
import CheckboxInput from '../../components/Common/Form/Inputs/CheckboxInput'
import { SquarePen } from 'lucide-react'
import { getAPI } from '../../utils/api'
import ActionButton from '../../components/Common/Form/Buttons/ActionButton'
import Title from '../../components/Common/TitleAndLabel/Title'

const PlantDetails = () => {
  const [tableData, setTableData] = useState([])
  const [search, setSearch] = useState('')

  const fetchPlantDetails = async () => {
    try {
      const response = await getAPI(
        '/plant-master'
      )

      console.log(
        'Plant Details:',
        response.data
      )

      // API data map for table
      const formattedData =
        response.data.map(
          (item, index) => ({
            id: index + 1,
            srNo: item.SrNo,
            plantName: item.PlantName,
            displayName: item.DisplayName,
            businessUnit: item.BusinessUnit,
            isActive: item.IsActive,
          })
        )

      setTableData(formattedData)

    } catch (error) {
      console.error(
        'Error fetching plant details:',
        error
      )
    }
  }

  useEffect(() => {
    fetchPlantDetails()
  }, [])

  const filtered = tableData.filter(
    (row) =>
      row.plantName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      row.displayName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      row.businessUnit
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )

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

  const columns = [
    {
      key: 'srNo',
      label: 'Sr No.',
    },
    {
      key: 'plantName',
      label: 'Plant Name',
    },
    {
      key: 'displayName',
      label: 'Display Name',
    },
    {
      key: 'businessUnit',
      label: 'Business Unit',
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
        <Title label="Plant Details" />

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

          <ActionButton label={"Add Plant"} />
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