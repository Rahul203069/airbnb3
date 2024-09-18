
// @ts-nocheck
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { SkeletonCard } from './Listings'
import { useSession } from 'next-auth/react'
import Skeleton from 'react-loading-skeleton'

import Card from './Card'
import { format } from 'date-fns'

const Reservation = () => {
    const [trips, settrips] = useState([])
    const [reservation, setreservation] = useState(null)
    const {data:session}=useSession()
    

    useEffect(() => {
        
    axios.post('api/ownerreservations' ,{userid:session?.user?.email}).then((res)=>{setreservation(res.data)})
      }, [session])

     
      

  return (
    <>

{(reservation?.length===0)&&<> <div className='w-full h-96 text-2xl text-neutral-800 font-medium flex justify-center items-center flex-col '>No properties  created<div className='text-base font-normal text-neutral-500'>Please make reservations first</div></div>
  </>}

<div className='flex flex-wrap  mx-auto w-screen'>

      {(reservation===null)&&[1,1,1,1,1,1,1,1,1,11,1].map((item)=>{return(<SkeletonCard></SkeletonCard>)})}</div>

      {reservation?.map((trip:any)=>{   
        

        if(trip.reservations.length>0){
        return(

            trip.reservations.map((item:any)=>{

                return(


<Card setreservation={setreservation} category={`${format(item?.startdate,'PP')} - ${format(item?.enddate,'PP')}`} location={trip.locationValue} price={trip.reservations[0].totalprice} imagesrc={trip.imagesrc.split('=')[0]} id={item.id} night={false} cancelreservation={true} onclick={()=>{console.log('hogya delet')}}></Card>

                );
            })


      );
        }
    })}
    </>
  )
}

export default Reservation