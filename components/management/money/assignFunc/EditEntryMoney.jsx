import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DivButton } from "@/components/ui/divButton";
import { IoIosSave, IoMdArrowRoundBack } from "react-icons/io";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react";
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
import { MdEditDocument } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchInvoiceData } from "@/features/moneyManagement";
import { format } from "date-fns";

const EditEntryMoney = ({ invoiceData }) => {

  // Function to convert "DD-MM-YYYY" to Date object
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  
  const formatAmount = (value) => {
    let numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const [editEntryModal, setEditEntryModal] = useState(false);
  const [transferDate, setTransferDate] = useState(parseDate(invoiceData.date));
  const [name, setName] = useState(invoiceData.name);
  const [status, setStatus] = useState(invoiceData.status);
  const [amount, setAmount] = useState(formatAmount(invoiceData.amount));
  const [description, setDescription] = useState(invoiceData.details);
  const editDispach = useDispatch();



  const secretKey = "eyJh_eyJzdWIIk6yJV_a4I6IOIjoxNTsK63OIyfQ_Sf1iOiIxMpMeJf3iwkpXVCJ9iJxwRJSMeKKF2QTYIE2MjM5MD6PjbGldQwciOssiIiaWF05c"; // Replace with your secret key


  const handleAmountChange = (e) => {
    let rawValue = e.target.value.replace(/,/g, "");
    if (rawValue.length > 5) {
      return;
    }
    const formattedValue = formatAmount(rawValue);
    setAmount(formattedValue);
  };

  const disableStateResetBtn = name === invoiceData.name && status === invoiceData.status && amount === formatAmount(invoiceData.amount) && description === invoiceData.details && transferDate != parseDate(invoiceData.date);

  const resetEditChanges = () => {
    setTransferDate(parseDate(invoiceData.date));
    setName(invoiceData.name)
    setStatus(invoiceData.status)
    setAmount(formatAmount(invoiceData.amount))
    setDescription(invoiceData.details)
  }

  const handleSave = async () => {

    const formattedDate = format(transferDate, 'dd-MM-yyyy');
    const reConstructAmount = amount.replace(/,/g, '');

    const editFormData = {
      id: invoiceData.id,
      name,
      transferDate: formattedDate,
      status,
      amount: reConstructAmount,
      description,
    };

    console.log(editFormData)

    const response = await fetch('https://silver-chough-461551.hostingersite.com/api/editMoneyEntry.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
      },
      body: JSON.stringify(editFormData),
    });

    const result = await response.json();
    if (result.success) {

      editDispach(fetchInvoiceData());
      setEditEntryModal(false);
    } else {
      alert("Failed to update the record: " + result.message);
    }


  };

  return (
    <>
      <AlertDialog defaultOpen={editEntryModal} open={editEntryModal} onOpenChange={setEditEntryModal}>
        <AlertDialogTrigger asChild>
          <Button className="w-full hover:bg-zinc-200 active:bg-zinc-300 transition-all duration-100 active:scale-90 justify-normal" variant="ghosted">
            <MdEditDocument className='h-5 w-5 mr-1' /> Edit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className=" max-w-[51vw] flex flex-col">
          <AlertDialogCancel className="absolute left-4 top-4 transition-all duration-100 active:scale-90 border-dark hover:bg-dark hover:text-white h-8 rounded-md px-3 text-xs">
            <IoMdArrowRoundBack className="h-4 w-4 mr-1 -ms-2" /> Back
          </AlertDialogCancel>

          <div className="h-max w-full flex flex-col justify-start items-center pb-2 border-zinc-200 border-b mb-2">
            <AlertDialogTitle className="text-3xl mt-1 font-extrabold text-zinc-800 mb-3">Edit Entry</AlertDialogTitle>
            <AlertDialogDescription className="w-full px-12 text-center tracking-wide">
              Modify the fields below to update the record for the money flow tracking.
            </AlertDialogDescription>
          </div>

          <div className="h-full w-full flex flex-col gap-7">
            <div className="flex justify-between gap-7">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="name" className="text-sm">Person's name</Label>
                <Input type="text" id="name" placeholder="Enter name here" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="date" className="text-sm">Date of transfer</Label>
                <Popover>
                  <PopoverTrigger className="relative flex-1 grow-0">
                    <div className="relative ml-auto flex-1 md:grow-0">
                      <IoCalendarNumberOutline className="absolute right-2.5 z-10 top-3.5 text-zinc-600 h-5 w-5 text-muted-foreground" />
                      <DivButton
                        variant="outline"
                        className="w-full h-10 relative top-1 font-normal text-zinc-500 rounded-lg bg-background pl-9 cursor-pointer justify-start ps-3"
                      >{transferDate.toLocaleDateString()}</DivButton>
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
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sended">
                      <div className="flex items-center gap-1"><GiPayMoney className="h-5 w-5 text-red-700" /> Sended</div>
                    </SelectItem>
                    <SelectItem value="received">
                      <div className="flex items-center gap-1"><GiReceiveMoney className="h-5 w-5 text-green-700" /> Received</div>
                    </SelectItem>
                    <SelectItem value="spent">
                      <div className="flex items-center gap-1"><GiTakeMyMoney className="h-5 w-5 text-zinc-700" /> Spent</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input type="text" id="amount" placeholder="In Rs." value={amount} onChange={handleAmountChange} />
              </div>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea className="h-20" placeholder="Write message here" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="w-full flex justify-end gap-3">
              <Button
                disabled={disableStateResetBtn}
                onClick={resetEditChanges}
                className="transition-all duration-100 active:scale-90 selection:hidden"
                variant="outline"><RxReset className="h-4 w-4 mr-1 -ms-1" /> Reset</Button>
              <Button
                className="transition-all duration-100 selection:hidden active:scale-90 bg-green-600 hover:bg-green-500"
                disabled={disableStateResetBtn}
                onClick={handleSave}
              ><IoIosSave className="h-5 w-5 mr-1 -ms-1" /> Save</Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default EditEntryMoney;
