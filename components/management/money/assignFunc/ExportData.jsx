import { CiExport } from "react-icons/ci";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { BsFileEarmarkImage } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";





const ExportData = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="transition-all duration-100 active:scale-90 data-[state=open]:scale-90">
                <Button variant="outline"><CiExport className='h-5 w-5 mr-1' /> Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-center text-zinc-500 select-none">Save as:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2 cursor-pointer rounded-md hover:!bg-green-50 active:!bg-green-100 transition-all duration-100 active:scale-90 font-bold"><BsFileEarmarkImage className='h-5 w-5 text-green-600' />Image <sub className='-ms-1 mr-2'>(png)</sub></DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 cursor-pointer rounded-md hover:!bg-red-50 active:!bg-red-100 transition-all duration-100 active:scale-90 font-bold"><FaFilePdf className='h-5 w-5 text-red-600' />Pdf<sub className='-ms-1 mr-2'>(default)</sub></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default ExportData