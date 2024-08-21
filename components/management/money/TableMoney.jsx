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
import { Badge } from "@/components/ui/badge"
import { RiCloseCircleFill } from "react-icons/ri";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditEntryMoney from "./assignFunc/EditEntryMoney";
import { Button } from "@/components/ui/button";


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
            type: 'slider',
            fromRange: [458, 1000],
            toRange: 2124,
        },
    })

    useEffect(() => {

        mydispatch(fetchInvoiceData());

    }, [mydispatch]);


    useEffect(() => {
        if (searchQuery) {
            setFilterData(prevData =>
                prevData.filter(res =>
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
            if (customFilter.dateVal.fromDate && customFilter.dateVal.toDate) {
                const startDate = new Date(customFilter.dateVal.fromDate);
                const endDate = new Date(customFilter.dateVal.toDate);

                const defaultStartDate = startDate.toLocaleDateString('en-GB').replace(/\//g, '-');
                const defaultEndDate = endDate.toLocaleDateString('en-GB').replace(/\//g, '-');
                const todayDate = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

                setFilterData(prevData =>

                    defaultStartDate === todayDate && defaultEndDate === todayDate ? prevData :

                        prevData.filter(res => {
                            const [day, month, year] = res.date.split('-');
                            const resDate = new Date(`${year}-${month}-${day}`);

                            return resDate >= startDate && resDate <= endDate;
                        })
                );
            }

            // --------------- custom status filter ------------------
            if (customFilter.statusVal) {
                setFilterData(prevData =>
                    customFilter.statusVal === 'all' ? prevData : prevData.filter(res =>
                        res.status.toLowerCase().includes(customFilter.statusVal)
                    )
                );
            }
            // --------------- custom price filter ------------------
            if (customFilter.rangeVal.fromRange && customFilter.rangeVal.toRange) {
                const startRange = customFilter.rangeVal.type === 'slider' ? customFilter.rangeVal.fromRange[0] : parseInt(customFilter.rangeVal.fromRange);
                const endRange = customFilter.rangeVal.type === 'slider' ? customFilter.rangeVal.toRange[0] : parseInt(customFilter.rangeVal.toRange);
                const rangeType = customFilter.rangeVal.type;

                console.log("Start Range ->", startRange, "<---->", "End Range:", endRange, "<---->", "Type", rangeType)

                setFilterData(prevData =>
                    rangeType === 'slider' && startRange === 458 && endRange === undefined ? prevData :
                        prevData.filter(res => {
                            const amountNum = res.amount.replace(/,/g, '');
                            return amountNum >= startRange && amountNum <= endRange
                        })
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
                {filterData.length > 0 ?
                    <Table className="h-[62vh] rounded-md">
                        <TableHeader className="sticky top-0 h-12 shadow-md z-10">
                            <TableRow className="bg-white hover:bg-white shadow-sm">
                                <TableHead className="w-10"><Checkbox className="transition-all duration-100 active:scale-125" /></TableHead>
                                <TableHead>S No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="w-24">Date</TableHead>
                                <TableHead className="w-28">Status</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filterData.map((invoice, index) => (
                                <TableRow key={index}>
                                    <TableCell className=""><Checkbox className="transition-all duration-100 active:scale-125" /></TableCell>
                                    <TableCell className="font-bold">{invoice.id}</TableCell>
                                    <TableCell>{invoice.name}</TableCell>
                                    <TableCell className="">{invoice.date}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            {invoice.status === 'sended' && <Badge variant="destructive" className="">{invoice.status}</Badge>}
                                            {invoice.status === 'received' && <Badge className="bg-green-500 hover:bg-green-400">{invoice.status}</Badge>}
                                            {invoice.status === 'spent' && <Badge variant="outline" className="">{invoice.status}</Badge>}
                                        </div>
                                    </TableCell>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <TableCell>{invoice.details.length > 66 ? invoice.details.slice(0, 66) + "..." : invoice.details}</TableCell>
                                            </TooltipTrigger>
                                            <TooltipContent className="w-80 py-2 flex items-center justify-center text-sm tracking-normal shadow-lg border top-12 relative overflow-y-auto">
                                                {invoice.details}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TableCell>₹ {invoice.amount}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <BsThreeDots className='h-5 w-5 cursor-pointer transition-all duration-100 active:scale-75' />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="relative right-4 w-min">
                                                <DropdownMenuLabel className="text-center text-zinc-500">Actions:</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <EditEntryMoney />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                    :
                    <div className="w-full flex-col flex items-center justify-end h-[61vh]">
                        <img src='/Images/notfoundimg.png' className="w-80 z-10 object-cover animate-bounce" alt='not found image' />
                        <h1 className="text-6xl drop-shadow-md absolute bottom-5 font-extrabold flex items-center ">N <RiCloseCircleFill className="inline-block mr-2 animate-spin h-10 w-10 text-red-500" />  Data Found</h1>
                    </div>
                }
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
