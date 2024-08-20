import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { BsThreeDots } from "react-icons/bs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import TbAssignFunc from './TbAssignFunc';
import TbMoneyPaginate from './TbMoneyPaginate';
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoiceData } from "@/features/moneyManagement";

const TableMoney = () => {
    const mydispatch = useDispatch();
    const { moneyData, invoiceLoading, error } = useSelector((state) => state.money)
    const [searchQuery, setSearchQuery] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [customFilter, setCustomFilter] = useState({
        dateVal: {
            fromDate: new Date(),
            toDate: new Date(),
        },
        statusVal: 'all',
        rangeVal: {
            fromRange: [458, 1000],
            toRange: 2124,
        },
    })

    useEffect(() => {

        mydispatch(fetchInvoiceData());

    }, [mydispatch]);


    useEffect(() => {
        if (searchQuery) {
            setFilterData(
                moneyData.filter(res =>
                    res.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                    res.details.toLowerCase().includes(searchQuery.toLocaleLowerCase())
                )
            )
        }
        else {
            setFilterData(moneyData);
        }

        if (customFilter) {

            // --------------- custom date filter ------------------
            if (customFilter.dateVal) {
                const startDate = customFilter.dateVal.fromDate.toLocaleDateString('en-GB');
                const endDate = customFilter.dateVal.toDate.toLocaleDateString('en-GB')
                console.log(startDate, "<<-->>", endDate)
            }
            // --------------- custom status filter ==== DONE=== ------------------
            if (customFilter.statusVal) {
                setFilterData(
                    customFilter.statusVal === 'all' ? moneyData : moneyData.filter(res =>
                        res.status.toLowerCase().includes(customFilter.statusVal)
                    )
                )
            }
        }

    }, [moneyData, searchQuery, customFilter])

    if (invoiceLoading) {
        return <div className="flex justify-center items-center h-[62vh]">Loading...</div>; // Show loader while loading
    }

    return (
        <>
            <div className='flex justify-between items-center px-2 my-3'>
                <TbAssignFunc
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterData={filterData}
                    customFilter={customFilter}
                    setCustomFilter={setCustomFilter}
                />
            </div>

            <div className='bg-white relative dark:bg-dark rounded-lg shadow-md w-full overflow-y-auto border-b-[12px] border-b-white'>
                <Table className="h-[62vh] rounded-md">
                    <TableHeader className="sticky top-0 h-12 shadow-md z-10">
                        <TableRow className="bg-white hover:bg-white shadow-sm">
                            <TableHead className="w-10"><Checkbox className="transition-all duration-100 active:scale-125" /></TableHead>
                            <TableHead>S No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterData.map((invoice, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-10"><Checkbox className="transition-all duration-100 active:scale-125" /></TableCell>
                                <TableCell className="w-20 font-bold">{invoice.id}</TableCell>
                                <TableCell>{invoice.name}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <TableCell className="w-[32%]">{invoice.details.length > 40 ? invoice.details.slice(0, 40) + "..." : invoice.details}</TableCell>
                                        </TooltipTrigger>
                                        <TooltipContent className="w-80 py-2 flex items-center justify-center text-sm bg-white text-dark shadow-lg border top-12 relative overflow-y-auto">
                                            {invoice.details}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TableCell>₹ {invoice.amount}</TableCell>
                                <TableCell><BsThreeDots className='h-5 w-5 cursor-pointer transition-all duration-100 active:scale-75' /> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className='mt-3 mb-3 w-full flex justify-between'>
                <TbMoneyPaginate
                    searchQuery={searchQuery}
                    fullData={moneyData} />
            </div>
        </>
    );
};

export default TableMoney;
