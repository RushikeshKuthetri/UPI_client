import React, { useEffect, useState } from 'react'
import FormLabel from '../../components/Common/Form/InputLabel'
import SelectInput from '../../components/Common/Form/SelectInput'
import SubmitButton from '../../components/Common/Form/SubmitButton'
import TextInput from '../../components/Common/Form/TextInput'
import { getAPI, postAPI } from '../../utils/api'
import Table1 from '../../components/Common/Table/Table'
import { SquarePen } from 'lucide-react'

const MODULE_OPTIONS = [
  { label: 'Grade Change', value: 'Grade Change' },
  { label: 'Stoppage Entry', value: 'Stoppage Entry' },
  { label: 'Meter Reading', value: 'Meter Reading' },
  { label: 'Process Order Confirm', value: 'Process Order Confirm' },
  { label: 'Stoppage Alert', value: 'Stoppage Alert' },
  { label: 'Update PO BOM', value: 'Update PO BOM' },
];


const MAX_REMARK = 10000

const EnableManualUpload = () => {
  const [plantOptions, setPlantOptions] = useState([]);
  const [form, setForm] = useState({
    module: '',
    plant: '',
    fromDate: '',
    toDate: '',
    remark: '',
  })
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const fetchPlants = async () => {
    try {
      const response = await getAPI('/unit/getUnits');

      const formattedPlants =
        response?.data?.map((item) => ({
          label: item.UnitName,
          value: item.PlantCode,
        })) || [];

      setPlantOptions(formattedPlants);

    } catch (error) {
      console.error(
        'Error fetching plants:',
        error
      );
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleSelect = (name) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchEnableManualUpload = async () => {
    try {
      const response = await getAPI(
        '/enable-manual-upload/get'
      );

      const rawData = response?.data || [];
      const formattedData =
        [...rawData].reverse().map((item, index) => ({
          id: index + 1,
          fromDate: item.FromDate,
          toDate: item.ToDate,
          module: item.module,
          plant: item.plantcode,
          approveStatus: item.ApproveStatus,
        }));

      setTableData(formattedData);

      console.log(
        'Enable Manual Upload Data:',
        formattedData
      );
    } catch (error) {
      console.error(
        'Error fetching enable manual upload data:',
        error
      );
    }
  };
  

  const handleRemark = (e) => {
    if (e.target.value.length <= MAX_REMARK)
      setForm((prev) => ({ ...prev, remark: e.target.value }))
  }

  const handleSubmit = async () => {
    
    try {

      
      // validation
      if (
        !form.module ||
        !form.plant ||
        !form.fromDate ||
        !form.toDate ||
        !form.remark
      ) {
        alert('Please fill all required fields');
        return;
      }

      // format date to dd/MM/yyyy
      const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
      };

      const payload = {
        FromDate: formatDate(form.fromDate),
        ToDate: formatDate(form.toDate),
        Module: form.module,
        Plantcode: form.plant,
        Reason: form.remark,
      };

      const response = await postAPI(
        '/enable-manual-upload/create',
        payload
      );

      console.log('API Payload:', payload);

      if (response?.success) {
  alert(response.message);

  // table data fetch
  await fetchEnableManualUpload();

  // table visible
  setShowTable(true);

  // reset form
  setForm({
    module: '',
    plant: '',
    fromDate: '',
    toDate: '',
    remark: '',
  });
}
    } catch (error) {
      console.error(
        'Error creating manual upload request:',
        error
      );

      alert('Failed to submit request');
    }
  };

  const formatDate = (date) => {
  if (!date) return '-';

  return new Date(date).toLocaleDateString(
    'en-GB'
  );
};

  const columns = [
  {
    key: 'fromDate',
    label: 'From date',
    render: (value) => (
      <span>{formatDate(value)}</span>
    ),
  },
  {
    key: 'toDate',
    label: 'To Date',
    render: (value) => (
      <span>{formatDate(value)}</span>
    ),
  },
  {
    key: 'module',
    label: 'Module Name',
  },
  {
    key: 'plant',
    label: 'Plant',
  },
  {
    key: 'approveStatus',
    label: 'Approve Status',
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    key: 'action',
    label: 'Action',
    render: () => (
      <button
        className="text-purple-600"
      >
        <SquarePen size={15} strokeWidth={2.5} />
      </button>
    ),
  },
];
  return (
    <div className="w-full h-full">

      {/* Page Title */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
          Enable Manual Upload
        </h2>
      </div>

      {/* Card */}
      <div className="flex flex-col gap-5 px-4 py-4  rounded-xl border border-[var(--form-border)]">

        {/* Row 1 — 4 fields */}
        <div className="flex flex-wrap gap-4">

          <div className="flex flex-col gap-1 w-[180px]">
            <FormLabel required>Select Module</FormLabel>
            <SelectInput
              options={MODULE_OPTIONS}
              value={form.module}
              onChange={handleSelect('module')}
              placeholder="Select Module"
            />
          </div>

          <div className="flex flex-col gap-1 w-[180px]">
            <FormLabel required>Plant Name</FormLabel>
            <SelectInput
              options={plantOptions}
              value={form.plant}
              onChange={handleSelect('plant')}
              placeholder="Select Plant"
            />
          </div>

          <div className="flex flex-col gap-1 w-[180px]">
            <FormLabel required>From Date</FormLabel>
            <TextInput
              type="date"
              value={form.fromDate}
              onChange={(e) => setForm((prev) => ({ ...prev, fromDate: e.target.value }))}
              placeholder="dd/mm/yyyy"
            />
          </div>

          <div className="flex flex-col gap-1 w-[180px]">
            <FormLabel required>To Date</FormLabel>
            <TextInput
              type="date"
              value={form.toDate}
              onChange={(e) => setForm((prev) => ({ ...prev, toDate: e.target.value }))}
              placeholder="dd/mm/yyyy"
            />
          </div>

        </div>

        {/* Row 2 — Remark textarea */}
        <div className="flex flex-col gap-1 w-full">
          <FormLabel required>Remark</FormLabel>
          <div className="relative">
            <TextInput
              value={form.remark}
              onChange={handleRemark}
              placeholder="Enter Remark here..."
              rows={5}
            />
            {/* Character counter */}
            <span
              className="absolute bottom-2 right-3 text-[11px]"
              style={{ color: 'var(--search-placeholder)' }}
            >
              {form.remark.length} / {MAX_REMARK}
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <SubmitButton onClick={handleSubmit} />
        </div>
 {showTable && tableData.length > 0 && (
  <div className="rounded-xl overflow-hidden">
    <Table1
      columns={columns}
      data={tableData}
    />
  </div>
)}

        

      </div>

     
    </div>
  )
}

export default EnableManualUpload