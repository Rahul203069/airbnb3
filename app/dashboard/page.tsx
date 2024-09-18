//@ts-nocheck
"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import {  AvatarFallback, AvatarImage } from "@/app/ui/avatar"
import { Component } from '../components/ReservationChart';
import { FaAirbnb } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { format } from 'date-fns';
import { Button } from "@/app/ui/button"
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/card"
import { Avatar } from '@radix-ui/react-avatar';
import { signIn, useSession } from 'next-auth/react';
import Question from '../components/Question';
import Answer from '../components/Answer';
import Edituser from '../components/Edituser';
import ReservationTable from '../components/ReservationTable';
import Logpop from '../components/Logpop';


const Page = () => {
  const [reservation, setreservation] = useState([])


  const{data:session}=useSession();


  useEffect(() => {
  
        console.log(session?.user)
    axios.post('api/dashboard' ,{userid:"rs3296472t@gmail.com"}).then((res)=>{setreservation(res.data)})
      }, [])




  return (
    <>
    <div className="">
  
  <div className=" border-b w-full p-3 px-4 bg-white flex justify-between fixed z-40  shadow-sm">

    
    <div className="flex items-center text-red-500 text-sm mr-1 md:text-xl font-medium  " ><FaAirbnb size={35}></FaAirbnb> airbnb</div>
    <div className="flex border p-2 rounded-full text-sm font-medium text-gray-700 shadow-md items-center hover:shadow-lg w-2/3 md:w-auto justify-between ">
    <div className="border-r px-3 hidden items-center  cursor-pointer md:flex ">anywhere</div>
    <div className="border-r px-3 flex items-center  cursor-pointer">anywhere</div>
    <div className=" pl-3 text-gray-500 hidden items-center  cursor-pointer  md:flex md:w-auto ">Add Guest</div>
    <div className="text-rose-700"><IoSearchCircle size={35}/> </div>
    </div>
    <div className="flex items-center gap-4 relative ">
      <div className="h-full hidden items-center text-sm font-medium md:flex  hover:bg-neutral-200 rounded-full px-2 cursor-pointer transition-all " onClick={()=>{ console.log("hello")}}> Airbnb your home</div>
<Logpop></Logpop>

    </div>
    </div>
  
    </div >
    
      <div className=' pt-24 p-3 flex-none md:flex  w-screen md:w-auto justify-between'>
    <div className='mb-4 md:mb-0 w-screen md:auto'>
    <div className='text-2xl font-semibold'>Dashboard</div>
     <div className='text-sm text-gray-500 '>your buissness anylitics</div></div>
      
    <Edituser></Edituser>
      
      </div>

  <div className=' md:flex w-screen  justify-between '>

<div className=' w-screen md:w-[900px]'>
  
<div className='flex w-[620px] md:w-[900px]' >

      <Card className='md:w-full w-64   h-40 m-5'>
  <CardHeader>
    <CardTitle>Total Revenue</CardTitle>

  </CardHeader>
  <CardContent className=''>
<div className='text-3xl font-bold'>${reservation.reduce((total,item)=>{return total+(Number(item.totalprice))},0)}</div>
  </CardContent>
 
</Card>
      <Card className=' md:w-full  w-64  h-40 m-5'>
  <CardHeader>
    <CardTitle>Total Reservations</CardTitle>

  </CardHeader>
  <CardContent className=''>
<div className='text-3xl font-bold'>{reservation.length}</div>
  </CardContent>
 
</Card>

</div>

  <div className='md:p-4  md:m-7  mx-4 md:w-[900px] w-[620px]   bg-white border rounded-xl shadow '>
<Component reservations={reservation} ></Component>


  </div>
  <div className='md:px-0  '>
    
  <div className='p-4 md:w-[900px] w-[620px]   md:m-7 mx-4 mt-4  border rounded-lg shadow '>

<ReservationTable reservation={reservation}></ReservationTable>

  </div>
  </div>

</div>

<div>

  
      <Card className='md:w-[650px] w-[620px] mx-4 h-96 md:m-5 mt-4 md:mr-10 '>
  <CardHeader>
    <CardTitle>Recent Reservations</CardTitle>

  </CardHeader>
  <CardContent className=''>



    {reservation.map((item)=>{
      return(



<div className=''>



<div className='flex gap-4 items-center '>
  <div className='  h-20  w-32  flex items-center justify-center'>

<img className='rounded-full w-16 h-16' src={item.user.image}></img>
  </div>
<div>


<div className='text-lg font-medium'> {item.user.name}</div>
<div className='text-gray-600'> {item.user.email}</div>
</div>
<div className='flex-col '>

<div className='text-2xl font-bold flex justify-end relative right-0 w-44' >+${item.totalprice}</div>

<div className='text-sm text-gray-600 mt-2 w-full float-right flex justify-end'>{format(new Date(item.createdat), 'yyyy-MM-dd')} </div>
</div>
</div>
  
</div>




      )
    })}


  </CardContent>
 
</Card>
      


   <Answer></Answer>
</div>





  
  </div>
    



  <div>

  </div>
   
     </>
  )
}

export default Page