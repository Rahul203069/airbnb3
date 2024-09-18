"use client"
import React from 'react'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import { FaGithub } from "react-icons/fa";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-hot-toast';
import { PassThrough } from 'stream';
import { signIn } from 'next-auth/react';
import { sign } from 'crypto';
import { Session } from 'inspector';
import { connect } from 'http2';
import { useRouter } from 'next/navigation';

const Login= ({setregister}:any) => {
 const Signupschema= z.object({
    
    email:z.string().email(),
    password:z.string().min(4)

 })
 const router=useRouter();
 const [dropup, setdropup] = useState(false)
 const [dropdown, setdropdown] = useState(false)
 const [loading, setloading] = useState(false)
 
 type formschema={
    
    email:string,
    password:string
 }
    const onsubmit=async(data:formschema)=>{
         
        setloading(true);
       
      signIn("credentials", {


         password: data.password,
         email: data.email,
         redirect: false,
     }).then((res)=>{ if(res?.ok){ setloading(false); setdropdown(true);   setregister(false);  toast.success("Succesfully logged in");} else {setloading(false); toast.error("Wrong credentials")} }).catch((e)=>{})

     
    }
   const{data:session}=useSession();
 const {register,formState:{errors},handleSubmit}=useForm<formschema>({resolver:zodResolver(Signupschema)});
    return (
    < >
    
     <div className='w-screen absolute z-10 bg-black h-screen opacity-25 flex justify-center items-center cursor-pointer'onClick={()=>{setdropdown(true); setTimeout(() => {
  setregister(false);
}, 150);}}>
    </div>

<div className=' flex justify-center   w-full h-full ' >
      <div className={`w-full h-full md:h-auto md:w-2/4 bg-white absolute z-20  md:mt-20   rounded-lg px-4 pb-5 duration-200  ${ dropdown&& ` opacity-0`}`}>
        <div className='flex justify-center p-3 border-b'>Register</div>
        <div className='p-2 px-4 text-lg font-semibold'> Welcome Back</div>
        <div className='mt-2 px-4 text-sm text-gray-500'>Login to your account</div>
        <form   onSubmit={handleSubmit(onsubmit)}>
            
            
                <input className=' border w-full mt-4 rounded-lg p-2' placeholder='Email' {...register("email")}></input>
                {errors.email&&<span className='text-red-500 text-xs'>{errors.email?.message} </span>}
        
                <input className=' border w-full mt-4 rounded-lg p-2' type='password' placeholder='password ' {...register("password")}></input>
                {errors.email&&<span className='text-red-500 text-xs'>{errors.password?.message} </span>}
         <div className='flex justify-center w-full '>     
    <button type='submit' className='bg-red-600 m-3 p-3 w-full flex justify-center rounded-lg text-lg mt-4 text-white'>{loading?<div>Verifying...</div>:<div>Continue</div>}</button></div>
            </form>
        <div className=' flex justify-center items-center gap-4 mt-4 border-2 border-gray-400 p-3 rounded-lg shadow cursor-pointer' onClick={()=>{signIn('google').then(()=>{toast.success('Successfully loged in')})}}>
<div><FcGoogle size={40}></FcGoogle></div>
<div >Continue with Google</div>
        </div>
        <div className=' flex justify-center items-center gap-4 mt-4 border-gray-400 border-2 p-3 rounded-lg shadow mb-6 cursor-pointer '>
<div><FaGithub size={40}></FaGithub></div>
<div >Continue with Github</div>
        </div>
<div className='flex justify-center text-gray-500 hover:underline cursor-pointer'>Already have an account? Log in</div>
      </div>
    </div>
    
    </>
  )
}

export default Login
