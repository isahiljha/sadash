import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DivButton } from "@/components/ui/divButton";
import { TbCopyPlusFilled } from "react-icons/tb";
import { IoIosSave, IoMdArrowRoundBack } from "react-icons/io";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IoCalendarNumberOutline } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { RxReset } from "react-icons/rx";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";



const AddEntry = () => {

    const [transferDate, setTransferDate] = useState(Date | undefined > (new Date()))


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="transition-all duration-100 active:scale-90"><TbCopyPlusFilled className='h-4 w-4 mr-2' /> Add Entry</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className=" max-w-[51vw] flex flex-col">
                {/* ---------------------- back button ---------------------- */}
                <AlertDialogCancel className="absolute left-4 top-4 transition-all duration-100 active:scale-90 border-dark hover:bg-dark hover:text-white h-8 rounded-md px-3 text-xs"><IoMdArrowRoundBack className="h-4 w-4 mr-1 -ms-2" /> Back</AlertDialogCancel>
                {/* ---------------------- back button ---------------------- */}

                {/* --------------------------- title part --------------------- */}
                <div className="h-max w-full flex flex-col justify-start items-center pb-2 border-zinc-200 border-b mb-2">
                    <AlertDialogTitle className="text-3xl mt-1 font-extrabold text-zinc-800 mb-3">Add New Entry</AlertDialogTitle>
                    <AlertDialogDescription className="w-full px-12 text-center tracking-wide">
                        Fill all of the given fields for adding a new record for the money flow traking. All of the fields are important so each fields should be filled carefully.
                    </AlertDialogDescription>
                </div>
                {/* --------------------------- title part --------------------- */}

                {/* ------------------------ input fields ------------------------- */}
                <div className="h-full w-full flex flex-col gap-7">
                    <div className="flex justify-between gap-7">
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email" className="text-sm">Person's name</Label>
                            <Input type="email" id="email" placeholder="Enter name here" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email" className="text-sm">Date of transfer</Label>
                            <Popover>
                                <PopoverTrigger className="relative flex-1 grow-0">
                                    <div className="relative ml-auto flex-1 md:grow-0">
                                        <IoCalendarNumberOutline className="absolute right-2.5 z-10 top-3.5 text-zinc-600 h-5 w-5 text-muted-foreground" />
                                        <DivButton
                                            variant="outline"
                                            className="w-full h-10 relative top-1 font-normal text-zinc-500 rounded-lg bg-background pl-9 cursor-pointer justify-start ps-3"
                                        >Pick a date</DivButton>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 border-0 w-64">
                                    <Calendar
                                        mode="single"
                                        selected={transferDate}
                                        onSelect={setTransferDate}
                                        className="rounded-md border"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex justify-between gap-7">
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sended"><div className="flex items-center gap-1"><GiPayMoney className="h-5 w-5 text-green-700"/> Sended</div></SelectItem>
                                    <SelectItem value="recieved"><div className="flex items-center gap-1"><GiReceiveMoney className="h-5 w-5 text-green-700"/> Recieved</div></SelectItem>
                                    <SelectItem value="spent"><div className="flex items-center gap-1"><GiTakeMyMoney className="h-5 w-5 text-green-700"/> Spent</div></SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Amount </Label>
                            <Input type="email" id="email" placeholder="In Rs." />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-2">
                        <Label htmlFor="email">Description </Label>
                        <Textarea className="h-20" placeholder="Write message here" />
                    </div>
                    <div className="w-full flex justify-end gap-3">
                        <Button className="transition-all duration-100 active:scale-90" variant="outline"><RxReset className="h-4 w-4 mr-1 -ms-1"/> Reset</Button>
                        <Button className="transition-all duration-100 active:scale-90"><IoIosSave className="h-5 w-5 mr-1 -ms-1"/> Save</Button>
                    </div>
                </div>
                {/* ------------------------ input fields ------------------------- */}
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AddEntry