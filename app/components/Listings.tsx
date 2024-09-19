//@ts-nocheck
"use client"
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react';
import axios from 'axios';
import { BsHeart } from "react-icons/bs";
import { IoHeart } from "react-icons/io5";
import countries from 'world-countries'
import Card from './Card';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';









import { Skeleton } from "@/app/ui/skeleton"
 
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 p-2  relative">
      <Skeleton className="h-52 w-52 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-4 w-52" />
      </div>
    </div>
  )
}















const Listings = ({listings, setlistings}) => {

const [like, setlike] = useState(false);
const searchParams = useSearchParams();
const params = new URLSearchParams(searchParams);



const pathname= usePathname();
console.log(pathname);    

    const route=useRouter();



useEffect( () => {


setlistings([]);

  axios.get('api/listings').then((res)=>{setlistings(res.data);}).catch((e)=>{console.log(e);})
// const loctaion =  countries.map((country)=>{if(country.cca2===)})
  }
, [searchParams])

console.log(listings);

  return (
    <>
    
   
   

   
    {/* { (listings.length===0)&& <>  <div  className=' min h-96 flex justify-center items-center  '><div className='flex flex-col justify-center items-center gap-3'>
        <div className='text-2xl font-medium'>No exact matches</div>
        <div className='text-gray-500'>Try changing or removing some of your filters</div>
        <button className='text-sm p-3 border-2 border-black rounded-md ' onClick={()=>{route.push('/');}}>Remove all filters</button>
      </div>  </div></>} */}



<div className='flex flex-wrap h-96 w-full md:w-3/5'>
{!(listings.length===0)?listings?.map((item:any)=>{ 
  
  console.log(item);
//@ts-ignore





 
  return(<><Card items={item}  distance={item.distance} category={item.category} location={item?.locationValue.split("?")[0]} price={item.price} imagesrc={item.imagesrc.split("=")[0]} id={item.id}></Card></>)}):[1,1,1,1,1,1,1,1,1,11,].map((item)=>{return(<SkeletonCard></SkeletonCard>)})}





{/* {listings?.map((item:any)=>{  */}



{/* // return(
// <>
// <Card category={item.category} location={item.locationValue} price={item.price} imagesrc={item.imagesrc.split("=")[0]} id={item.id}></Card>


// </>

// )
    
// })} */}




</div>
    </>
  )
}

export default Listings
