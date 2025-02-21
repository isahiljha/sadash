import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label';

const YearlyCallender = ({ moneyData }) => {

    const [year, setYear] = useState(new Date().getFullYear())

    // Memoize month names to avoid recalculating every render
    const monthNames = useMemo(() => [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ], []);

    // Helper function to show month names
    const showMonthNames = (index) => monthNames[index - 1] || "No Month";

    function getDayOfWeek(dateStr) {
        // Split the date string into day, month, and year parts
        const [day, month, year] = dateStr.split('-');

        // Create a new Date object from the given day, month, and year
        const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript

        // Array of weekdays (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Get the day of the week (0-6)
        const dayOfWeek = date.getDay();

        // Return the corresponding weekday name
        return weekdays[dayOfWeek];
    }

    console.log("Money Yearly Data: ", moneyData);

    return (
        <>
            <div className='flex justify-end items-center absolute right-0 -top-0'>
                <Select value={year} onValueChange={setYear} >
                    <SelectTrigger className="w-max font-semibold bg-white !ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={2023}>2023</SelectItem>
                        <SelectItem value={2024}>2024</SelectItem>
                        <SelectItem value={2025}>2025</SelectItem>
                        <SelectItem value={2026}>2026</SelectItem>
                        <SelectItem value={2027}>2027</SelectItem>
                        <SelectItem value={2028}>2028</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 !ring-0">
                {Array.from({ length: 12 }, (_, index) => {
                    const filteredMoney = moneyData.filter((money) => money.date.substring(4, 5) == index + 1 && money.date.substring(6, 10) == year);
                    const monthName = showMonthNames(index + 1);

                    return (
                        <div key={index} className="h-52 md:h-52 w-full bg-white shadow shadow-black/15 rounded-lg md:px-3 md:py-2 px-2 p-2 flex flex-col md:justify-start items-center gap-1 overflow-hidden">
                            <div className="h-7 w-full font-semibold text-xs rounded-md md:text-sm flex justify-between items-center px-2 text-zinc-400">
                                <span>{monthName}</span>
                                <span>{year}</span>
                            </div>
                            <div className="w-full flex flex-wrap gap-1 mb-1 md:mb-0">
                                {filteredMoney.slice(0, 11).map((money, idx) => (
                                    <Dialog key={idx}>
                                        <DialogTrigger className='w-[48%] !outline-none'>
                                            <Badge
                                                className={`w-full text-[11px] md:text-xs bg-transparent shadow-none border hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none ${money.status === "sended" ? 'border-red-500 text-red-500 hover:bg-red-600' : money.status === "received" ? 'border-green-500 text-green-500 hover:bg-green-600' : 'bg-violet-500'}`}
                                            >
                                                ₹{money.amount}
                                            </Badge>
                                        </DialogTrigger>
                                        <DialogContent className="h-screen md:w-auto md:h-auto flex flex-col gap-5">
                                            <div className='border-b pb-3'>
                                                <DialogTitle className="flex items-center gap-2 h-max text-xl font-bold mb-2">
                                                    <span className={`font-extrabold text-lg ${money.status === "sended" ? 'text-red-500' : money.status === "received" ? ' text-green-500 ' : 'text-violet-500'}`}>{`${money.id}. `}</span>
                                                    <span>{money.name}</span>
                                                </DialogTitle>
                                                <DialogDescription>{money.details}</DialogDescription>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div>
                                                    <Label className="text-sm flex items-center gap-2 text-zinc-700">Date - <span className='text-lg font-bold text-black'>{money.date.substring(0, 2)} {monthName} {money.date.substring(6, 10)} </span>
                                                    </Label>
                                                </div>
                                                <div>
                                                    <Label className="text-sm flex items-center gap-2 text-zinc-700">Sended -
                                                        <span className={`font-extrabold text-lg ${money.status === "sended" ? 'text-red-500' : money.status === "received" ? ' text-green-500 ' : 'text-violet-500'}`}>₹{money.amount}</span>
                                                    </Label>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ))}

                                {filteredMoney.length > 4 && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Badge className="w-[48%] text-[11px] md:text-xs bg-black/80 hover:bg-black shadow-none cursor-pointer active:scale-90 transition-all duration-100 select-none line-clamp-1 px-1 text-center">
                                                +{filteredMoney.length - 4} more
                                            </Badge>
                                        </DialogTrigger>
                                        <DialogContent className="h-screen md:w-auto md:h-auto overflow-y-auto flex flex-col">
                                            <DialogHeader className="border-b pb-2 h-max">
                                                <DialogTitle className="flex items-center justify-center text-xl font-extrabold">{monthName} {year}</DialogTitle>
                                                <DialogDescription>
                                                    This dialog shows the transactions of this month. For further details click on each transaction.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="text-center text-2xl md:text-3xl font-extrabold mt-4 md:mt-2 mb-2 md:mb-3 text-violet-600">
                                                Transactions
                                            </div>
                                            <div className='grid grid-cols-2 gap-x-3 gap-y-2 justify-start items-start'>
                                                {filteredMoney.map((money, idx) => (

                                                    <Dialog key={idx}>
                                                        <DialogTrigger className='!outline-none flex items-center gap-1 md:gap-0 justify-between md:justify-around'>
                                                            <Label className="text-xs">
                                                                {getDayOfWeek(money.date)} ({money.date.substring(0, 2)}
                                                                <sup className='text-zinc-700'>
                                                                    {money.date.substring(0, 2) == 1 ? "st" : money.date.substring(0, 2) == 2 ? "nd" : "th"}
                                                            </sup>) 
                                                            </Label>
                                                            <span className='text-xs'>{"->"}</span>
                                                            <Badge
                                                                className={`w-[42%] md:w-[36%] text-[11px] md:text-xs bg-transparent shadow-none border hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none ${money.status === "sended" ? 'border-red-500 text-red-500 hover:bg-red-600' : money.status === "received" ? 'border-green-500 text-green-500 hover:bg-green-600' : 'bg-violet-500'}`}
                                                            >
                                                                ₹{money.amount}
                                                            </Badge>
                                                        </DialogTrigger>
                                                        <DialogContent className="h-screen md:w-auto md:h-[52vh] flex flex-col gap-5">
                                                            <div className='border-b pb-3'>
                                                                <DialogTitle className="flex items-center gap-2 h-max text-xl font-bold mb-2">
                                                                    <span className={`font-extrabold text-lg ${money.status === "sended" ? 'text-red-500' : money.status === "received" ? ' text-green-500 ' : 'text-violet-500'}`}>{`${money.id}. `}</span>
                                                                    <span>{money.name}</span>
                                                                </DialogTitle>
                                                                <DialogDescription>{money.details}</DialogDescription>
                                                            </div>
                                                            <div className='flex flex-col gap-2'>
                                                                <div>
                                                                    <Label className="text-sm flex items-center gap-2 text-zinc-700">Date - <span className='text-lg font-bold text-black'>{money.date.substring(0, 2)} {monthName} {money.date.substring(6, 10)} </span>
                                                                    </Label>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm flex items-center gap-2 text-zinc-700">Sended -
                                                                        <span className={`font-extrabold text-lg ${money.status === "sended" ? 'text-red-500' : money.status === "received" ? ' text-green-500 ' : 'text-violet-500'}`}>₹{money.amount}</span>
                                                                    </Label>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default YearlyCallender;
