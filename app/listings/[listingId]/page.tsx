
// @ts-nocheck
"use client"
import React from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import Image from "next/image";
import { useState } from "react";
import { useCallback } from 'react';
import { FaAirbnb } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAccountCircleFill } from "react-icons/ri";
import { SessionProvider } from "next-auth/react";
import { IoHeartOutline } from "react-icons/io5";
import Logpop from '@/app/components/Logpop';
import { AiFillHeart } from "react-icons/ai"
import Register from '@/app/components/Register';
import Super from '@/app/components/Super'
import Login from '@/app/components/Login';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import {TbMountain, TbPool} from 'react-icons/tb'
import Map from '@/app/components/Map';
import axios from 'axios';
import { IoIosHeart } from "react-icons/io";
import Rent from '@/app/components/Rentmodal';
import { AiOutlineHeart } from "react-icons/ai";
import{DateRange} from'react-date-range';
import dynamic from 'next/dynamic';
import Iteminfo from '@/app/components/Iteminfo';
import { DateRangePicker } from 'react-date-range';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';

import toast from 'react-hot-toast';
const Page = () => {




  
 const Iteminfo = dynamic(() => import('@/app/components/Iteminfo'), { ssr: false });

  useEffect(() => {


    
    
    
    

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    localStorage.setItem('longitude', longitude);
    localStorage.setItem('latitude', latitude);
    
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
            case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.");
            break;
          }
        }

      }, [])
        















    const [openlog, setopenlog] = useState(false);
    const [login, setlogin] = useState(false);
    const [user, setuser] = useState(null)
    const [registerpop, setregisterpop] = useState(false)
    const [rent, setrent] = useState(false);
    const [userinfo, setuserinfo] = useState(null);
    const [listings, setlistings] = useState([])
    
    const router =useRouter();
  const params=useParams();
const id=params.listingId ;
let reservations:Date[]=[]

const [item, setitem] = useState<any[]|null>(null)
useEffect(() => {

    axios.post('/api/view',{id}).then((re)=>{setitem(re.data.item); setuser(re.data.users);   }).catch((e)=>{ throw e})


}, [])

// const initialDateRange={
//   starDate: new Date(),
//   endDate:new Date(),
//   key:'selection'
// }

// let dates:Date[]=[]

// reservations.forEach((reservation)=>{
//   const range=eachDayOfInterval({
//     start:new Date(reservation.startDate),
//     end:new Date(reservation.endDate)
//   });
//   dates=[...dates,...range];
//    return dates
// })

// const[loading,setloading]=useState(false);
// const[totalPrice,settotalprice]=useState("")
// const[dateRange,setdaterange]=useState(initialDateRange)

//  const onCreatereservation=useCallback(()=>{
// axios.post('/api/reservation',{totalPrice,startDate:dateRange.starDate,endDate:dateRange.endDate,listingId:listing?.id}).then(()=>{toast.success('Listing reserved');setdaterange(initialDateRange); router.refresh();}).catch((e)=>{toast.error('something went wrong.');}).finally(()=>{setloading(false);})

//  },[])
//  useEffect(() => {
//    if(dateRange.starDate&&dateRange.endDate){
//     const dayCount=differenceInCalendarDays (dateRange.endDate,dateRange.starDate);
//    }
 
//    if(dayCount&&listing.price){
//     settotalprice(dayCount=listing.price);
//    }
//    else{settotalprice(listing.price);}
  
//  }, [dateRange,listing.price])
const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
]);

 
 let value
 
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }


  return (
      
    <SessionProvider>
  
     
<div className="">
  {registerpop&&<Register setregister={setregisterpop} setuserinfo={setuserinfo}></Register>}
  
{login&&<Login setregister={setlogin}></Login>}
<div className=" border-b w-full p-3 px-4 bg-white flex justify-between fixed z-40  shadow-sm">
  
  <div className="flex items-center text-red-500 text-sm mr-1 md:text-xl font-medium  " onClick={()=>{router.push('/')}}><FaAirbnb size={35}></FaAirbnb> airbnb</div>
  <div className="flex border p-2 rounded-full text-sm font-medium text-gray-700 shadow-md items-center hover:shadow-lg w-2/3 md:w-auto justify-between ">
  <div className="border-r px-3 hidden items-center  cursor-pointer md:flex ">anywhere</div>
  <div className="border-r px-3 flex items-center  cursor-pointer">anywhere</div>
  <div className=" pl-3 text-gray-500 hidden items-center  cursor-pointer  md:flex md:w-auto ">Add Guest</div>
  <div className="text-rose-700"><IoSearchCircle size={35}/> </div>
  </div>
  <div className="flex items-center gap-4 relative ">
    <div className="h-full hidden items-center text-sm font-medium md:flex  hover:bg-neutral-200 rounded-full px-2 cursor-pointer transition-all " onClick={()=>{setrent(true); console.log("hello")}}> Airbnb your home</div>
    <Logpop setopenlog={setopenlog} setlogin={setlogin} userinfo={userinfo} setregister={setregisterpop}></Logpop>
    
 
  </div>
  </div>

  </div>





  
 {item?<Iteminfo  item={item} reviews={item.reviews} id={item.id} user={user} description={item.descriptiom} image={item.imagesrc} guest={item.guestcount} room={item.roomcount} bathrooms={item.bathroomcount} locations={item.locationValue} title={item.title} category={item.category} price={item.price}   ></Iteminfo>:  <Super></Super>}

{/* {reseravtions  } */}
<div>
{/* <DateRange
  onChange={(item)=> {setState([item.selection]); console.log(item)}}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  
  ranges={state}
  direction="horizontal"
/> */}
</div>
 
   </SessionProvider>
  )
}

export default Page
