import React, { useState, useEffect } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import { Plus, RefreshCcw, RotateCcw } from 'lucide-react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import AddBOMItemModal from '../../components/Common/Modals/AddBOMItemModal'
import CheckboxInput from '../../components/Common/Form/CheckboxInput'
import { getAPI, postAPI } from '../../utils/api'



const MOCK_DATA = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  goods: 'CDOMINDG055950OAUCK',
  baseMaterial: false,
  visible: false,
}))

const UpdatePoBOM = () => {
  const [plantOptions, setPlantOptions] = useState([])
  const [lineOptions, setLineOptions] = useState([])
  const [resourceOptions, setResourceOptions] = useState([])
  const [materialOptions, setMaterialOptions] = useState([])

  const [form, setForm] = useState({
    plant: '',
    line: '',
    resource: '',
    material: '',
  })
  const [tableData, setTableData] = useState(MOCK_DATA)
  const [showAddModal, setShowAddModal] = useState(false)

  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }))

  const handleReset = () =>
    setForm({ plant: '', line: '', resource: '', material: '' })

  const handleSubmit = () => {
    console.log('Submitted:', form)
  }

  const handleCheckbox = (id, field) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: !row[field] } : row))
    )
  }

  const fetchPlants = async () => {
    try {
      const response = await getAPI('/unit/getUnits')

      const formattedPlants = response.data.map((item) => ({
        label: item.UnitName,
        value: item.Id,
        plantCode: item.PlantCode,
      }))

      setPlantOptions(formattedPlants)
    } catch (error) {
      console.error('Plant fetch error:', error)
    }
  }

  const fetchLines = async (unitId) => {
    try {
      if (!unitId) {
        setLineOptions([])
        return
      }

      const response = await getAPI(`/line/unit/${unitId}`)

    const formattedLines = response.data.map((item) => ({
  label: item.LineName,
  value: item.LineCode,
  unitCode: item.UnitCode,
}))

      setLineOptions(formattedLines)
    } catch (error) {
      console.error('Line fetch error:', error)
    }
  }

  const fetchResources = async (plantCode, line) => {
    try {
      if (!plantCode || !line) {
        setResourceOptions([])
        return
      }

      const response = await postAPI(
        '/poBom/getResourceList',
        {
          PlantCode: plantCode,
          Line: line,
        }
      )


      const formattedResources =
        response?.data?.map((item) => ({
          label: item.Resource,
          value: item.Resource,
        })) || []

      setResourceOptions(formattedResources)


    } catch (error) {
      console.error('Resource fetch error:', error)
    }
  }

  const fetchMaterials = async (
    plantCode,
    line,
    resource
  ) => {
    try {
      if (!plantCode || !line || !resource) {
        setMaterialOptions([])
        return
      }

      const response = await postAPI(
        '/poBom/getMaterialList',
        {
          PlantCode: plantCode,
          Line: line,
          Resource: resource,
        }
      )

      const formattedMaterials =
  response?.data?.map((item) => ({
    label: item.Material,
    value: item.Material,
  })) || []

setMaterialOptions(formattedMaterials)

      setMaterialOptions(formattedMaterials)

    } catch (error) {
      console.error('Material fetch error:', error)
    }
  }

  const handlePlantChange = async (e) => {
    const selectedPlantId = e.target.value

    const selectedPlant =
      plantOptions.find(
        (p) => p.value === selectedPlantId
      )
      console.log(selectedPlant)
    setForm((prev) => ({
      ...prev,
      plant: selectedPlantId,
      plantCode: selectedPlant?.plantCode || '',
      line: '',
      resource: '',
      material: '',
    }))

    setResourceOptions([])
    setMaterialOptions([])

    await fetchLines(selectedPlantId)
  }
const handleLineChange = async (e) => {
  const selectedLine = e.target.value

  const selectedPlant = plantOptions.find(
    (p) => String(p.value) === String(form.plant)
  )

  const selectedLineObj = lineOptions.find(
    (l) => l.value === selectedLine
  )

  console.log("Selected Plant:", selectedPlant)
  console.log("Selected Line:", selectedLineObj)

  setForm((prev) => ({
    ...prev,
    line: selectedLine,
    resource: '',
    material: '',
  }))

  setMaterialOptions([])

  await fetchResources(
    selectedPlant?.plantCode,
    selectedLineObj?.unitCode
  )
}

const handleResourceChange = async (e) => {
  const selectedResource = e.target.value

  const selectedPlant = plantOptions.find(
    (p) => String(p.value) === String(form.plant)
  )

  const selectedLineObj = lineOptions.find(
    (l) => l.value === form.line
  )

  console.log("Plant:", selectedPlant?.plantCode)
  console.log("Line:", selectedLineObj?.Line)
  console.log("Resource:", selectedResource)

  setForm((prev) => ({
    ...prev,
    resource: selectedResource,
    material: '',
  }))

  await fetchMaterials(
    selectedPlant?.plantCode,
    selectedLineObj?.Line,
    selectedResource
  )
}

  useEffect(() => {
    fetchPlants()
  }, [])

  const columns = [
    { key: 'goods', label: 'Goods' },
    {
      key: 'baseMaterial',
      label: 'Base Material',
      render: (value, row) => (
        <div className="flex justify-center">
          <CheckboxInput checked={value} onChange={() => handleCheckbox(row.id, 'baseMaterial')} />
        </div>
      ),
    },
    {
      key: 'visible',
      label: 'Visible',
      render: (value, row) => (
        <div className="flex justify-center">
          <CheckboxInput checked={value} onChange={() => handleCheckbox(row.id, 'visible')} />
        </div>
      ),
    },
  ]


  return (
    <div className="w-full h-full">

      {/* Page Title */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Update PO BOM
        </h2>
      </div>

      {/* Filter Card */}
      <div
        className="flex w-full flex-wrap items-end gap-4 px-4 py-4 rounded-xl border border-[var(--form-border)]"

      >

        {/* Select Plant */}
        <div className="flex flex-col gap-1 w-[180px]">
          <FormLabel required>Select Plant</FormLabel>
          <SelectInput
            options={plantOptions}
            value={form.plant}
            onChange={handlePlantChange}
            placeholder="Select Plant"
          />
        </div>

        <div className="flex flex-col gap-1 w-[180px]">
          <FormLabel required>Select Line</FormLabel>
          <SelectInput
            options={lineOptions}
            value={form.line}
            onChange={handleLineChange}
            placeholder="Select Line"
          />
        </div>

        <div className="flex flex-col gap-1 w-[180px]">
          <FormLabel required>Select Resource</FormLabel>
          <SelectInput
            options={resourceOptions}
            value={form.resource}
            onChange={handleResourceChange}
            placeholder="Select Resource"
          />
        </div>

        <div className="flex flex-col gap-1 w-[180px]">
          <FormLabel required>Select Material</FormLabel>
          <SelectInput
            options={materialOptions}
            value={form.material}
            onChange={handleSelect('material')}
            placeholder="Select Material"
          />
        </div>

        <div className="flex items-center gap-2 pb-[2px]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-[7px] rounded-lg text-sm font-medium transition hover:opacity-80"
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
      <div>
        <div className=" py-1">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: 'var(--submit-button-bg)' }}
          >
            {/* <Plus size={14} /> */}
            + Add BOM Item
          </button>
        </div>

        <Table1
          columns={columns}
          data={tableData}
        />

        {/* Pagination */}
        <Pagination />

      </div>

      {showAddModal && (
        <AddBOMItemModal
          onClose={() => setShowAddModal(false)}
          onSave={(data) => console.log('BOM Item:', data)}
        />
      )}


    </div>
  )
}

export default UpdatePoBOM