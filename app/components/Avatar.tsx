

"useclient"

import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAccountCircleFill } from "react-icons/ri";
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu"

const Avatar:React.FC<any>= ({setopenlog,openlog,setlogin,setregister}) => {
    const{data:session}=useSession();
    const router=useRouter();
  return (
    <>




       <div className="  border p-2 flex items-center rounded-full text-gray-500 gap-1 cursor-pointer  hover:shadow duration-100" onClick={()=>{setopenlog(!openlog)}} ><div className="hidden md:block" ><RxHamburgerMenu></RxHamburgerMenu></div><div className=' hidden lg:block text-neutral-700'>{session?.user?.name}</div><RiAccountCircleFill size={30}></RiAccountCircleFill></div>
    </>
  )
}

export default Avatar
