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


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export default function Header() {

  const [urlPath, setUrlPath] = useState([]);
  const router = useRouter();

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

      {/* left part header */}
      <div className="ms-5">
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


