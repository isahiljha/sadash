import React from 'react'
import { TbTargetArrow } from "react-icons/tb";
import { GiFlamingArrow } from "react-icons/gi";
import { MdSpaceDashboard, MdOutlineSpaceDashboard, MdLogout } from "react-icons/md";
import { FaRegNoteSticky, FaNoteSticky } from "react-icons/fa6";
import { RiUserUnfollowLine } from "react-icons/ri";
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Sidebar = ({ sidebarState, toggleSidebar }) => {
  return (

    <main className='flex flex-col py-7 px-3 h-full'>

      {/* ===================== Logo and Controls Part ========================== */}
      <div className='h-20 mb-4 px-1 flex items-center justify-between'>
        <TbTargetArrow className={`${sidebarState && 'relative'} h-9 w-9`} />
        <div className=''>
          <GiFlamingArrow onClick={() => toggleSidebar(!sidebarState)} className={`h-7 w-7 ${sidebarState ? 'rotate-[315deg]' : '-rotate-[225deg]'} bg-white p-1 rounded-full relative left-7 border cursor-pointer active:scale-75 transition-all duration-1000 active:shadow-md`} />
        </div>
      </div>

      {/* ===================== Nav Content parts ========================== */}
      <div className='flex flex-col h-full justify-between'>
        {/* ================ Top Side ==================== */}
        <nav className='flex flex-col gap-2.5'>
          <TooltipProvider>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} flex justify-start gap-2`}><MdSpaceDashboard className='h-5 w-5' /> {!sidebarState && "Dashboard"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'}`}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><MdOutlineSpaceDashboard className='h-5 w-5' /> {!sidebarState && "User"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'}`}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><RiUserUnfollowLine className='h-5 w-5' /> {!sidebarState && "Employee"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'}`}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><FaRegNoteSticky className='h-5 w-5 scale-90 opacity-90' /> {!sidebarState && "Notes"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'}`}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><RiUserUnfollowLine className='h-5 w-5' /> {!sidebarState && "Profile"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'}`}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><FaNoteSticky className='h-5 w-5 scale-90 opacity-90' /> {!sidebarState && "Management"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'}`}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>


          </TooltipProvider>
        </nav>

        {/* ================ Top Side ==================== */}
        <div className={`${sidebarState && 'hidden'}`}>
          <Card className="tracking-normal">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle className="font-extrabold tracking-normal mb-2">🚀 Let's do work</CardTitle>
              <CardDescription className="">
                This website is for keeping track of datas In-Out , managing notes to boost my  productivity.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full gap-1 " variant="destructive">
                <MdLogout className='h-4 w-4' /> Logout
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </main>
  )
}

export default Sidebar