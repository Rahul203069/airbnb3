
"use client"
import React from 'react'
import { IconType } from 'react-icons/lib'
import { FieldValues, useForm } from 'react-hook-form'

interface categoryinput {
    icon:IconType,
    name:string,
    selected?:boolean,
    onclick:(value:string)=>void
}

const Categoryinput:React.FC<categoryinput> = ({icon:Icon,name,selected,onclick}) => {





 
    return (
    <div className={ `p-5 border rounded-lg min-w-32   hover:border-black cursor-pointer transition-opacity   ${selected&&'border-black border-2 '}`} onClick={()=>onclick(name)}>
      <Icon size={30}></Icon>
      <div className='text-sm'>{name}</div>
    
    </div>

  )
}

export default Categoryinput
