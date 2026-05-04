import React from 'react'
import Cards from '../../components/Common/Cards/Cards'
import { CheckCircle, User, Users } from 'lucide-react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'

const Dashboard = () => {
    const columns = [
        { key: 'date', label: 'Date' },
        { key: 'module', label: 'Module' },
        { key: 'plant', label: 'Plant' },
        { key: 'liveEntry', label: 'Live Entry (From OSIPI)' },
        { key: 'manualEntry', label: 'Manual Entry' },
        { key: 'totalEntry', label: 'Total Entry' },
        { key: 'uploaded', label: 'Uploaded' },
    ]

    const tableData = Array(9).fill(null).map((_, i) => ({
        date: '3/4/2026 12:00:00 AM',
        module: 'Grade Change',
        plant: 'AC01',
        liveEntry: 38,
        manualEntry: 0,
        totalEntry: 30,
        uploaded: 0,
    }))

    return (
        <div className="w-full h-full">
            {/* Page title */}
            <div className="flex justify-between items-center ">
                <h2 className="flex text-[18px] font-medium font-poppins text-[var(--title)] -ml-0.5">
                    Dashboard
                </h2>
            </div>

            <div className="
                            grid-cols-1
                            grid gap-4
                            sm:grid-cols-2
                            lg:grid-cols-4
                            ">

                <Cards
                    title="No. of Hits"
                    value="1,89,225"
                    color="#FF9402"
                    bgShade="#FEFAF4"
                    darkBg="linear-gradient(180deg, #302F2F 55.09%, #382E22 100%)"
                    icon={<User size={18} />}
                />

                <Cards
                    title="Hits MTD"
                    value="16"
                    color="#3CCE49"
                    bgShade="#FEFAF4"
                    darkBg="linear-gradient(180deg, #302F2F 0%, #1D2B20 100%)"
                    icon={<CheckCircle size={18} />}
                />

                <Cards
                    title="Unique User Hits"
                    value="88"
                    color="#F14B44"
                    bgShade="#FEFAF4"
                    darkBg="linear-gradient(180deg, #302F2F 55.09%, #382E22 100%)"
                    icon={<Users size={18} />}
                />

                <Cards
                    title="Unique User MTD"
                    value="2"
                    color="#319AFE"
                    bgShade="#FEFAF4"
                    darkBg="linear-gradient(180deg, #302F2F 0%, #1D2B20 100%)"
                    icon={<Users size={18} />}
                />

            </div>

            <div className='my-2'>
                 <Table1 columns={columns} data={tableData} />
            </div>
            <div className='mx-1'>
                <Pagination/>
            </div>

        </div>
    )
}

export default Dashboard