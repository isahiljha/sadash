import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const YearlyCallender = ({ moneyData }) => {

    // Memoize month names to avoid recalculating every render
    const monthNames = useMemo(() => [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ], []);

    // Helper function to show month names
    const showMonthNames = (index) => monthNames[index - 1] || "No Month";

    console.log("Money Yearly Data: ", moneyData);

    return (
        <>
            <div className='flex justify-end items-center absolute right-0 -top-0'>
                <Select>
                    <SelectTrigger className="w-max font-semibold bg-white !ring-0">
                        <SelectValue placeholder="2024" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 !ring-0">
                {Array.from({ length: 12 }, (_, index) => {
                    const filteredMoney = moneyData.filter((money) => money.date.substring(4, 5) == index + 1);
                    const monthName = showMonthNames(index + 1);

                    return (
                        <div key={index} className="h-52 md:h-52 w-full bg-white shadow shadow-black/15 rounded-lg md:px-3 md:py-2 px-2 p-2 flex flex-col md:justify-start items-center gap-1 overflow-hidden">
                            <div className="h-7 w-full font-semibold text-xs rounded-md md:text-sm flex justify-between items-center px-2 text-zinc-400">
                                <span>{monthName}</span>
                                <span>2024</span>
                            </div>
                            <div className="w-full flex flex-wrap gap-1 mb-1 md:mb-0">
                                {filteredMoney.slice(0, 11).map((money, idx) => (
                                    <Badge
                                        key={idx}
                                        className={`w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none ${money.status === "sended" ? 'border-green-600 text-green-700 hover:bg-green-600' : money.status === "received" ? 'border-red-600 text-red-700 hover:bg-red-500' : 'bg-violet-500'}`}
                                    >
                                        ₹{money.amount}
                                    </Badge>
                                ))}

                                {filteredMoney.length > 4 && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Badge className="w-[48%] text-[11px] md:text-xs bg-black/80 hover:bg-black shadow-none cursor-pointer active:scale-90 transition-all duration-100 select-none line-clamp-1 px-1 text-center">
                                                +{filteredMoney.length - 4} more
                                            </Badge>
                                        </DialogTrigger>
                                        <DialogContent className="h-screen md:w-auto md:h-auto">
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="text-center text-3xl font-extrabold text-red-500">
                                                {monthName} {index + 1} and more
                                            </div>
                                            <div>
                                                {filteredMoney.map((money, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        className={`w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none ${money.status === "sended" ? 'border-green-600 text-green-700 hover:bg-green-600' : money.status === "received" ? 'border-red-600 text-red-700 hover:bg-red-500' : 'bg-violet-500'}`}
                                                    >
                                                        {money.amount}
                                                    </Badge>
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
