// @ts-nocheck
"use client"
import React from 'react'
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
const schema = z.object({

  email: z.string().email("Invalid email address"),

});
import { FcGoogle } from "react-icons/fc";
import { PiHandsClappingDuotone } from "react-icons/pi";
const Page = () => {




    const [err, seterr] = useState(null)

    const router=useRouter();
    
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
      });
      const onSubmit = (data:any) => {
      
        axios.post('/api/forgotpassword',{data}).then((res)=>{
            
            console.log("hello");
            const{error,message} =res.data; 
            
            if(error){
        seterr(error);

        console.log(res.data);
    } 
    if(message){
console.log('helo');

        router.push(`http://localhost:3000/otp?email=${data.email}`)

    }


    
    
    
    
    
    
    }).catch(e=>{console.log(e)})
      };
    
    



  return (
    <div>
       <div className=' flex justify-center items-center w-screen h-screen bg-slate-200'>

<div className='w-96 min-h-72 pb-7 bg-white rounded-lg'>

 <div className='p-5 text-3xl font-semibold'>Forgot passwoard hello?</div>
 {err&&<div className='p-5 text-3xl font-semibold -mt-4 flex items-center gap-7 '><div className="order p-4 rounded-lg bg-red-200 w-full flex items-center gap-3  text-red-600"><div className='text-red-500 text-2xl '> <FaExclamationTriangle />  </div><div className='text-sm'>{err}</div> </div></div>}
 <div className='px-6 text-sm text-gray-600'>Enter your email we will send a  digit code</div>
 <form onSubmit={handleSubmit(onSubmit)}>
      <div>
    
 
        {errors.username && <div className='mx-6 text-xs text-red-500 '>{errors.username.message}</div>}
      <div className='w-full px-5 mt-5 '>


<input placeholder=' Email ' {...register('email')} className=' mx-auto p-2 w-full rounded-full border flex items-center gap-2 shadow-sm cursor-pointer'></input>
</div>
 
        {errors.email && <div className='mx-6 text-xs text-red-500 '>{errors.email.message}</div>}
      
 
      
      </div>

    
      <div className='w-full px-5 mt-5'>

      <button type="submit" className='w-full hover:opacity-85 rounded-full p-2 transition-all bg-black text-white '>Send</button>

      </div>
    </form>

 
 
 </div></div>
 

    </div>
  )
}

export default Page
