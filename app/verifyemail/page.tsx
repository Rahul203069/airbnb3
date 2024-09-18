
// @ts-nocheck
"use client"
import Router, { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import React from 'react'
import axios from 'axios';
import { TbLoader } from "react-icons/tb";
import { MdOutlineVerified } from "react-icons/md";
import { Button } from '@/app/ui/button';
type Props = {}

const Page = (props: Props) => {
    const router=useRouter();
    const [loader, setloader] = useState(true);
const [token, settoken] = useState("");
const [verified, setverified] = useState(false)
useEffect(() => {
  
    const toke=window.location.search.split("=")[1]
settoken(toke);
 
}, [])

useEffect(() => {
 axios.post('/api/verifyemail',{token}).then(res=>{if(res.data.message){setverified(true); setloader(false); console.log(res.data.message)}}).catch(e=>{console.log("something went wrong")})

}, [token])


  return (
    <div className=' flex justify-center items-center w-screen h-screen bg-slate-200'>

 <div className='w-96 min-h-72 pb-7 bg-white rounded-lg'>
    {!loader?<div className='p-5 text-3xl font-semibold flex items-center gap-2'> <MdOutlineVerified />{verified?`Email verifed`:`Email not verified`} </div>: <div className='p-5 text-3xl font-semibold flex items-center gap-2'> <TbLoader />Verifying... </div>}
  
  <div className='p-3 flex align-middle text-gray-500'> {verified?"Your email is successfully verified you can now login in to your account":'wait a moment your email is being verified'}</div>
    <div className='m-6'>
      <Button onClick={()=>{router.push('/login')} } disabled={!verified} > Login</Button>
     
      </div>
    </div></div>
  )
}

export default Page