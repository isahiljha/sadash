import { Badge } from '@/components/ui/badge'
import React from 'react'

const YearlyCallender = () => {

    const showMonthNames = (index) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return months[index - 1] || "No Month"; // Subtract 1 because index starts from 1, but array is 0-indexed
    };



    return (<>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 12 }, (_, index) => (
                <div className="h-auto md:h-44 w-full bg-white shadow shadow-black/15 rounded-lg md:px-3 md:py-2 px-2 p-2 flex flex-col md:justify-start items-center gap-1">
                    <div className="h-7 w-full font-bold rounded-md text-sm flex justify-between items-center px-2" >
                        <span>{showMonthNames(index + 1)}</span>
                        <span>2024</span>
                    </div>
                    <div className="w-full flex flex-wrap gap-1 mb-1 md:mb-0">
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-green-600 text-green-700 hover:bg-green-600 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 40,000</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-green-600 text-green-700 hover:bg-green-600 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 30,000</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-red-600 text-red-700 hover:bg-red-500 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 60,000</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-red-600 text-red-700 hover:bg-red-500 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 7,000</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-green-600 text-green-700 hover:bg-green-600 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 12,000</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-green-600 text-green-700 hover:bg-green-600 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 250</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-red-600 text-red-700 hover:bg-red-500 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 4,000</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-red-600 text-red-700 hover:bg-red-500 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 20,000</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-transparent shadow-none border border-green-600 text-green-700 hover:bg-green-600 hover:text-white cursor-pointer active:scale-90 transition-all duration-100 select-none">₹ 70,000</Badge>
                        <Badge className="w-[48%] text-[11px] md:text-xs bg-black/80 hover:bg-black shadow-none cursor-pointer active:scale-90 transition-all duration-100 select-none line-clamp-1 px-1">+ {Math.floor(Math.random() * 99) + 1 } more</Badge>
                    </div>
                </div>
            ))}
        </div>
    </>)
}

export default YearlyCallender