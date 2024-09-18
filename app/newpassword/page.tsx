"use client"

import { Suspense } from 'react';
import React from 'react'
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { error } from 'console';



const schema = z.object({


    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

const Page = () => {


  
const param = useSearchParams();


    const [err, seterr] = useState(null)

    const router=useRouter();
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
      });



      const onSubmit = (data:any) => {
        console.log("hello")
        axios.post('/api/newpassword',{email:param.get('email'),token:param.get('token'),password:data.password}).then((re)=>{console.log(re.data.message); if(re.data.error){seterr(re.data.error)} if(re.data.message){router.push('http://localhost:3000/login')}}).catch((e)=>{console.log(e)});
      };

      

    
  return (
    <div>


<div className=' flex justify-center items-center w-screen h-screen bg-slate-200'>

<div className='w-96 min-h-72 pb-7 bg-white rounded-lg'>

 <div className='p-5 text-3xl font-semibold'> Create new passwoard</div>
 {err&&<div className='p-5 text-3xl font-semibold -mt-4 flex items-center gap-7 '><div className="order p-4 rounded-lg bg-red-200 w-full flex items-center gap-3  text-red-600"><div className='text-red-500 text-2xl '> <FaExclamationTriangle />  </div><div className='text-sm'>{err}</div> </div></div>}
 <div className='px-6 text-sm text-gray-600'>Please rember your passsword this time</div>
 <form onSubmit={handleSubmit(onSubmit)}>
      <div>
    
 
      
 
      <div className='w-full px-5 mt-5'>


<input placeholder=' new passwoard ' {...register('password')} className=' mx-auto p-2 w-full rounded-full border flex items-center gap-2 shadow-sm cursor-pointer'></input>
</div>
 
        {
        // @ts-ignore
        errors.password && <div className='mx-6 text-xs text-red-500 '>{errors.password.message}</div>}
      </div>

    
      <div className='w-full px-5 mt-5'>

      <button type="submit" className='w-full hover:opacity-85 rounded-full p-2 transition-all bg-black text-white '>Change passsword</button>

      </div>
    </form>
 </div>
 
 
 
 </div>



    </div>
  )
}

export default Page