"use client"
import React, { useState } from 'react'
import { FaUmbrellaBeach } from "react-icons/fa6";
import { PiWindmillFill } from "react-icons/pi";
import { HiHomeModern } from "react-icons/hi2";
import { useSearchParams } from 'next/navigation';
import { GiIsland } from "react-icons/gi";
import {TbMountain, TbPool} from 'react-icons/tb'
import { BsSnow } from "react-icons/bs";
import { GiBoatFishing } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { GiForestCamp } from "react-icons/gi";
import { RiCactusFill } from "react-icons/ri";
import { FaSkiing } from "react-icons/fa";
import Categorybox from './Categorybox';
import { useSession } from 'next-auth/react';
import { Switch } from "@/app/ui/switch"

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const categories=[
    {name:"Beach",icon:FaUmbrellaBeach,discription:"This property is close to beach"},
    {name:"Windmills",icon:PiWindmillFill,discription:"This property has windmills"},
    {name:"Modern",icon:HiHomeModern,discription:"This property is modern"},
    {name:"Countryside",icon:TbMountain,discription:"This property is Mountins"},
    {name:"Pools",icon:TbPool,discription:"This property is Mountins"},
    {name:"Islands",icon:GiIsland,discription:"This property is on Island"},
    {name:"Lakes",icon:GiBoatFishing,discription:"This property is close to lake"},
    {name:"Camping",icon:GiForestCamp,discription:"This property has camping activites"},
    {name:"Artic",icon:BsSnow,discription:"This property has snow"},
    {name:"Desert",icon:RiCactusFill,discription:"This property has snow"},
    {name:"Luxury",icon:IoDiamond,discription:"This property is luxurious"},
    {name:"Skiing",icon:FaSkiing,discription:"This property is luxurious"},
    

    
    
    
]

const  Categories = () => {

 
  
  const pathname=usePathname();
  
  const searchParams = useSearchParams();
  const param = new URLSearchParams(searchParams);
  const category=param.get("category");
  const router=useRouter();

  return (
    <div className='border pt-3 px-7   flex justify-between overflow-x-scroll scrollbar-hide gap-5'>






    
   {categories.map((items)=>{
     return( 
       
       <Categorybox description={items.discription} name={items.name} icon={items.icon} selected={category===items.name}></Categorybox>
      )
      
    })}
   
   
   <div className='flex justify-center items-center text-slate-600 gap-3'> Sort by current location<Switch    onCheckedChange={(value)=>{if(value){     
    

    
   router.push('/')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
   
    
          param.set('geo',`${latitude},${longitude}`);
          param.set('distance', "1" ); 
     
          router.push(`${pathname}?${param.toString()}`);
          
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } 
    
    
    
    

    
    
    }else{   
    

    
    param.delete('distance');}  router.push(`${pathname}?${param.toString()}`
  

  
  )  

  router.push('/');

} }
    
    
    ></Switch></div>

    </div>
  )
}

export default Categories
