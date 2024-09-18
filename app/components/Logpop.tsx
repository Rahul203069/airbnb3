
"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { RiAccountCircleFill } from "react-icons/ri";
import { signOut, useSession } from 'next-auth/react';

import { RxHamburgerMenu } from 'react-icons/rx';




import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu"
import Avatar from './Avatar';


const Logpop = ({setregister,setopenlog,setlogin,userinfo}:any) => {
  const{data:session}=useSession();
  const router=useRouter();
  
  return (
    




<DropdownMenu>
  <DropdownMenuTrigger><Avatar></Avatar></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />

    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{router.push('/dashboard')}}>My Dashboard </div></DropdownMenuItem>
    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{router.push('/trips')}}>My trips </div></DropdownMenuItem>
    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{signOut();}}>My favourites </div></DropdownMenuItem>
    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{router.push('/reservations');}}>My resvervations </div></DropdownMenuItem>
    <DropdownMenuItem><div className="cursor-pointer hover:bg-neutral-100 p-2 border-b " onClick={()=>{router.push('/myproperties');}}>My Properties </div></DropdownMenuItem>
    <DropdownMenuSeparator />
{!(session)? <><DropdownMenuLabel> <div className="cursor-pointer hover:bg-neutral-100 p-2 " onClick={()=>{ router.push('/login')}}>Login</div></DropdownMenuLabel><DropdownMenuLabel> <div className="cursor-pointer hover:bg-neutral-100 p-2 w-24 " onClick={()=>{router.push('/signup')}}>SiginUp</div> </DropdownMenuLabel>  </> : <> <DropdownMenuLabel><div className="cursor-pointer hover:bg-neutral-100 p-2  " onClick={()=>{signOut();}}>Logout</div></DropdownMenuLabel></>}

  </DropdownMenuContent>
</DropdownMenu>

 



 
 



    
  )
}

export default Logpop
