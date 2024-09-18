import React from 'react'
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
interface props{
    value:number;
    subtitle:string;
    title:string;
    Id:string;
    setCustomvalue:(a:string,b:number)=>void
}

const Counter:React.FC<props> = ({value,title, Id,subtitle,setCustomvalue}:props) => {
console.log(value,Id  );

  return (

       <div className='h-auto flex justify-between items-center border-b py-4'>
        <div>
        <div className='px-4 mt-7'>{title}</div>
        <div className='px-4 text-gray-500  text-sm '>{subtitle} </div></div>
        <div className='flex items-center p-1 gap-2 text-2xl text-gray-500'>
            <div  className='cursor-pointer text-3xl' onClick={()=>{  
              // @ts-ignore
              if(parseInt(value)===1){return} setCustomvalue(Id,parseInt(value)-1)}}><CiCircleMinus></CiCircleMinus></div>
            <div className='w-4'>{value}</div>
            <div  className='cursor-pointer text-3xl' onClick={()=>{ 
              // @ts-ignore
              if(parseInt(value)===6){return} setCustomvalue(Id,parseInt(value)+1)}}> <CiCirclePlus></CiCirclePlus> </div>
            
        </div>
       </div>

  )
}

export default Counter
