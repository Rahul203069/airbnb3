// @ts-nocheck
"use client"
import React, { useEffect } from 'react'
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SignIn from '@/components/Loginbutton';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaExclamationTriangle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaAirbnb } from "react-icons/fa6";
const schema = z.object({

  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
import { FcGoogle } from "react-icons/fc";
import { PiHandsClappingDuotone } from "react-icons/pi";
const Page = () => {
const {data:session}=useSession();
useEffect(() => {
  if(session?.user){


    router.push('/');
  }
}, [session])


const [err, seterr] = useState(null)
const [loading, setloading] = useState<boolean>();

const router=useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data:any) => {
    signIn("credentials", {


      password: data.password,
      email: data.email,
      redirect: false,
  }).then((res)=>{ if(res?.ok){ setloading(false); 

    const{data:session}=useSession();
    console.log(session);



   } else {setloading(false);} }).catch((e)=>{})
  
  };





  return (
 <>
 <div className=' flex justify-center items-center w-screen h-screen bg-slate-200'>

 <div className='w-96 min-h-72 pb-7 bg-white rounded-lg'>
  <div className='flex justify-between px-4'>
<div></div>

  <div className='text-3xl mt-2 flex items-center gap-1 text-red-600'><FaAirbnb></FaAirbnb>airbnb </div>
  </div>
{err?<div className='p-5 text-3xl font-semibold flex items-center gap-7 '>Login<div className="order p-4 rounded-lg bg-red-200 w-full flex items-center gap-3  text-red-600"><div className='text-red-500 text-2xl '> <FaExclamationTriangle />  </div><div className='text-sm'>{err}</div> </div></div>: <div className='p-5 text-3xl font-semibold flex items-center gap-7 '>Login</div>}
 
  <div className='px-5 -mt-2 text-gray-400 flex items-center gap-2 '>hi welcome back <PiHandsClappingDuotone /></div>
  <div className=' mx-5 p-2 mt-5 rounded-full border flex items-center gap-2 shadow-sm cursor-pointer' onClick={()=>{signIn('google')}} ><FcGoogle size={30} /> Login with Google</div>
  <div className="inline-flex items-center justify-center w-full">
    <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">or</span>
</div>

<form onSubmit={handleSubmit(onSubmit)}>
      <div>
    
 
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

      <button type="submit" className='w-full hover:opacity-85 rounded-full p-2 transition-all bg-black text-white '>Login</button>
<div className='mb-3 mt-3 text-gray-600 shadow-sm hover:shadow-md transition-all cursor-pointer p-2 border rounded-full justify-center flex' onClick={()=>{router.push('http://localhost:3000/forgt')}}>Forgot passwoard?</div>
      </div>
    </form>


<div  className='text-gray-400 hover:underline cursor-pointer  flex justify-center mt-3 transition-all ' onClick={()=>{router.push('/signup')}}>Already have an account ?</div>
 </div>

 </div>
 </>
  )
}

export default Page
