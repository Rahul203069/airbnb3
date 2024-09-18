
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'
import { useSession } from 'next-auth/react'
import { SkeletonCard } from './Listings'
import { useRouter } from 'next/navigation'
import { Snippet } from 'next/font/google'
import Reservation from './reservations'
type Props = {}

const Properties = (props: Props) => {
const {data:session}=useSession();
const router=useRouter();
const [properties, setproperties] = useState(null);
const [loader, setloader] = useState()

    useEffect(() => {

    setloader(true);
    axios.post('/api/getlistings',{email:session?.user?.email,name:session?.user?.name}).then((res)=>{setproperties(res.data);setloader(false)}).catch((e)=>{console.log(e); setloader(false)})
    
    }, [session])
    
  return (
    <>
 


{/* { (properties?.length===0)&& <>  <div  className=' min h-96 flex justify-center items-center  border'><div className='flex flex-col justify-center items-center gap-3'>
        <div className='text-2xl font-medium'>No exact matches</div>
        <div className='text-gray-500'>Try changing or removing some of your filters</div>
        <button className='text-sm p-3 border-2 border-black rounded-md ' onClick={()=>{router.push('/');}}>Remove all filters</button>
      </div>  </div></>} */}
{(properties?.length===0)&&<> <div className='w-full h-96 text-2xl text-neutral-800 font-medium flex justify-center items-center flex-col '>No properties  created yet<div className='text-base font-normal text-neutral-500'>Please make reservations first</div></div>
  </>}

<div className='flex flex-wrap '>

      {(properties===null)&&[1,1,1,1,1,1,1,1,1,11,1].map((item)=>{return(<SkeletonCard></SkeletonCard>)})}

{properties?.map((item:any)=>{ 



return(
<>

<Card setproperties={setproperties} items={item} title={item.title}  description={item.description} category={item.category} location={item.locationValue} roomcount={item.roomCount} guestcount={item.guestCount} bathroomcount={item.bathroomCount} price={item.price} imagesrc={item.imagesrc.split('=')[0]} id={item.id} delisting={true} cancelreservation={false} ></Card>

</>

)
    
})}

</div>


  </>  

  
  )
}

export default Properties