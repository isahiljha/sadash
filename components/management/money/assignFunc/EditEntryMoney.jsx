import { Button } from '@/components/ui/button'
import React from 'react'
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const EditEntryMoney = () => {
  return (<>
    <Button className="w-full hover:bg-zinc-200 active:bg-zinc-300 transition-all duration-100 active:scale-90 justify-normal" variant="ghosted"> <MdEditDocument className='h-5 w-5 mr-1'/> Edit</Button>
    <Button className="w-full hover:bg-red-100 active:bg-red-200 transition-all duration-100 active:scale-90 text-red-600 justify-normal" variant="ghosted"><FaTrash className='h-4 w-4 mr-1' /> Delete</Button>
  </>
  )
}

export default EditEntryMoney