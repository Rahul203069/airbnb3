// @ts-nocheck
"use client"
import React, { useEffect } from 'react'
import { z } from 'zod';
import { signIn } from "@/auth"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';



import { useForm } from 'react-hook-form';
import { useSession,  signOut } from 'next-auth/react';
import { MdOutlineVerified } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import Loginbutton from '@/components/Loginbutton'
import { zodResolver } from '@hookform/resolvers/zod';
const schema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
import { FcGoogle } from "react-icons/fc";
import { PiHandsClappingDuotone } from "react-icons/pi";
const Page = () => {

  
  const { data: session } = useSession();
const [err, seterr] = useState("");
useEffect(() => {
  console.log(session?.user)

}, [session])

  const router=useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data:any) => {
    axios.post('/api/signup',{data}).then(res=>{if(res.data.message){seterr("verifuction link is send to your email")}}).catch(e=>{console.log(e)})
  };
  return (
 <>
 <div className=' flex justify-center items-center w-screen h-screen bg-slate-200'>

 <div className='w-96 min-h-72 pb-7 bg-white rounded-lg'>

  <div className='p-5 text-3xl font-semibold'>Signup</div>
  <div className='px-5 -mt-2 text-gray-400 flex items-center gap-2 '>hi welcome <PiHandsClappingDuotone /></div>
  {err&&<div className='p-5 text-3xl font-semibold flex items-center gap-7 '><div className="order p-4 rounded-lg bg-slate-200 w-full flex items-center gap-3  text-slate-600"><div className='text-red-500 text-2xl '> <MdOutlineVerified /> </div><div className='text-sm'>{"We have send verifiction link on your given email "}</div> </div></div>}
  <div className=' mx-5 p-2 mt-5 rounded-full border flex items-center gap-2 shadow-sm cursor-pointer' onClick={()=>{ SignIn();}} ><FcGoogle size={30} /> Login with Google</div>
  <div className="inline-flex items-center justify-center w-full">
    <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">or</span>
</div>

<form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <div className='w-full px-5 '>


<input placeholder=' Username ' {...register('username')} className=' mx-auto p-2 w-full rounded-full border flex items-center gap-2 shadow-sm cursor-pointer'></input>
</div>
 
        {errors.username && <div className='mx-6 text-xs text-red-500 '>{errors.username.message}</div>}
      <div className='w-full px-5 mt-5 '>


<input placeholder=' Email ' {...register('email')} className=' mx-auto p-2 w-full rounded-full border flex items-center gap-2 shadow-sm cursor-pointer'></input>
</div>
 
        {errors.email && <div className='mx-6 text-xs text-red-500 '>{errors.email.message}</div>}
      <div className='w-full px-5 mt-5'>


<input placeholder=' passwoard ' {...register('password')} className=' mx-auto p-2 w-full rounded-full border flex items-center gap-2 shadow-sm cursor-pointer'></input>
</div>
 
        {errors.password && <div className='mx-6 text-xs text-red-500 '>{errors.password.message}</div>}
      </div>

    
      <div className='w-full px-5 mt-5'>

      <button type="submit" className='w-full hover:opacity-85 rounded-full p-2 bg-black text-white '>Submit</button>
      </div>
    </form>



<div  className='text-gray-400 hover:underline cursor-pointer  flex justify-center mt-3  ' >Already have an account ?</div>
 </div>

 </div>
 </>
  )
}

export default Page
