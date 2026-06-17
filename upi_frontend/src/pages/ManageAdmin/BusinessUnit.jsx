import React, { useEffect, useState } from 'react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import SearchBar from '../../components/Common/Form/Inputs/SearchInput'
import { SquarePen } from 'lucide-react'
import { getAPI } from '../../utils/api'
import ActionButton from '../../components/Common/Form/Buttons/ActionButton'
import Title from '../../components/Common/TitleAndLabel/Title'

const BusinessUnit = () => {
  const [tableData, setTableData] = useState([])
  const [search, setSearch] = useState('')

  const fetchBusinessUnits = async () => {
    try {
      const response = await getAPI(
        'businessUnits/getBusinessUnits'
      )

      console.log(
        'Business Units:',
        response.data
      )

      // API data map for table
      const formattedData =
        response.data.map(
          (item, index) => ({
            id: item.Id,
            srNo: index + 1,
            buCode: item.BUCode,
            shortName: item.ShortName,
          })
        )

      setTableData(formattedData)

    } catch (error) {
      console.error(
        'Error fetching business units:',
        error
      )
    }
  }

  useEffect(() => {
    fetchBusinessUnits()
  }, [])

  const filtered = tableData.filter(
    (row) =>
      row.buCode
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      row.shortName
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )

  const columns = [
    {
      key: 'srNo',
      label: 'Sr No.',
    },
    {
      key: 'buCode',
      label: 'BU Code',
    },
    {
      key: 'shortName',
      label: 'Short Name',
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
        <Title label="Business Unit" />

        <SearchBar
          placeholder="Search..."
          width="w-[300px]"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Card */}
      <div className="flex flex-col gap-2 border border-[var(--form-border)] rounded-xl p-3 overflow-hidden">

        {/* Add Button */}
        <div className="flex justify-end">
          {/* <SubmitButton>
            Add Business Unit
          </SubmitButton> */}
          <ActionButton label={"Add Business Unit"} />
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

export default BusinessUnit