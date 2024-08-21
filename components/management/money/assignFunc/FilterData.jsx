import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DivButton } from "@/components/ui/divButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { IoCalendarNumberOutline, IoFilterOutline } from "react-icons/io5"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CgArrowsExchangeAlt } from "react-icons/cg";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GiMoneyStack, GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"



const FilterData = ({ customFilter, setCustomFilter }) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [fromOpen, setFromOpen] = useState(false);
    const [toOpen, setToOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState(customFilter.statusVal);
    const [priceRange, setPriceRange] = useState(customFilter.rangeVal.fromRange);
    const [toPrice, setToPrice] = useState(customFilter.rangeVal.toRange);
    const [tabPrice, setTabPrice] = useState(customFilter.rangeVal.type === 'slider' ? 'pricerange' : 'priceinput');
    const [inpMinPrice, setInpMinPrice] = useState(null);
    const [inpMaxPrice, setInpMaxPrice] = useState(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [onFilterMode, setOnFilterMode] = useState({
        datefield: false,
        statusfield: false,
        rangefield: false,
    });

    // Sync local state with customFilter when it changes
    useEffect(() => {
        setFromDate(new Date(customFilter.dateVal.fromDate));
        setToDate(new Date(customFilter.dateVal.toDate));
        setStatusFilter(customFilter.statusVal);
        setPriceRange(customFilter.rangeVal.fromRange);
        setToPrice(customFilter.rangeVal.toRange);
        setTabPrice(customFilter.rangeVal.type === 'slider' ? 'pricerange' : 'priceinput');
    }, [customFilter]);

    const handleCheckboxFilter = (checked, fieldname) => {
        setOnFilterMode((prevFields) => ({
            ...prevFields,
            [fieldname]: checked,
        }));
    };

    const handleFromDateSelect = (date) => {
        setFromDate(date);
        setFromOpen(false);
    };

    const handleToDateSelect = (date) => {
        setToDate(date);
        setToOpen(false);
    };

    const handlePriceChange = (newValue) => {
        setPriceRange(newValue);
    };

    const resetCustomFilter = () => {
        setCustomFilter({
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
        });
        setOnFilterMode({
            datefield: false,
            statusfield: false,
            rangefield: false,
        });
    };

    const applyCustomFilter = () => {
        setCustomFilter({
            dateVal: {
                fromDate: onFilterMode.datefield ? fromDate : new Date(),
                toDate: onFilterMode.datefield ? toDate : new Date(),
            },
            statusVal: onFilterMode.statusfield ? statusFilter : customFilter.statusVal,
            rangeVal: {
                type: tabPrice === 'pricerange' ? 'slider' : 'input',
                fromRange: onFilterMode.rangefield ? (tabPrice === 'pricerange' ? priceRange : inpMinPrice) : customFilter.rangeVal.fromRange,
                toRange: onFilterMode.rangefield ? (tabPrice === 'pricerange' ? toPrice : inpMaxPrice) : customFilter.rangeVal.toRange,
            },
        });
        setSheetOpen(false);
    };


    return (
        <Sheet defaultOpen={sheetOpen} onOpenChange={setSheetOpen} open={sheetOpen} >
            <SheetTrigger asChild>
                <Button variant="outline" className="transition-all duration-100 active:scale-90">
                    <IoFilterOutline className='h-4 w-4 mr-1' /> Filter
                </Button>
            </SheetTrigger>
            <SheetContent aria-describedby={undefined} >
                <SheetHeader className="border-b pb-1">
                    <SheetTitle className="text-2xl font-extrabold tracking-wide text-red-900">Filter By:</SheetTitle>
                </SheetHeader>

                {/* ----------------------- from -to- date -------------------- */}
                <div className="mt-7">
                    <p className="mt-4 text-base font-bold"><div>
                        <Checkbox
                            checked={onFilterMode.datefield}
                            defaultChecked={onFilterMode.datefield}
                            onCheckedChange={(checked) => handleCheckboxFilter(checked, 'datefield')}
                            className="data-[state=checked]:relative data-[state=checked]:top-0.5 transition-all duration-100 active:scale-125 mr-1" /> Date</div></p>
                    <div className="flex justify-between items-center">
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Popover open={fromOpen} onOpenChange={setFromOpen}>
                                <PopoverTrigger disabled={!onFilterMode.datefield} className={`relative flex-1 grow-0 ${!onFilterMode.datefield && 'opacity-30'}`}>
                                    <div className="relative ml-auto flex-1 md:grow-0">
                                        <IoCalendarNumberOutline className="absolute right-2.5 z-10 top-3.5 text-zinc-600 h-5 w-5 text-muted-foreground" />
                                        <DivButton
                                            variant="outline"
                                            className={`w-full h-10 relative top-1 font-normal text-zinc-500 rounded-lg bg-background pl-9 ${!onFilterMode.datefield && 'cursor-default bg-red-50 border-red-50'} justify-start ps-3`}
                                        >{fromDate ? fromDate.toLocaleDateString() : "From..."}</DivButton>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 border-0 w-64 relative left-12">
                                    <Calendar
                                        mode="single"
                                        selected={fromDate}
                                        onSelect={handleFromDateSelect}
                                        className="rounded-md border"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <CgArrowsExchangeAlt className={`text-5xl mx-1.5 ${!onFilterMode.datefield && 'text-red-50'}`} />
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Popover open={toOpen} onOpenChange={setToOpen}>
                                <PopoverTrigger disabled={!onFilterMode.datefield} className={`relative flex-1 grow-0 ${!onFilterMode.datefield && 'opacity-30'}`}>
                                    <div className="relative ml-auto flex-1 md:grow-0">
                                        <IoCalendarNumberOutline className="absolute right-2.5 z-10 top-3.5 text-zinc-600 h-5 w-5 text-muted-foreground" />
                                        <DivButton
                                            variant="outline"
                                            className={`w-full h-10 relative top-1 font-normal text-zinc-500 rounded-lg bg-background pl-9 ${!onFilterMode.datefield && 'cursor-default bg-red-50 border-red-50'} justify-start ps-3`}
                                        >{toDate ? toDate.toLocaleDateString() : "To..."}</DivButton>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 border-0 w-64 relative right-5">
                                    <Calendar
                                        mode="single"
                                        selected={toDate}
                                        onSelect={handleToDateSelect}
                                        className="rounded-md border"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                {/* ----------------------- from -to- date -------------------- */}


                {/* ----------------------- select status -------------------- */}
                <div className="grid w-full max-w-sm items-center gap-2 mt-5">
                    <Label htmlFor="email" className="text-base font-bold">
                        <div>
                            <Checkbox
                                checked={onFilterMode.statusfield}
                                defaultChecked={onFilterMode.statusfield}
                                onCheckedChange={(checked) => handleCheckboxFilter(checked, 'statusfield')}
                                className="data-[state=checked]:relative data-[state=checked]:top-0.5 transition-all duration-100 active:scale-125 mr-1" /> Status</div>
                    </Label>
                    <Select
                        disabled={!onFilterMode.statusfield}
                        value={statusFilter}
                        defaultValue={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger className={`${!onFilterMode.statusfield && 'bg-red-50 border-red-50'}`}>
                            <SelectValue placeholder="Choose a status" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="all">
                                <div className="flex items-center gap-1"><GiMoneyStack className="h-5 w-5 text-green-700" /> All</div>
                            </SelectItem>
                            <SelectItem value="sended">
                                <div className="flex items-center gap-1"><GiPayMoney className="h-5 w-5 text-green-700" /> Sended</div>
                            </SelectItem>
                            <SelectItem value="received">
                                <div className="flex items-center gap-1"><GiReceiveMoney className="h-5 w-5 text-green-700" /> Received</div>
                            </SelectItem>
                            <SelectItem value="spent">
                                <div className="flex items-center gap-1"><GiTakeMyMoney className="h-5 w-5 text-green-700" /> Spent</div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* ----------------------- select status -------------------- */}


                {/* ----------------------- Price Range -------------------- */}
                <div className="grid w-full max-w-sm items-center gap-2 mt-5">
                    <Tabs defaultValue={tabPrice} onValueChange={setTabPrice}>
                        <Label htmlFor="amount" className="text-base font-bold flex justify-between items-end -mb-2"> <div>
                            <Checkbox
                                checked={onFilterMode.rangefield}
                                defaultChecked={onFilterMode.rangefield}
                                onCheckedChange={(checked) => handleCheckboxFilter(checked, 'rangefield')}
                                className="data-[state=checked]:relative data-[state=checked]:top-0.5 transition-all duration-100 active:scale-125 mr-1" /> Amount </div>
                            <TabsList className="h-7">
                                <TabsTrigger disabled={!onFilterMode.rangefield} value="pricerange" className="h-5 text-xs">Range</TabsTrigger>
                                <TabsTrigger disabled={!onFilterMode.rangefield} value="priceinput" className="h-5 text-xs">Custom</TabsTrigger>
                            </TabsList>
                        </Label>
                        <TabsContent value="pricerange" className="select-none">
                            <div className="flex w-full items-center justify-between">
                                <span className={`text-sm ${!onFilterMode.rangefield && 'opacity-30 select-none'}`}>₹{priceRange[0]}</span>
                                <Slider
                                    defaultValue={priceRange[0]}
                                    min={0}
                                    max={1000}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={handlePriceChange}
                                    className={`w-full ms-2 ${!onFilterMode.rangefield && 'opacity-30'} `}
                                    rangeBg="bg-gradient-to-r from-red-400 via-red-700 to-red-950"
                                    disabled={!onFilterMode.rangefield}
                                />
                                <CgArrowsExchangeAlt className={`text-5xl mx-1.5 ${!onFilterMode.rangefield && 'text-red-50'}`} />
                                <Slider
                                    defaultValue={[toPrice]}
                                    min={0}
                                    max={5000}
                                    step={50}
                                    onValueChange={setToPrice}
                                    className={`w-full me-2 ${!onFilterMode.rangefield && 'opacity-30'} `}
                                    rangeBg="bg-gradient-to-l from-red-400 via-red-700 to-red-950"
                                    disabled={!onFilterMode.rangefield}
                                />
                                <span className={`text-sm ${!onFilterMode.rangefield && 'opacity-30 select-none'}`}>₹{toPrice}</span>
                            </div>
                        </TabsContent>
                        <TabsContent value="priceinput">
                            <div className="flex justify-between pt-2">
                                <div className="grid w-full max-w-sm items-center gap-2">
                                    <Input
                                        disabled={!onFilterMode.rangefield}
                                        value={inpMinPrice === null ? '' : inpMinPrice}
                                        onChange={(e) => setInpMinPrice(e.target.value)}
                                        type="number" id="email" placeholder=" ₹ Min" />
                                </div>
                                <CgArrowsExchangeAlt className="text-5xl mx-1.5" />
                                <div className="grid w-full max-w-sm items-center gap-2">
                                    <Input
                                        disabled={!onFilterMode.rangefield}
                                        value={inpMaxPrice === null ? '' : inpMaxPrice}
                                        onChange={(e) => setInpMaxPrice(e.target.value)}
                                        type="number" id="email" placeholder=" ₹ Max" />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                {/* ----------------------- Price Range  -------------------- */}

                <div className="border-b mt-7 mb-6 pb-2">
                    <SheetTitle className="text-2xl font-extrabold tracking-wide text-red-900">Display By:</SheetTitle>
                </div>

                <div className="flex items-center gap-4">
                    <Label htmlFor="email" className="font-bold text-base w-max">No of Rows :</Label>
                    <Select>
                        <SelectTrigger className="w-1/5">
                            <SelectValue placeholder="20" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-6">
                    <Label htmlFor="email" className="font-bold text-base w-max">Columns :</Label>
                    <div className="mt-3 grid grid-cols-3 gap-7">
                        <Label htmlFor="amount" className="flex justify-between items-end -mb-2"> <div><Checkbox className="relative top-0.5 transition-all duration-100 active:scale-125 mr-1" /> S No. </div></Label>
                        <Label htmlFor="amount" className="flex justify-between items-end -mb-2"> <div><Checkbox className="relative top-0.5 transition-all duration-100 active:scale-125 mr-1" /> Name </div></Label>
                        <Label htmlFor="amount" className="flex justify-between items-end -mb-2"> <div><Checkbox className="relative top-0.5 transition-all duration-100 active:scale-125 mr-1" /> Date </div></Label>
                        <Label htmlFor="amount" className="flex justify-between items-end -mb-2"> <div><Checkbox className="relative top-0.5 transition-all duration-100 active:scale-125 mr-1" /> Status </div></Label>
                        <Label htmlFor="amount" className="flex justify-between items-end -mb-2"> <div><Checkbox className="relative top-0.5 transition-all duration-100 active:scale-125 mr-1" /> Details </div></Label>
                        <Label htmlFor="amount" className="flex justify-between items-end -mb-2"> <div><Checkbox className="relative top-0.5 transition-all duration-100 active:scale-125 mr-1" /> Amount </div></Label>
                    </div>
                </div>

                <div className="flex justify-end relative top-12 gap-4">
                    <SheetClose asChild>
                        <Button
                            disabled={!onFilterMode.datefield && !onFilterMode.rangefield && !onFilterMode.statusfield}
                            onClick={resetCustomFilter}
                            variant="outline"
                            className={` ${!onFilterMode.datefield && !onFilterMode.rangefield && !onFilterMode.statusfield && 'select-none'} uppercase transition-all duration-100 active:scale-90`} >Reset</Button>
                    </SheetClose>
                    <Button
                        disabled={!onFilterMode.datefield && !onFilterMode.rangefield && !onFilterMode.statusfield}
                        onClick={applyCustomFilter}
                        className={`${!onFilterMode.datefield && !onFilterMode.rangefield && !onFilterMode.statusfield && 'select-none'} uppercase transition-all duration-100 active:scale-90 bg-red-600 active:bg-blue-500`} >Apply</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default FilterData
