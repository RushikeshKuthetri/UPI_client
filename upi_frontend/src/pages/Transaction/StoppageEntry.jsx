import React, { useState, useEffect } from 'react'
import FormLabel from '../../components/Common/TitleAndLabel/InputLabel'
import SelectInput from '../../components/Common/Form/Inputs/SelectInput'
import SubmitButton from '../../components/Common/Form/Buttons/SubmitButton'
import { Check, ClockFading, Merge, RefreshCcw, SendHorizontal, Split, SquarePen, TableProperties, Undo2, Upload, X } from 'lucide-react'
import IconButton from '../../components/Common/Form/Buttons/IconButton'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import TextInput from '../../components/Common/Form/Inputs/TextInput'
import DateTimePicker from '../../components/Common/Form/Inputs/DatePicker'
import { getAPI, postAPI } from '../../utils/api'
import CheckboxInput from '../../components/Common/Form/Inputs/CheckboxInput'
import UploadFileModal from '../../components/Common/Modals/UploadFileModal'
import ResetButton from '../../components/Common/Form/Buttons/ResetButton'
import ActionButton from '../../components/Common/Form/Buttons/ActionButton'
import Title from '../../components/Common/TitleAndLabel/Title'

const StoppageEntry = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [plantOptions, setPlantOptions] = useState([])
  const [lineOptions, setLineOptions] = useState([])
  const [form, setForm] = useState({
    date: '',
    plant: '',
    line: '',
  })

  const [tableData, setTableData] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [typeOptions, setTypeOptions] = useState([]);
  const [reasonOptions, setReasonOptions] = useState([]);
  const [sapDeptOptions, setSapDeptOptions] = useState([]);

  const inlineInput = (field, placeholder) => (value, row) => {
    if (editingId === row.id) {
      return (
        <input
          value={editForm[field] ?? ''}
          onChange={handleEditChange(field)}
          placeholder={placeholder}
          className="px-1 py-0.5 rounded text-[12px] outline-none border"
          style={{
            background: 'var(--input-enable-bg)',
            border: '1px solid var(--input-enable-border)',
            color: 'var(--picker-text)',
            width: '60px',
          }}
        />
      )
    }
    return <span>{value || '—'}</span>
  }

  const formatTime = (isoString) => {
    if (!isoString) return '—';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    } catch (error) {
      return isoString;
    }
  }

  const formatDuration = (isoString) => {
    if (!isoString) return '—';
    try {
      const date = new Date(isoString);
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } catch (error) {
      return isoString;
    }
  }

  const inlineSelect = (field, options, placeholder) => (value, row) => {
    if (editingId === row.id) {
      return (
        <select
          value={editForm[field] ?? ''}
          onChange={handleEditChange(field)}
          className="px-1 py-0.5 rounded text-[12px] outline-none border"
          style={{
            background: 'var(--input-enable-bg)',
            border: '1px solid var(--input-enable-border)',
            color: 'var(--picker-text)',
            width: '75px',
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )
    }
    return <span>{value || '—'}</span>
  }



  const EQUIP_OPTIONS = [{ label: 'Equip 1', value: 'equip_1' }]

  const toggleSelect = (id) => {
    setTableData((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, selected: !row.selected } : row
      )
    );
  };

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
    {
      key: 'stopTime', label: 'Stop Time', render: (value, row) => {
        if (editingId === row.id) {
          return inlineInput('stopTime', 'Stop Time')(value, row);
        }
        return <span>{formatTime(value)}</span>;
      }
    },
    {
      key: 'startTime', label: 'Start Time', render: (value, row) => {
        if (editingId === row.id) {
          return inlineInput('startTime', 'Start Time')(value, row);
        }
        return <span>{formatTime(value)}</span>;
      }
    },
    { key: 'duration', label: 'Duration', render: (value) => <span>{formatDuration(value)}</span> },
    { key: 'material', label: 'Material', render: inlineInput('material', 'Material') },
    {
      key: 'type',
      label: 'Type',
      render: inlineSelect(
        'type',
        typeOptions,
        'Type'
      ),
    },
    {
      key: 'reason',
      label: 'Reason',
      render: inlineSelect(
        'reason',
        reasonOptions,
        'Reason'
      ),
    },
    { key: 'department', label: 'Department', render: inlineSelect('department', sapDeptOptions, 'Depart..') },
    { key: 'equipment', label: 'Equipment', render: inlineSelect('equipment', EQUIP_OPTIONS, 'Equipme..') },
    { key: 'remarks', label: 'Remarks', render: inlineInput('remarks', 'Remarks') },
    {
      key: 'action',
      label: 'Action',
      render: (_, row) => {
        if (editingId === row.id) {
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={handleEditSave}
                className="transition hover:opacity-70"
                style={{ color: '#22c55e' }}
              >
                <Check size={15} strokeWidth={2.5} />
              </button>
              <button
                onClick={handleEditCancel}
                className="transition hover:opacity-70"
                style={{ color: '#ef4444' }}
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            </div>
          )
        }
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEditClick(row)}
              className="transition hover:opacity-70"
              style={{ color: '#8A38F5' }}
            >
              <SquarePen size={15} strokeWidth={2.5} />
            </button>
            <button
              className="transition hover:opacity-70"
              style={{ color: '#14B8A6' }}
            >
              <Undo2 size={15} strokeWidth={2.5} />
            </button>
          </div>
        )
      },
    },
    {
      key: 'sapStatus',
      label: 'SAP Status',
      render: (value) => (
        <span className="text-sm" style={{ color: 'var(--text-color)' }}>
          {value || '—'}
        </span>
      ),
    },
  ]

  const handleEditClick = (row) => {
    setEditingId(row.id)
    setEditForm({ ...row })
  }

  const handleEditSave = () => {
    setTableData((prev) =>
      prev.map((row) => (row.id === editingId ? { ...editForm } : row))
    )
    setEditingId(null)
    setEditForm({})
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleEditChange = (field) => (e) =>
    setEditForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSelect = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }))

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
  }, []);

  const fetchStoppageTypes = async () => {
    try {
      const response = await getAPI(
        '/stoppageEntry/getStoppageTypeList'
      );

      const formattedTypes =
        response?.map((item) => ({
          label: item.Descr,
          value: item.StoppageType1,
        })) || [];

      setTypeOptions(formattedTypes);


    } catch (error) {
      console.error(
        'Error fetching stoppage types:',
        error
      );
    }
  };

  useEffect(() => {
    fetchStoppageTypes();
  }, [])

  const fetchReasons = async (plantCode) => {
    try {
      const payload = {
        PlantCode: plantCode,
      };

      const response = await postAPI(
        '/stoppageEntry/getReasonList',
        payload
      );

      const formattedReasons =
        response?.reasonData?.map((item) => ({
          label: item.ReasonName,
          value: item.ReasonCode,
        })) || [];

      setReasonOptions(formattedReasons);

      console.log(
        'Stoppage Reasons:',
        formattedReasons
      );
    } catch (error) {
      console.error(
        'Error fetching stoppage reasons:',
        error
      );
    }
  };

  const fetchSAPDepartments = async () => {
    try {

      const response = await getAPI('/stoppageEntry/getSAPDeptList');
      const formattedDept =
        response?.map((item) => ({
          label: item.DESCR,
          value: item.ABTNR,
        })) || [];

      setSapDeptOptions(formattedDept);



    } catch (error) {
      console.error(
        'Error fetching SAP departments:',
        error
      );
    }
  }

  useEffect(() => {
    fetchSAPDepartments();
  }, [])

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
    } else {
      setLineOptions([]);
    }

    await fetchReasons(plantCode);
  };

  const handleReset = () => {
    setForm({ date: '', plant: '', line: '' })
    setLineOptions([])
    setTableData([])
  }

  const handleSubmit = async () => {
    try {
      if (!form.date || !form.plant || !form.line) {
        alert('Please fill in all required fields');
        return;
      }

      // Format dates for API
      const selectedDate = new Date(form.date);
      const fromDate = new Date(selectedDate);
      fromDate.setHours(0, 0, 0, 0);

      const toDate = new Date();
      toDate.setHours(23, 59, 59, 999);

      const payload = {
        Line: form.line,
        FromDate: fromDate.toISOString(),
        ToDate: toDate.toISOString(),
        PlantCode: form.plant,
      };

      const response = await postAPI('/stoppageEntry/getStoppageEntry', payload);

      // Map API response to table format
      if (response.stoppageEntryData && Array.isArray(response.stoppageEntryData)) {
        const mappedData = response.stoppageEntryData.map((item) => ({
          id: item.Id,
          selected: false,
          resource: item.Resource,
          stopTime: item.StopTime,
          startTime: item.StartTime,
          duration: item.Duration,
          material: item.Material,
          type: item.Type,
          reason: item.Reason,
          department: item.Department,
          equipment: item.Equipment,
          remarks: item.Remarks,
          sapStatus: item.SapStatus,
        }));
        setTableData(mappedData);
      }
    } catch (error) {
      console.error('Error fetching stoppage entry data:', error);
      alert('Failed to fetch stoppage entry data');
    }
  }

  return (
    <div className="w-full h-full">

      {/* Page Title */}
      <div className="flex justify-between items-center mb-3">
        <Title label="Stoppage Entry" />
      </div>

      {/* Filter Card */}
      <div className="flex w-full flex-wrap items-end justify-start gap-4 px-4 py-4 rounded-xl border border-[var(--form-border)]">
        <div className="flex flex-col gap-1 w-[230px]">
          <FormLabel required>Select Date</FormLabel>
          <DateTimePicker
            value={form.date}
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
          {/* <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-[6px] rounded-lg text-sm font-medium transition hover:opacity-80"
            style={{
              border: '1.5px solid var(--button-border)',
              background: 'var(--button-bg)',
              color: 'var(--text-color)',
            }}
          >
            <RefreshCcw size={14} />
            Reset
          </button> */}
          <ResetButton onClick={handleReset} />
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex my-2 items-center justify-start gap-2">
          <ActionButton icon={SendHorizontal} label="Send to SAP" onClick={() => alert("Send to SAP clicked")} />

          <label className="text-[var(--text-color)] text-sm font-medium">
            {tableData.filter((row) => row.selected).length} items selected
          </label>
        </div>

        {/* Icon buttons with tooltips */}
        <div className="flex my-2 items-center justify-end gap-4 mr-10">
          <IconButton icon={Upload} tooltip="Upload" onClick={() => setIsUploadModalOpen(true)} />
          {/* <IconButton icon={TableProperties} tooltip="Excel Template" /> */}


        </div>

      </div>
      <div className="overflow-x-auto w-full mt-1 mb-8">
        <Table1
          columns={columns}
          data={tableData}
        />
        <Pagination />
      </div>

      <UploadFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

    </div>
  )
}

export default StoppageEntry