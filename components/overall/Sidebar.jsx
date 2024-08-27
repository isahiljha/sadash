import React, { useContext, useEffect, useState } from 'react'
import { GiBottomRight3dArrow } from "react-icons/gi";
import { MdSpaceDashboard, MdOutlineSpaceDashboard, MdLogout, MdInfo, MdOutlineLightMode, MdNightlightRound, MdWorkOutline } from "react-icons/md";
import { FaRegNoteSticky, FaNoteSticky, FaUser, FaCreditCard } from "react-icons/fa6";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { GearIcon } from '@radix-ui/react-icons';
import { BsClipboardDataFill, BsFileEarmarkText } from "react-icons/bs";
import { HiComputerDesktop } from "react-icons/hi2";
import { ThemeContext } from '@/context/ThemeContext';
import { BsClipboardData } from "react-icons/bs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GiTakeMyMoney } from "react-icons/gi";
import { useRouter } from 'next/router';
import { DivButton } from '../ui/divButton';
import { useAuth } from '@/context/AuthContent';



const Sidebar = ({ sidebarState, toggleSidebar, closeMobileDrawer }) => {

  const [isPortalOpen, setPortal] = useState(false);
  const { setLightTheme, setDarkTheme } = useContext(ThemeContext);
  const [accordVal, setAccordVal] = useState('');
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleCtrlPlusSlash = (evnt) => {
      if (evnt.ctrlKey && evnt.key === '/') {
        evnt.preventDefault();
        setPortal((prevPortal) => !prevPortal)
      }
    };

    window.addEventListener('keydown', handleCtrlPlusSlash);

    return () => {
      window.removeEventListener('keydown', handleCtrlPlusSlash);
    }

  }, [])

  const goToLink = (dynamicLink) => {
    router.push(`${dynamicLink}`, undefined, { shallow: true });
    if (window.innerWidth <= 768) {
      closeMobileDrawer();
    }
  }

  useEffect(() => {
    if (router.isReady) {

      const onEffectLink = (pageId) => {
        return router.pathname == pageId;
      }
      setAccordVal(onEffectLink('/management/money') || onEffectLink('/management/work') ? 'management' : '')
    }
  }, [router.isReady, router.pathname])


  const isOnLink = (pageId) => {
    return router.pathname == pageId;
  }


  return (

    <main className='flex flex-col py-7 px-3 h-full'>

      {/* ===================== Logo and Controls Part ========================== */}
      <div className='h-12 pb-4 mb-6 px-1 flex items-center justify-between border-b'>

        <div className='flex items-center gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute z-20 flex items-center text-base md:text-lg select-none">
                  <img src="/Images/logo-nobg.png" height={!sidebarState ? 51 : 45} width={!sidebarState ? 51 : 45} className={`${sidebarState && 'relative -left-2'}`} alt="" /> {!sidebarState && <span className='relative top-1.5 text-3xl  -left-1.5 font-extrabold'>adash</span>}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} -left-3 relative p-0`}>
                <div className='h-12 w-40 top-12 flex justify-end items-center text-2xl font-extrabold bg-gradient-to-r from-[#ffdeb5] via-[#cf9b7a] to-[#0e90ac] text-white hover:bg-gradiant-to-l hover:shadow-lg active:shadow-sm active:from-[#b4dfac] active:via-[#72a27a] active:to-[#0e90ac] pe-7 select-none'>Sadash</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <TbTargetArrow  /> */}
        </div>

        <div className='hidden md:block'>
          <GiBottomRight3dArrow onClick={() => toggleSidebar(!sidebarState)} className={`h-7 w-7 ${sidebarState ? 'rotate-[315deg] !left-7' : '-rotate-[225deg]'} bg-white dark:bg-zinc-800 dark:text-white p-1 rounded-full relative left-7 border dark:border-zinc-600 cursor-pointer active:scale-75 transition-all duration-500 active:shadow-md z-30`} />
        </div>
      </div>

      {/* ===================== Nav Content parts ========================== */}
      <div className='flex flex-col h-full justify-between'>
        {/* ================ Top Part ==================== */}
        <nav className='flex flex-col gap-2.5'>
          <TooltipProvider>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button bg={`${isOnLink('/') && 'themeBtn'}`} variant="navbtn" onClick={() => goToLink('/')} className={`w-full ${sidebarState && 'ps-3'} ${isOnLink('/') ? 'bg-red-100 hover:bg-red-100 dark:bg-red-800/30' : 'bg-white dark:bg-dark'} flex justify-start gap-2`}>
                  {isOnLink('/') && <MdSpaceDashboard className={`${isOnLink('/') && 'text-teal-500'} h-5 w-5`} />}
                  {!isOnLink('/') && <MdOutlineSpaceDashboard className={`${isOnLink('/') && 'text-teal-500'} h-5 w-5`} />}
                  {!sidebarState && "Dashboard"}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} left-1 relative`}>
                <p>Dashboard</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><FaRegNoteSticky className='h-5 w-5 scale-90 opacity-90' /> {!sidebarState && "Notes"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} left-1 relative`}>
                <p>Notes</p>
              </TooltipContent>
            </Tooltip>





            {/* ----------------------------- menu accordion starts ------------------------- */}
            <Accordion value={accordVal} onValueChange={setAccordVal} type="single" collapsible>
              <AccordionItem value="management" className="border-b-0">
                <AccordionTrigger className={`py-0 hover:no-underline data-[state=open]:border-b-2 rounded-md data-[state=open]:border-teal-500`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DivButton variant="navbtn" className={`w-full ${sidebarState && 'ps-3 -mr-5'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}>
                        {accordVal && <BsClipboardDataFill className='h-5 w-5 text-teal-500' />}
                        {!accordVal && <BsClipboardData className='h-5 w-5' />}
                        {!sidebarState && "Management"}</DivButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} left-1 relative`}>
                      <p>Management</p>
                    </TooltipContent>
                  </Tooltip>
                </AccordionTrigger>
                {/* --------------- accordion content starts ------------------- */}
                <AccordionContent className="py-2 ps-5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DivButton bg={`${isOnLink('/management/money') && 'themeBtn'}`} onClick={() => goToLink('/management/money')} variant="navbtn" className={`w-full ${sidebarState && 'px-1 -left-1 relative'} ${isOnLink('/management/money') ? '' : 'bg-white dark:bg-dark'} shadow-none hover:shadow-sm flex justify-start gap-2`}  >
                        <GiTakeMyMoney className={`${isOnLink('/management/money') && 'text-teal-500'} h-5 w-5`} />
                        {!sidebarState && "Money"}
                      </DivButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} left-1 relative`}>
                      <p>Money</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DivButton bg={`${isOnLink('/management/work') && 'themeBtn'}`} onClick={() => goToLink('/management/work')} variant="navbtn" className={`w-full ${sidebarState && 'px-1 -left-1 relative'} ${isOnLink('/management/work') ? '' : 'bg-white dark:bg-dark'} shadow-none hover:shadow-sm flex justify-start gap-2`}><MdWorkOutline className={`${isOnLink('/management/work') && 'text-teal-500'} h-5 w-5`} /> {!sidebarState && "Work"}</DivButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} left-1 relative`}>
                      <p>Work</p>
                    </TooltipContent>
                  </Tooltip>
                </AccordionContent>
                {/* --------------- accordion content ends ------------------- */}
              </AccordionItem>
            </Accordion>
            {/* ------------------------------ menu accordion ends ------------------------- */}


            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><RiUserUnfollowLine className='h-5 w-5' /> {!sidebarState && "Employee"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} left-1 relative`}>
                <p>Employee</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><RiUserUnfollowLine className='h-5 w-5' /> {!sidebarState && "Profile"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} left-1 relative`}>
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="navbtn" className={`w-full ${sidebarState && 'ps-3'} bg-white shadow-none hover:shadow-sm flex justify-start gap-2`}><FaNoteSticky className='h-5 w-5 scale-90 opacity-90' /> {!sidebarState && "Management"}</Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`${sidebarState ? 'flex' : 'hidden'} left-1 relative`}>
                <p>User</p>
              </TooltipContent>
            </Tooltip>


          </TooltipProvider>
        </nav>

        {/* ================ Bottom Part ==================== */}
        <div>
          {sidebarState && <Popover>
            <PopoverTrigger className='text-2xl relative left-2 top-3 text-blue-600 active:scale-90 transition-all duration-100'><MdInfo /></PopoverTrigger>
            <PopoverContent side="right" className="p-0 border-none shadow-none relative -top-5 left-3">
              <Card className="tracking-normal">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle className="font-bold tracking-normal mb-2">🚀 Let's do work</CardTitle>
                  <CardDescription className="">
                    This website is for keeping track of datas In-Out , managing notes to boost my  productivity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button onClick={() => { goToLink('/'); logout() }} size="sm" className="w-full gap-1 " variant="destructive">
                    <MdLogout className='h-4 w-4' /> Logout
                  </Button>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          }
          {!sidebarState && <Card className="tracking-normal shadow-none border-zinc-700 dark:bg-zinc-800 dark:shadow-lg dark:shadow-black">
            <CardHeader className="py-3 px-4 md:pt-0 md:p-4">
              <CardTitle className="font-bold tracking-normal mb-2">🚀 Let's do work</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                This website is for keeping track of datas In-Out , managing notes to boost my  productivity.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-3 px-4 pt-0 md:p-4 md:pt-0">
              <Button onClick={() => { goToLink('/'); logout() }} size="sm" className="w-full gap-1 active:scale-90 transition-all duration-100 dark:bg-red-600 dark:hover:bg-red-700" variant="destructive">
                <MdLogout className='h-4 w-4' /> Logout
              </Button>
            </CardContent>
          </Card>}
        </div>

      </div>








      {/* ============================ Immortal Popup for all Access over websites ======================= */}
      {isPortalOpen && <Dialog open={isPortalOpen} onOpenChange={setPortal} >
        <DialogContent className="p-0 ">
          <Command className="rounded-lg shadow-md px-1">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <BsFileEarmarkText className="mr-3 h-5 w-5" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <BsFileEarmarkText className="mr-3 h-5 w-5" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <BsFileEarmarkText className="mr-3 h-5 w-5" />
                  <span>Calculator</span>
                </CommandItem>
                <CommandItem>
                  <BsFileEarmarkText className="mr-3 h-5 w-5" />
                  <span>Dashboard</span>
                </CommandItem>
                <CommandItem>
                  <BsFileEarmarkText className="mr-3 h-5 w-5" />
                  <span>User</span>
                </CommandItem>
                <CommandItem>
                  <BsFileEarmarkText className="mr-3 h-5 w-5" />
                  <span>Employee</span>
                </CommandItem>
                <CommandItem>
                  <BsFileEarmarkText className="mr-3 h-5 w-5" />
                  <span>Notes</span>
                </CommandItem>
                <CommandItem>
                  <BsFileEarmarkText className="mr-3 h-5 w-5" />
                  <span>Management</span>
                </CommandItem>
              </CommandGroup>
              {/* --------------------- */}
              <CommandSeparator />
              {/* --------------------- */}
              <CommandGroup heading="Settings">
                <CommandItem>
                  <FaUser className="mr-3 h-5 w-5" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FaCreditCard className="mr-3 h-5 w-5" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <GearIcon className="mr-3 h-5 w-5" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              {/* --------------------- */}
              <CommandSeparator />
              {/* --------------------- */}
              <CommandGroup heading="Theme">
                <CommandItem className="p-0">
                  <div className='flex items-center w-full px-2 py-2.5' onClick={() => { setLightTheme(); setPortal(false) }}>
                    <MdOutlineLightMode className="mr-3 h-5 w-5" />
                    <span>Light</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </div>
                </CommandItem>
                <CommandItem className="p-0 dark:data-[selected=true]">
                  <div className='flex items-center w-full px-2 py-2.5' onClick={() => { setDarkTheme(); setPortal(false) }}>
                    <MdNightlightRound className="mr-3 h-5 w-5" />
                    <span>Dark</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </div>
                </CommandItem>
                <CommandItem>
                  <HiComputerDesktop className="mr-3 h-5 w-5" />
                  <span>System</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>

        </DialogContent>
      </Dialog>}

    </main>
  )
}

export default Sidebar