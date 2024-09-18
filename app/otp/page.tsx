// @ts-nocheck
"use client"
import React, { useState } from 'react';
import { OtpInput ,} from 'reactjs-otp-input';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { FaExclamationTriangle } from "react-icons/fa";




function countDigits(num) {
    // Convert number to string and remove non-digit characters
    return num.toString().replace(/\D/g, '').length;
  }


  
  function getemail(){
  
     const email=window.location.href.split('=')[1]
      console.log(email);
  
  return email;
  
  }





const Page = () => 
    




    {


 const router=useRouter();
const [err, seterr] = useState(null)
        const [otp, setOtp] = useState('');


        const handleChange = (otp) =>{ setOtp(otp);
if(countDigits(otp)===4){
    axios.put('/api/forgotpassword',{email:getemail(),otp}).then((res)=>{const{error,message}=res.data;if(error){seterr(error)} else{router.push(`http://localhost:3000/newpassword?token=${message}&email=${getemail()}`)}})
}

        } 

  return (
    <div>



<div className=' flex justify-center items-center w-screen h-screen bg-slate-200'>

<div className='w-96 min-h-72  bg-white rounded-lg'>

 <div className='p-5 text-3xl font-semibold'>OTP sent to ur email?</div>
 {err&&<div className='p-5 text-3xl font-semibold -mt-4 flex items-center gap-7 '><div className="order p-4 rounded-lg bg-red-200 w-full flex items-center gap-3  text-red-600"><div className='text-red-500 text-2xl '> <FaExclamationTriangle />  </div><div className='text-sm'>{err}</div> </div></div>}
 <div className='px-6 text-sm text-gray-600'>Enter your opt</div>
 


 <OtpInput value={otp}  inputStyle=" border m-3 rounded  text-4xl " isInputNum={true} isInputSecure={false} containerStyle={"w-full flex mt-5 justify-center"} numInputs={4} onChange={handleChange}  separator={<span>-</span>} />



 {/* <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      containerStyle={" size-40"}
      inputStyle={"size-50 bg-blue-300 p-6"}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} 
    
      />}
    /> */}
 
 
<button  className='p-2 mt-10   rounded-full ml-6  relative bottom-0 bg-black text-white'onClick={()=>{router.refresh();}} >Resend</button>
 
 </div></div>
      
    </div> 
  )
}

export default Page
