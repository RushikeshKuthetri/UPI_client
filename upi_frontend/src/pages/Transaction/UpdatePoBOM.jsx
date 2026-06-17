import React, { useEffect, useState } from 'react'
import FormLabel from '../../components/Common/TitleAndLabel/InputLabel'
import SelectInput from '../../components/Common/Form/Inputs/SelectInput'
import SubmitButton from '../../components/Common/Form/Buttons/SubmitButton'
import { Plus, RefreshCcw } from 'lucide-react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import AddBOMItemModal from '../../components/Common/Modals/AddBOMItemModal'
import CheckboxInput from '../../components/Common/Form/Inputs/CheckboxInput'
import { getAPI, postAPI } from '../../utils/api'
import ResetButton from '../../components/Common/Form/Buttons/ResetButton'
import ActionButton from '../../components/Common/Form/Buttons/ActionButton'
import Title from '../../components/Common/TitleAndLabel/Title'

const UpdatePoBOM = () => {

  const [form, setForm] = useState({
    plant: '',
    line: '',
    resource: '',
    material: '',
  })

  const [showAddModal, setShowAddModal] = useState(false)
  const [showTable, setShowTable] = useState(false)


  const [allPlants, setAllPlants] = useState([])
  const [allLines, setAllLines] = useState([])


  const [plantOptions, setPlantOptions] = useState([])
  const [lineOptions, setLineOptions] = useState([])


  const [loadingPlants, setLoadingPlants] = useState(false)
  const [loadingLines, setLoadingLines] = useState(false)


  const [resourceOptions, setResourceOptions] = useState([])
  const [loadingResources, setLoadingResources] = useState(false)

  const [materialOptions, setMaterialOptions] =
    useState([])

  const [loadingMaterials, setLoadingMaterials] =
    useState(false)


  const [bomGridData, setBomGridData] = useState([])
  const [loadingBomData, setLoadingBomData] = useState(false)

  const handleSelect = (name) => async (e) => {
    const value = e.target.value

    if (name === 'plant') {
      setForm((prev) => ({
        ...prev,
        plant: value,
        line: '',
        resource: '',
      }))

      setResourceOptions([])


      const filteredLines = allLines
        .filter(
          (item) =>
            item.IsActive &&
            item.PlantCode === value
        )
        .map((item) => ({
          label: item.LineName,
          value: item.LineCode,
        }))

      setLineOptions(filteredLines)
    }

    else if (name === 'line') {
      setForm((prev) => ({
        ...prev,
        line: value,
        resource: '',
      }))

      // Call resource API
      await fetchResources(
        form.plant,
        value
      )
    }

    else if (name === 'resource') {
      setForm((prev) => ({
        ...prev,
        resource: value,
        material: '',
      }))

      // Call material API
      await fetchMaterials(
        form.plant,
        form.line,
        value
      )
    }

    else if (name === 'material') {
      setForm((prev) => ({
        ...prev,
        material: value,
      }))

      // Call BOM grid data API
      await fetchBomGridData(
        form.plant,
        form.resource,
        value
      )
    }

    else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleReset = () => {
    setForm({ plant: '', line: '', resource: '', material: '' })
    setShowTable(false)

    // Restore line options to all active lines on reset
    const allActive = allLines
      .filter((item) => item.IsActive)
      .map((item) => ({
        label: item.LineName,
        value: item.LineCode,
      }))
    setLineOptions(allActive)
  }

  const handleSubmit = () => {
    if (!form.plant || !form.line || !form.resource || !form.material) {
      alert('Please fill in all required fields (Plant Name, Line, Resource, and Material)');
      return;
    }
    console.log('Submitted:', form)
    setShowTable(true)
  }

  const handleCheckbox = (id, field) => {
    setBomGridData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: !row[field] } : row))
    )
  }

  // ── Fetch plants ─────────────────────────────────────────────────────────────
  const fetchPlants = async () => {
    setLoadingPlants(true)
    try {
      const response = await getAPI('/unit/getUnits')
      const data = response.data

      console.log('Plants:', data)
      setAllPlants(data)


      const formattedPlants = data
        .filter((item) => item.IsActive)
        .map((item) => ({
          label: item.UnitName,
          value: item.PlantCode,
        }))

      setPlantOptions(formattedPlants)
    } catch (error) {
      console.error('Error fetching plants:', error)
    } finally {
      setLoadingPlants(false)
    }
  }

  const fetchLines = async () => {
    setLoadingLines(true)
    try {
      const response = await getAPI('/line/getLines')
      const data = response.data  // array of line objects

      console.log('Lines:', data)


      setAllLines(data)


      const formattedLines = data
        .filter((item) => item.IsActive)
        .map((item) => ({
          label: item.LineName,
          value: item.LineCode,
        }))

      setLineOptions(formattedLines)
    } catch (error) {
      console.error('Error fetching lines:', error)
    } finally {
      setLoadingLines(false)
    }
  }


  useEffect(() => {
    fetchPlants()
    fetchLines()
  }, [])

  const fetchResources = async (PlantCode, Line) => {
    if (!PlantCode || !Line) {
      setResourceOptions([])
      return
    }

    setLoadingResources(true)

    try {
      const payload = {
        PlantCode,
        Line,
      }

      console.log('🚀 getResourceList Payload:', payload)

      const response = await postAPI(
        '/poBom/getResourceList',
        payload
      )

      console.log('📦 Resource API Response:', response)



      // Align API response to dropdown
      const formattedResources = response.map((item) => ({
        label: item.Description,
        value: item.ResourceCode,
      }))

      console.log(
        '🎯 Resource Dropdown Options:',
        formattedResources
      )

      setResourceOptions(formattedResources)
    } catch (error) {
      console.error(
        '❌ Error fetching resources:',
        error
      )
      setResourceOptions([])
    } finally {
      setLoadingResources(false)
    }
  }

  const fetchMaterials = async (
    PlantCode,
    Line,
    Resource
  ) => {
    if (!PlantCode || !Line || !Resource) {
      setMaterialOptions([])
      return
    }

    setLoadingMaterials(true)

    try {
      const payload = {
        PlantCode,
        Line,
        Resource,
      }

      console.log(
        '🚀 getMaterialList Payload:',
        payload
      )

      const response = await postAPI(
        '/poBom/getMaterialList',
        payload
      )

      console.log(
        '📦 Material API Response:',
        response
      )



      const formattedMaterials = response.map(
        (item) => ({
          label: item.Material,
          value: item.Material,
        })
      )

      console.log(
        '🎯 Material Dropdown:',
        formattedMaterials
      )

      setMaterialOptions(
        formattedMaterials
      )
    } catch (error) {
      console.error(
        '❌ Error fetching materials:',
        error
      )

      setMaterialOptions([])
    } finally {
      setLoadingMaterials(false)
    }
  }

  const fetchBomGridData = async (
    PlantCode,
    Resource,
    Material
  ) => {
    if (!PlantCode || !Resource || !Material) {
      setBomGridData([])
      return
    }

    setLoadingBomData(true)

    try {
      const payload = {
        PlantCode,
        Resource,
        Material,
      }

      console.log(
        '🚀 loadUpdateBOMGridView Payload:',
        payload
      )

      const response = await postAPI(
        '/poBom/loadUpdateBOMGridView',
        payload
      )

      console.log(
        '📦 BOM Grid Data Response:',
        response
      )

      // Assuming response has bomViewData array
      const bomData = response.bomViewData || []

      // Transform response data to match table structure
      const transformedData = bomData.map(
        (item, index) => ({
          id: index + 1,
          werks: item.werks,
          resource: item.resource,
          material: item.material,
          line: item.line,
          goods: item.goods,
          baseMaterial: item.baseMaterial,
          oldVisible: item.oldVisible,
          visible: item.visible,
        })
      )

      console.log(
        '🎯 Transformed BOM Grid Data:',
        transformedData
      )

      setBomGridData(transformedData)
    } catch (error) {
      console.error(
        '❌ Error fetching BOM grid data:',
        error
      )

      setBomGridData([])
    } finally {
      setLoadingBomData(false)
    }
  }

  const columns = [
    { key: 'goods', label: 'Goods' },

    {
      key: 'baseMaterial',
      label: 'Base Material',
      render: (value, row) => (
        <div className="flex justify-center">
          <CheckboxInput
            checked={value}
            onChange={() => handleCheckbox(row.id, 'baseMaterial')}
          />
        </div>
      ),
    },
    {
      key: 'visible',
      label: 'Visible',
      render: (value, row) => (
        <div className="flex justify-center">
          <CheckboxInput
            checked={value}
            onChange={() => handleCheckbox(row.id, 'visible')}
          />
        </div>
      ),
    },
  ]



  return (
    <div className="w-full h-full">

      {/* Page Title */}
      <div className="flex justify-between items-center mb-3">
        <Title label="Update PO BOM" />
      </div>

      {/* Filter Card */}
      <div className="flex w-full flex-wrap items-end gap-4 px-4 py-4 rounded-xl border border-[var(--form-border)]">

        {/* Select Plant */}
        <div className="flex flex-col gap-1 w-[180px]">
          <FormLabel required>Select Plant</FormLabel>
          <SelectInput
            options={plantOptions}
            value={form.plant}
            onChange={handleSelect('plant')}
            placeholder={
              loadingPlants
                ? 'Loading...'
                : 'Select Plant'
            }
          />
        </div>

        {/* Select Line — options filtered by selected plant */}
        <div className="flex flex-col gap-1 w-[180px]">
          <FormLabel required>Select Line</FormLabel>
          <SelectInput
            options={lineOptions}
            value={form.line}
            onChange={handleSelect('line')}
            placeholder={
              loadingLines
                ? 'Loading...'
                : 'Select Line'
            }
          />
        </div>

        {/* Select Resource */}
        <div className="flex flex-col gap-1 w-[180px]">
          <FormLabel required>Select Resource</FormLabel>
          <SelectInput
            options={resourceOptions}
            value={form.resource}
            onChange={handleSelect('resource')}
            placeholder={
              loadingResources
                ? 'Loading...'
                : 'Select Resource'
            }
          // disabled={
          //   !form.plant ||
          //   !form.line ||
          //   loadingResources
          // }
          />
        </div>

        {/* Select Material */}
        <div className="flex flex-col gap-1 w-[180px]">
          <FormLabel required>Select Material</FormLabel>
          <SelectInput
            options={materialOptions}
            value={form.material}
            onChange={handleSelect('material')}
            placeholder={
              loadingMaterials
                ? 'Loading...'
                : 'Select Material'
            }
          // disabled={
          //   !form.resource ||
          //   loadingMaterials
          // }
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pb-[2px]">
          <ResetButton onClick={handleReset} />
          <SubmitButton onClick={handleSubmit} />
        </div>

      </div>

      {/* Table Section */}
      {showTable && (
        <div>
          <div className="py-1">
            <ActionButton icon={Plus} label="Add BOM Item" onClick={() => setShowAddModal(true)} />
          </div>


          {loadingBomData ? (
            <div className="py-8 text-center text-gray-500">
              Loading BOM data...
            </div>
          ) : bomGridData.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              {form.material
                ? 'No BOM data available'
                : 'Select all filters to load BOM data'}
            </div>
          ) : (
            <>
              <Table1
                columns={columns}
                data={bomGridData}
              />
              <Pagination />
            </>
          )}
        </div>
      )}

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