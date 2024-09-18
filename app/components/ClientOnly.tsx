"use client"
import React, { useEffect, useState } from 'react'

const ClientOnly = ({children}:{children:React.ReactNode}) => {
    const [hasmounted, sethasmounted] = useState(true);
    useEffect(() => {
      sethasmounted(false);
    
      
    }, [])
    if(!hasmounted){
        return null
    }
    
  return (
   <>
   {children}
   </>
  )
}

export default ClientOnly
