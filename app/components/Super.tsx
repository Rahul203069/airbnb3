//@ts-nocheck
'use client'
import React, { ReactElement, useEffect } from 'react'
import { TbMountain } from 'react-icons/tb'
import { RiAccountCircleFill } from 'react-icons/ri'
import { string } from 'zod'
import { addDays } from 'date-fns';
import countries from 'world-countries'
import Categories from './Categories'
import { categories } from './Categories'
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Icon } from 'leaflet'
import { FaCar } from "react-icons/fa6";


import { url } from 'inspector'
import{DateRange} from'react-date-range';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';
import { useParams } from 'next/navigation'
import axios from 'axios'

import { useSession } from 'next-auth/react'
import { compareSync } from 'bcrypt'

import { constants } from 'buffer'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaLocationDot } from "react-icons/fa6";
interface info{
    name :string
    guest:number
    room:number
    bathrooms:number
    description:string
    category:string
    title:string
    locations:string
    image:string
    price:number
    

}



const Super = () => {
 



 
  return (
   <>



<div className=" pt-24 p-10 w-[1200]">

<div className='w-[700px]'>

    <Skeleton className="h-6 w-40" />

</div>
<div className='w-[700px]'>

    <Skeleton className="h-6 w-40" />

</div>

  

    <div className="flex flex-col space-y-3 w-[1100px]">
      <Skeleton className="h-[500px] w-[250px]  rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  

  <div className="flex flex-col lg:flex-row gap-24">
    <div className="">
    
        <Skeleton className="h-6 w-48" />
      

      <div className="flex text-xs gap-2 mt-2 text-gray-500 pb-6 border-b w-[700px]">
     
          <Skeleton className="h-4 w-24" />
        
     
          <Skeleton className="h-4 w-24" />
        
      
          <Skeleton className="h-4 w-24" />
        
      </div>

    
        <Skeleton className="h-6 w-96" />
      

        <Skeleton className="h-6 w-[700px]" />

      <div className="w-full mt-3 h-full">
     
          <Skeleton className="h-[300px] w-full" />

      </div>
    </div>

    <div className="w-96 h-auto m-6 lg:mt-12 p-6 border rounded-3xl shadow-xl">
     
        <Skeleton className="h-8 w-24" />

      <div className="w-full flex justify-center border-b border-black">
        <Skeleton className="h-[300px] w-full" />
      </div>

      <button className="bg-gradient-to-r from-pink-500 w-full p-2 rounded-lg mt-2 mb-2 to-red-500 text-white">
        Reserve
      </button>

  
        <Skeleton className="h-6 w-24" />

    </div>
  </div>
</div>

   </>
  )
}

export default Super
