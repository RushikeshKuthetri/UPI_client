import React, { useState, useEffect } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import { CalendarCheck, Check, ClockFading, CloudCog, Merge, PersonStanding, RefreshCcw, SendHorizontal, SquarePen, Upload, X } from 'lucide-react'
import CheckboxInput from '../../components/Common/Form/CheckboxInput'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import IconButton from '../../components/Common/Form/IconButton'
import TextInput from '../../components/Common/Form/TextInput'
import { getAPI, postAPI } from '../../utils/api'
import DateTimePicker from '../../components/Common/Form/DatePicker'
import UploadFileModal from '../../components/Common/Modals/UploadFileModal'
import ActionButton from '../../components/Common/Form/ActionButton'
import ResetButton from '../../components/Common/Form/ResetButton'


// ── Tooltip Icon Button ──────────────────────────────────────────


const MOCK_DATA = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  selected: false,
  resource: 'U1CLML',
  material: 'N53CEM...',
  startTime: '00:00:00',
  stopTime: '07:22:02',
  duration: '07:22:02',
  reason: 'GM02',
  remarks: 'test',
  sapStatus: '',
}))

const RESOURCE_MOCK_DATA = [
  { id: 1, selected: false, resource: '24:00:00' },

]

const GradeChange = () => {
  // States
  const [plantOptions, setPlantOptions] = useState([])
  const [lineOptions, setLineOptions] = useState([])
  const [tableData, setTableData] = useState([])
  const [resourceData, setResourceData] = useState([])
  const [reasonOptions, setReasonOptions] = useState([]);
const [editingRowId, setEditingRowId] =
  useState(null);

const [tempReason, setTempReason] =useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [form, setForm] = useState({
    date: '',
    plant: '',
    line: '',
    startTime: '',
    endTime: '',
  })

  // plant options fetch
  const fetchPlants = async () => {
    try {
      const response = await getAPI('/unit/getUnits');

      const formattedPlants = response.data.map((item) => ({
        label: item.UnitName,
        value: item.PlantCode, // P001
        unitId: item.Id, // for line API
      }));

      setPlantOptions(formattedPlants);

    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };



  // line options fetch
  // line options fetch by unitId
  const fetchLines = async (unitId) => {
    try {
      if (!unitId) {
        setLineOptions([]);
        return;
      }

      const response = await getAPI(`/line/unit/${unitId}`);

      const formattedLines = response.data.map((item) => ({
        label: item.LineName,
        value: item.LineCode,
      }));

      setLineOptions(formattedLines);

    } catch (error) {
      console.error("Error fetching lines:", error);
    }
  };

useEffect(() => {
  fetchPlants();
  fetchReasons();
}, []);


const handleReasonChange = (id, value) => {
  setTableData((prev) =>
    prev.map((row) =>
      row.id === id
        ? { ...row, reason: value }
        : row
    )
  );
};


  const handlePlantChange = async (e) => {
    const plantCode = e.target.value;

    const selectedPlant = plantOptions.find(
      (item) => item.value === plantCode
    );

    setForm((prev) => ({
      ...prev,
      plant: plantCode,
      line: "",
    }));

    if (selectedPlant?.unitId) {
      await fetchLines(selectedPlant.unitId);
    }
  };

  const toggleSelect = (id) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, selected: !row.selected } : row))
    )
  }

  const toggleResourceSelect = (id) => {
    setResourceData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, selected: !row.selected } : row))
    )
  }

  const columns = [
    {
      key: 'selected',
      label: 'Select',
      render: (value, row) => (
        <CheckboxInput
          checked={value}
          onChange={() => toggleSelect(row.id)}
        />
      ),
    },
    { key: 'resource', label: 'Resource' },
    { key: 'material', label: 'Material' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'stopTime', label: 'Stop Time' },
    { key: 'duration', label: 'Duration' },
 {
  key: 'reason',
  label: 'Reason',
  render: (value, row) => {
    const isEditing =
      editingRowId === row.id;

    return isEditing ? (
    <SelectInput
  compact
  options={reasonOptions}
  value={tempReason}
  onChange={(e) =>
    setTempReason(e.target.value)
  }
/>
    ) : (
      <span>
        {
          reasonOptions.find(
            (r) => r.value === value
          )?.label || value || '—'
        }
      </span>
    );
  },
},
    { key: 'remarks', label: 'Remarks' },
  {
  key: 'action',
  label: 'Action',
  render: (_, row) => {
    const isEditing =
      editingRowId === row.id;

    return isEditing ? (
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            handleSaveReason(row.id)
          }
          className="text-green-600 hover:opacity-70"
        >
          <Check
            size={18}
            strokeWidth={2.5}
          />
        </button>

        <button
          onClick={handleCancelEdit}
          className="text-red-600 hover:opacity-70"
        >
          <X
            size={18}
            strokeWidth={2.5}
          />
        </button>
      </div>
    ) : (
      <button
        className="transition hover:opacity-70"
        style={{ color: '#8A38F5' }}
        onClick={() =>
          handleEditClick(row)
        }
      >
        <SquarePen
          size={16}
          strokeWidth={2.5}
        />
      </button>
    );
  },
},
    {
      key: 'sapStatus',
      label: 'SAP status',
      render: (value) => (
        <span className="text-sm" style={{ color: 'var(--text-color)' }}>
          {value || '—'}
        </span>
      ),
    },
  ]

  const resourceColumns = [
    { key: 'resource', label: 'Resource', center: true },
    { key: 'totalDuration', label: 'Total Duration', center: true },
  ]

const fetchReasons = async () => {
  try {
    const response = await getAPI(
      "/grade-change/LoadReasonGridView"
    );

    console.log(
      "Reason API for the reason field:",
      response.data
    );

    const formattedReasons =
      response.data.map((item) => ({
        label: item?.GRDTX, 
        value: item?.GRUND, 
      }));

    console.log(
      "Formatted Reasons:",
      formattedReasons
    );

    setReasonOptions(formattedReasons);
  } catch (error) {
    console.error(
      "Error fetching reasons:",
      error
    );
  }
};



  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }))

  const handleReset = () => {
    setForm({ date: '', plant: '', line: '', startTime: '', endTime: '' })
    setTableData([])
    setResourceData([])
  }

 const handleSubmit = async () => {
  try {
    if (!form.date || !form.plant || !form.line) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      PlantCode: form.plant,
      Line: form.line,
      FromDate: new Date(form.date).toISOString(),
      ToDate: new Date().toISOString(),
    };

    console.log("Payload:", payload);

    const data = await postAPI(
      "/grade-change/getData",
      payload
    );

    console.log("API Response:", data);

    if (data?.success) {
      const formattedGradeData =
        data.gradeChangeData.map((item, index) => ({
          id: index + 1,
          selected: item.selected,
          resource: item.resource,
          material: item.material,
          startTime: item.startTime,
          stopTime: item.stopTime,
          duration: item.duration,
          reason: item.reason,
          remarks: item.remarks,
          sapStatus: item.sapStatus,
          hiddenSapStatus: item.hiddenSapStatus,
          postingDate: item.postingDate,
          plantCode: item.plantCode,
          serialNumber: item.serialNumber,
        }));

      const formattedResourceData =
        data.resourceWiseDuration.map(
          (item, index) => ({
            id: index + 1,
            selected: false,
            resource: item.resource,
            totalDuration: item.totalDuration,
          })
        );

      setTableData(formattedGradeData);
      setResourceData(formattedResourceData);
    }
  } catch (error) {
    console.error(
      "Error fetching grade change data:",
      error
    );
  }
};

const handleSaveReason = (id) => {
  setTableData((prev) =>
    prev.map((row) =>
      row.id === id
        ? { ...row, reason: tempReason }
        : row
    )
  );

  setEditingRowId(null);
  setTempReason("");
};

const handleCancelEdit = () => {
  setEditingRowId(null);
  setTempReason("");
};

const handleEditClick = (row) => {
  setEditingRowId(row.id);
  setTempReason(row.reason); // GM02
};
  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Grade Change
        </h2>
      </div>

      {/* Filters */}
      <div className="flex w-full flex-wrap items-end justify-start gap-4 px-4 py-4 rounded-xl border border-[var(--form-border)]">
        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Select Date</FormLabel>
          <DateTimePicker
            value={form.date}
            // onChange={(date) => setStartDate(date)}
            onChange={(date) => setForm((prev) => ({ ...prev, date }))}
            placeholder="Select Date"
            showTime={false}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Plant Name</FormLabel>
          <SelectInput
            options={plantOptions}
            value={form.plant}
            onChange={handlePlantChange}
            placeholder="Select Plant"
          />
        </div>

        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Select Line</FormLabel>
          <SelectInput
            options={lineOptions}
            value={form.line}
            onChange={handleSelect('line')}
            placeholder="Select Line"
          />
        </div>

        <div className="flex items-center gap-2 pb-[2px]">
          <ResetButton onClick={handleReset} />
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>

      {/* Actions row */}
      <div className="flex items-center justify-between">
        <div className="flex my-2 items-center justify-start gap-2">
          <ActionButton icon={SendHorizontal} label="Send to SAP" onClick={() => alert("Send to SAP clicked")} />

          <label className="text-[var(--text-color)] text-sm font-medium">
            {tableData.filter((row) => row.selected).length} items selected
          </label>
        </div>

        {/* Icon buttons with tooltips */}
        <div className="flex my-2 items-center justify-end gap-4 mr-8">
          <IconButton icon={ClockFading} tooltip="Shift Duration" />
          <IconButton icon={Merge} tooltip="Merge" />
          <IconButton icon={PersonStanding} tooltip="Run of Job" />
          <IconButton icon={Upload} tooltip="Upload" onClick={() => setIsUploadModalOpen(true)} />
          <IconButton icon={CalendarCheck} tooltip="Open Event" />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <Table1
          columns={columns}
          data={tableData}
        />
        <Pagination />
      </div>

      <div className='flex flex-col items-center justify-center'>
        <label > Resource Wise Duration</label>
        <div className="overflow-x-auto w-full mt-2 mb-4">
          <Table1
            columns={resourceColumns}
            data={resourceData}
          />
        </div>
      </div>

      <UploadFileModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />

    </div>
  )
}

export default GradeChange