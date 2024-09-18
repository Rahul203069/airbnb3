
// @ts-nocheck
"use client"
import React, { useEffect, useInsertionEffect } from 'react'


import Image from "next/image";
import { useState } from "react";
import { FaAirbnb } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAccountCircleFill } from "react-icons/ri";
import { SessionProvider, useSession } from "next-auth/react";
import Logpop from "../components/Logpop";
import Register from "../components/Register";
import ClientOnly from "../components/ClientOnly";
import Login from "../components/Login";
import Categories from "../components/Categories";
import { useRouter } from "next/navigation" ;
import Rentmodal from "../components/Rentmodal";
import Rent from "../components/Rentmodal";
import Listings from "../components/Listings";
import axios from "axios";

import Avatar from '../components/Avatar';
import Trips from '../components/Trips';
const Page = () => {

    const [openlog, setopenlog] = useState(false);
    const [login, setlogin] = useState(false);
    const [registerpop, setregisterpop] = useState(false)
    const [rent, setrent] = useState(false);
    const [userinfo, setuserinfo] = useState(null);
    const [listings, setlistings] = useState([])
    const router =useRouter();


    useEffect(() => {
      axios.post('/api/getlistings').then((res)=>{console.log(res.data)}).catch((e)=>console.log(e))
  
    }, [])
    

  return (
    <SessionProvider>
    <div className="">
  
  <div className=" border-b w-full p-3 px-4 bg-white flex justify-between fixed z-40  shadow-sm">
    
    <div className="flex items-center text-red-500 text-sm mr-1 md:text-xl font-medium  " onClick={()=>{router.push('/')}}><FaAirbnb size={35}></FaAirbnb> airbnb</div>
    <div className="flex border p-2 rounded-full text-sm font-medium text-gray-700 shadow-md items-center hover:shadow-lg w-2/3 md:w-auto justify-between ">
    <div className="border-r px-3 hidden items-center  cursor-pointer md:flex ">anywhere</div>
    <div className="border-r px-3 flex items-center  cursor-pointer">anywhere</div>
    <div className=" pl-3 text-gray-500 hidden items-center  cursor-pointer  md:flex md:w-auto ">Add Guest</div>
    <div className="text-rose-700"><IoSearchCircle size={35}/> </div>
    </div>
    <div className="flex items-center gap-4 relative ">
      <div className="h-full hidden items-center text-sm font-medium md:flex  hover:bg-neutral-200 rounded-full px-2 cursor-pointer transition-all " onClick={()=>{setrent(true); console.log("hello")}}> Airbnb your home</div>

      
  <Logpop setopenlog={setopenlog} setlogin={setlogin} userinfo={userinfo} setregister={setregisterpop}></Logpop>
    </div>
    </div>
  
    </div>
    
      <div className=' pt-24 p-3'>
    
    <div className='text-2xl font-semibold'>Trips</div>
     <div className='text-sm text-gray-500'>where have you been and where are you going</div>
      </div>

  
  
<div className='flex flex-wrap  w-full  '>

  <Trips></Trips>
  
</div>
  
    



  <div>

  </div>
   
     </SessionProvider>
    
  )
}

export default Page
