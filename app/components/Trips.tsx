
// @ts-nocheck

import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Card from './Card'
import { format } from 'date-fns'
const Trips = () => {
    const [trips, settrips] = useState([])
    const [reservation, setreservation] = useState([])
    const {data:session}=useSession()

    useEffect(() => {
        
    axios.post('api/getreservation' ,{email:session?.user?.email}).then((res)=>{setreservation(res.data)})
      }, [session])

     
      

  return (
    <>

    {(reservation.length===0)&&<>
    
    
        <div className='w-full h-96 text-2xl text-neutral-800 font-medium flex justify-center items-center flex-col '>No Trips Yet<div className='text-base font-normal text-neutral-500'>Please make reservations first</div></div>
    

    
    </>
    
}
      {reservation.map((trip)=>{   
        

        
        return(<>

<Card category={`${format(trip.startdate,'PP')} - ${format(trip.enddate,'PP')}`} location={trip.listing.locationValue} price={trip.totalprice} imagesrc={trip.listing.imagesrc.split('=')[0]} id={trip.id} night={false} cancelreservation={true} onclick={()=>{}}></Card>
</>

      );})}
    </>
  )
}

export default Trips
