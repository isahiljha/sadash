import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { FaTrash } from 'react-icons/fa'
import { ImSpinner9 } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { fetchInvoiceData } from '@/features/moneyManagement'

const DeleteUser = ({ invoiceData }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [closeDeleteModal, setCloseDeleteModal] = useState(false);
    const deleteDispach = useDispatch();

    const secretKey = "eyJh_eyIiaiJxwRJSE2MjM5MD_Sf1ik6IxMpM9dQwcii2KKFyJV_a4QTYIsK63OIeJf3iwkpX6PjbGlJzdWIIOIjoxNTMeI6IOVCJyfQOssi5c"; // Replace with your secret key


    const deleteUser = async (userId) => {
        try {
            setIsDeleting(true);
            await fetch('https://silver-chough-461551.hostingersite.com/api/deleteMoneyEntry.php', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${secretKey}`,
                },
                body: JSON.stringify({ userId })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.log("error data", data.error);
                    } else {
                        console.log("Done Delete", data.message);
                        setIsDeleting(false);
                        setCloseDeleteModal(false);
                        toast({
                            toastType: "success",
                            title: " Deleted Successfully",
                            duration: 1500,
                            description: `${invoiceData.name}'s record is no longer exists in the server`,
                        });
                        deleteDispach(fetchInvoiceData());
                    }
                })

        } catch (error) {
            console.error("error deleting", error.message);
        }
    }

    return (<>
        <Dialog onOpenChange={setCloseDeleteModal} open={closeDeleteModal}>
            <DialogTrigger asChild>
                <Button className="w-full hover:bg-red-100 active:bg-red-200 transition-all duration-100 active:scale-90 text-red-600 justify-normal" variant="ghosted"><FaTrash className='h-4 w-4 mr-1' /> Delete</Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-dark dark:border-zinc-500 w-[92vw] md:w-[450px] rounded-lg">
                <DialogTitle>
                    {isDeleting ? <span className='tracking-normal text-sm animate-pulse '>Please Wait....</span> : "Are you absolutely sure?"}
                </DialogTitle>
                <DialogDescription className="dark:text-zinc-500">

                    {isDeleting ?
                        <div className='flex flex-col justify-center items-center'>
                            <ImSpinner9 className='h-20 w-20 animate-spin text-red-500' />
                            <h3 className='text-xl relative left-2.5 top-2 font-bold text-red-500 tracking-normal'>Deleting....</h3>
                            {/* <p className='mt-3 tracking-wide text-zinc-500'>Please wait while we are processing. Do not turn off this device.</p> */}
                        </div>
                        : <div>
                            This action cannot be undone. This will permanently delete the <span className='font-extrabold text-base tracking-wide text-red-500'>({invoiceData.name}'s)</span> record from our servers.
                        </div>}


                </DialogDescription>
                {!isDeleting && <DialogFooter className='gap-2 md:gap-0'>
                    <DialogClose>
                        <Button variant="outline" className="w-full dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-950 h-9 text-sm active:scale-90 transition-all duration-100 shadow-md active:shadow-none active:bg-zinc-200 select-none">Cancel</Button>
                    </DialogClose>
                    <Button className="h-9 text-sm !bg-red-500 !text-white hover:!bg-red-600 shadow-md shadow-red-100 dark:shadow-red-950 active:scale-90 transition-all duration-100" onClick={() => deleteUser(invoiceData.id)}>Delete</Button>
                </DialogFooter>}
            </DialogContent>
        </Dialog>
    </>)
}

export default DeleteUser