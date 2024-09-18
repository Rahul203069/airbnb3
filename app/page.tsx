"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/card"
import { Slider } from "@/app/ui/slider"
import { Switch } from "./ui/switch"

import Maps from '@/app/components/Maps'
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { FaAirbnb, FaMap } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAccountCircleFill } from "react-icons/ri";
import { SessionProvider, useSession } from "next-auth/react";
import Logpop from "./components/Logpop";
import Register from "./components/Register";
import ClientOnly from "./components/ClientOnly";
import Login from "./components/Login";
import Categories from "./components/Categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Rentmodal from "./components/Rentmodal";
import Rent from "./components/Rentmodal";
import dynamic from "next/dynamic";
import Listings from "./components/Listings";
import { TbPhotoPlus } from "react-icons/tb";
import axios from "axios";

import { CldUploadWidget } from "next-cloudinary";
import Avatar from "./components/Avatar";
import Map from "./components/Map";
import Filter from "./components/Filter";
import { BiMap } from "react-icons/bi";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FaSearchLocation } from "react-icons/fa"
import { MdAdd } from "react-icons/md"
export default function Home() {
  const [openlog, setopenlog] = useState(false);
  const [login, setlogin] = useState(false);
  const [registerpop, setregisterpop] = useState(false)
  const [rent, setrent] = useState(false);
  const [userinfo, setuserinfo] = useState(null);
  const [listings, setlistings] = useState([])
  const Maps = dynamic(() => import('@/app/components/Maps'), { ssr: false });
const{data:session}=useSession();

  const pathname=usePathname();
  
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const router=useRouter();
  function applyfilters(){
// @ts-ignore
    params.set('geo',geo?.toString());
   
    router.push(`${pathname}?${params.toString()}`);
    
    
  };


  
  

  return (
    
    
    <SessionProvider>
  
 
<div className="fixed bottom-0 bg-red-600 right-0 text-white flex items-center rounded-full p-2 z-50 m-2"  onClick={()=>{ if(!session){router.push('/login')}if(session){setrent(true)}; console.log("hello")}}>Create listing<MdAdd size={20}></MdAdd></div>

<div className=" ">
  <div className="w-full h-full relative flex justify-center items-center">
<div className={`transition-all opacity-0  w-full h-full absolute z-40 ${registerpop&&'opacity-100'}`}>

  </div>
  </div>

       <div className="w-full h-full relative flex justify-center items-center">
<div className={`transition-all opacity-0  w-full h-full absolute z-40 ${rent&&'opacity-100'}`}>
  {(rent&&session)&&<Rent login={login} listings={listings} register={rent} setlistings={setlistings} setregister={setrent}></Rent>}
 
  </div></div>

  <div className="w-full h-full relative flex justify-center items-center">
<div className={`transition-all opacity-0  w-full h-full absolute z-40 ${login&&'opacity-100'}`}>

</div></div>
<div className=" border-b p-3 px-4  flex justify-between fixed z-30 bg-white w-screen">
  
  <div className="flex items-center text-red-500 text-sm mr-1 md:text-xl font-medium  " onClick={()=>{router.push('/')}}><FaAirbnb size={35}></FaAirbnb> airbnb</div>
  



  <Filter></Filter>
  <div className='flex justify-center items-center text-xs md:text-lg text-slate-600 gap-3 md:hidden '><div className="text-gray-500"> <FaSearchLocation size={20}></FaSearchLocation></div> <Switch    onCheckedChange={(value)=>{if(value){     
    

    
    router.push('/')
 
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         (position) => {
           const latitude = position.coords.latitude;
           const longitude = position.coords.longitude;
    
     
           params.set('geo',`${latitude},${longitude}`);
           params.set('distance', "1" ); 
      
           router.push(`${pathname}?${params.toString()}`);
           
         },
         (error) => {
           console.error('Error getting location:', error);
         }
       );
     } 
     
     
     
     
 
     
     
     }else{   
     
 
     
     params.delete('distance');}  router.push(`${pathname}?${params.toString()}`
   
 
   
   )  
 
   router.push('/');
 
 } }
     
     
     ></Switch></div>
 
  
  <div className="flex items-center gap-4 relative ">
    <div className="h-full hidden items-center text-sm font-medium md:flex  hover:bg-neutral-200 rounded-full px-2 cursor-pointer transition-all " onClick={()=>{ if(!session){router.push('/login')}if(session){setrent(true)}; console.log("hello")}}> Airbnb your home</div>



 

 <Logpop setopenlog={setopenlog} setlogin={setlogin} userinfo={userinfo} setregister={setregisterpop}></Logpop>
  </div>
  </div>

  </div>
  <div className="mt-16 pt-1  fixed z-20 w-screen bg-white">
 <Categories></Categories>


  </div>
  <div className="mt-32 pt-4 flex-none md:flex">


<div className="  flex-none md:flex md:justify-between        w-full ">

<div className="md:hidden block"><Maps listings={listings}></Maps></div>
  

 <Listings   listings={listings} setlistings={setlistings} ></Listings>

 <div className="  w-full md:w-2/5 " >

 
 {!(listings.length===0)&& <div className="hidden md:block"><Maps listings={listings}></Maps></div>} 
  </div>
</div>

 {/* <Card className="w-[600px] m-8  ">
  <Map geo={[60,34]}></Map>
  <div className="px-6 pt-7">How many km from your current located?</div>
  <div className="px-6">
  <Slider defaultValue={[33]} max={100} step={1} />
  
  </div>
  
  <CardHeader>
  <CardTitle>Card Title</CardTitle>
  <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
  <p>Card Content</p>
  </CardContent>
  <CardFooter>
  <p>Card Footer</p>
  </CardFooter>
  </Card> */}




  </div>
 


</SessionProvider>
  );
} 
