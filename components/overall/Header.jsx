import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { BsFillMenuButtonWideFill, BsMenuButtonWideFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Sidebar from "./Sidebar";


export default function Header() {

  const [urlPath, setUrlPath] = useState([]);
  const router = useRouter();
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const closeMobileDrawer = () => {
    setMobileDrawer(false);
  }

  useEffect(() => {

    setUrlPath(
      router.pathname.split('/')
    )
    console.log(urlPath);
    console.log(urlPath.at(urlPath.length - 1))

  }, [router.pathname])

  const isOnLink = (webLink) => {
    return router.pathname = webLink;
  }

  const goToLink = (targetLink) => {
    router.push(`${targetLink}`, undefined, { shallow: true });
  }

  return (<>
    <div className="h-full flex justify-between items-end px-4 pb-2">

      <div className="block md:hidden">
        <Drawer open={mobileDrawer} onOpenChange={setMobileDrawer} direction="left" className="!shadow-none dark:!shadow-sm">
          <DrawerTrigger asChild className='scale-150 active:scale-110 transition-all duration-100 ms-1 flex md:hidden'>
            <BsMenuButtonWideFill />
          </DrawerTrigger>
          <DrawerContent className="inset-y-0 max-w-screen-sm m-0 rounded-none rounded-e-3xl w-[85vw] border-0 border-e-2 dark:!border-zinc-400">
            <DrawerTitle className="hidden"></DrawerTitle>
            <DrawerDescription className="hidden"></DrawerDescription>
            <div
              className="absolute top-72 -right-4 h-[100px] w-2 rounded-full bg-zinc-400" />
            <Sidebar closeMobileDrawer={closeMobileDrawer} />
          </DrawerContent>
        </Drawer>
      </div>

      {/* left part header */}
      <div className="md:ms-5">
        <Breadcrumb>
          <BreadcrumbList>

            {urlPath.length > 2 && urlPath.map((path, index) => (
              <div key={index} className="flex items-center"> {/* Add a unique key here */}
                <BreadcrumbItem key={`breadcrumb-${index}`}>
                  {path === '' && index === 0 ?
                    <BreadcrumbLink onClick={() => goToLink('/')} className="cursor-pointer font-bold underline underline-offset-1">Home </BreadcrumbLink>
                    :
                    <BreadcrumbLink
                      href={path !== 'management' && urlPath.at(urlPath.length - 1) !== path ? path : undefined}
                      className={`${path !== 'management' && urlPath.at(urlPath.length - 1) !== path ? 'cursor-pointer' : ''}`}
                    >
                      {path}
                    </BreadcrumbLink>}
                </BreadcrumbItem>
                {urlPath.at(urlPath.length - 1) !== path && <BreadcrumbSeparator key={`separator-${index}`} />}
              </div>
            ))}

          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* right part header */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer relative top-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://sahiljha.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fapple-touch-icon.78b3e51f.png&w=64&q=75" className="select-none" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </>)
}


