import React, { useState, useEffect } from 'react'
import Cards from '../../components/Common/Cards/Cards'
import { CheckCircle, User, Users } from 'lucide-react'
import Table1 from '../../components/Common/Table/Table'
import Pagination from '../../components/Common/Pagination/Pagination'
import { getAPI } from '../../utils/api'

const Dashboard = () => {
    const [cardData, setCardData] = useState({
        noOfHits: 189225,
        hitsMtd: 16,
        uniqueUserHits: 88,
        uniqueUserMtd: 2,
    })
    const [tableData, setTableData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const fetchDashboardData = async () => {
        try {
            const cardResponse = await getAPI('/dashboard/')
            if (cardResponse && cardResponse.success && cardResponse.data && cardResponse.data.length > 0) {
                const totalHits = cardResponse.data.reduce((acc, curr) => acc + (Number(curr.NoOfHits) || 0), 0)
                const totalHitsMtd = cardResponse.data.reduce((acc, curr) => acc + (Number(curr.HitsMTD) || 0), 0)
                const totalUniqueHits = cardResponse.data.reduce((acc, curr) => acc + (Number(curr.UniqueUserHits) || 0), 0)
                const totalUniqueMtd = cardResponse.data.reduce((acc, curr) => acc + (Number(curr.UniqueUserMTD) || 0), 0)

                setCardData({
                    noOfHits: totalHits,
                    hitsMtd: totalHitsMtd,
                    uniqueUserHits: totalUniqueHits,
                    uniqueUserMtd: totalUniqueMtd,
                })
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        }

        try {
            const summaryResponse = await getAPI('/dashboard/module-summary')
            if (summaryResponse && summaryResponse.success && summaryResponse.data?.moduleSummary) {
                setTableData(summaryResponse.data.moduleSummary)
            }
        } catch (error) {
            console.error('Error fetching module summary data:', error)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const columns = [
        { 
            key: 'Date', 
            label: 'Date',
            render: (val) => val ? new Date(val).toLocaleDateString('en-GB') : '—'
        },
        { key: 'Module', label: 'Module' },
        { key: 'Plant', label: 'Plant' },
        { key: 'LiveEntryFromOSIPI', label: 'Live Entry (From OSIPI)' },
        { key: 'ManualEntry', label: 'Manual Entry' },
        { key: 'TotalEntry', label: 'Total Entry' },
        { key: 'Uploaded', label: 'Uploaded' },
    ]

    const totalPages = Math.ceil(tableData.length / rowsPerPage) || 1
    const paginatedData = tableData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

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
                    value={cardData.noOfHits.toLocaleString('en-IN')}
                    color="#FF9402"
                    bgShade="#FEFAF4"
                    darkBg="linear-gradient(180deg, #302F2F 55.09%, #382E22 100%)"
                    icon={<User size={18} />}
                />

                <Cards
                    title="Hits MTD"
                    value={cardData.hitsMtd.toLocaleString('en-IN')}
                    color="#3CCE49"
                    bgShade="#FEFAF4"
                    darkBg="linear-gradient(180deg, #302F2F 0%, #1D2B20 100%)"
                    icon={<CheckCircle size={18} />}
                />

                <Cards
                    title="Unique User Hits"
                    value={cardData.uniqueUserHits.toLocaleString('en-IN')}
                    color="#F14B44"
                    bgShade="#FEFAF4"
                    darkBg="linear-gradient(180deg, #302F2F 55.09%, #382E22 100%)"
                    icon={<Users size={18} />}
                />

                <Cards
                    title="Unique User MTD"
                    value={cardData.uniqueUserMtd.toLocaleString('en-IN')}
                    color="#319AFE"
                    bgShade="#FEFAF4"
                    darkBg="linear-gradient(180deg, #302F2F 0%, #1D2B20 100%)"
                    icon={<Users size={18} />}
                />

            </div>

            <div className='my-2'>
                <Table1 columns={columns} data={paginatedData} />
            </div>

        </div>
    )
}

export default Dashboard