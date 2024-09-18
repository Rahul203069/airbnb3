//@ts-nocheck
"use client"
import React, { useState } from 'react'





import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/ui/dialog"
  import { Alert, AlertDescription, AlertTitle } from "@/app/ui/alert"
  import { Checkbox } from "@/app/ui/checkbox"
  
  
  import toast from 'react-hot-toast';
  import CurrencyInput from 'react-currency-input-field';
  import { CldUploadWidget } from 'next-cloudinary';

  import ReactDOM from 'react-dom';
  import 'react-responsive-modal/styles.css';
  import { Modal } from 'react-responsive-modal';
  import { ReactSearchAutocomplete } from 'react-search-autocomplete'
  import { TbPhotoPlus } from 'react-icons/tb';
  import { BiCurrentLocation, BiWifi1 } from "react-icons/bi";
  import Categoryinput from './Categoryinput';
  
  import { useForm } from 'react-hook-form';
  
  import { useRouter } from 'next/navigation';
  import { categories } from './Categories';
  
  import axios from 'axios';
  
  import dynamic from 'next/dynamic';
  
  import Counter from './Counter';
  
  import { useSession } from 'next-auth/react';
  import { Button } from "@/app/ui/button";
  import { FcWiFiLogo } from "react-icons/fc";
  import { FaDog, FaMountain, FaParking, FaTv } from "react-icons/fa";
  import { FaCross, FaKitchenSet } from "react-icons/fa6";
  import { IoMdAdd } from "react-icons/io";

import { MdClose, MdDelete } from 'react-icons/md';
  


enum steps{
    CATEGORY =0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5
   } 
 

function convertImageToBase64(file) {
return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
}


const EditModal = ({items,setproperties}:{items:any,setproperties:any}) => {






console.log(items);



    const Map = dynamic(() => import('./Map'), { ssr: false });



const {data:session}=useSession();



    const{register,formState:{errors},watch,setValue,handleSubmit,reset,getValues}=useForm({
  
        defaultValues:{
            category: items.category,
            location: items?.locationValue,
       
            guestCount:items?.guestcount,
            roomCount:items?.roomcount,
            bathroomCount:items?.bathroomcount,
            imageSrc:items?.imagesrc,
            price:items?.price,
            title:items?.title,
            description:items?.descriptiom
    
        }
    })

const location=watch("location");
  const category=watch("category");
  const guestCount=watch('guestCount');
const description=watch('description');
  const roomCount =watch('roomCount');
  const bathroomCount=watch('bathroomCount');
  const imageSrc =watch('imageSrc');
  const price=watch('price');
  const title=watch('title');
  




  
  const setCustomvalue=(id:any,value:any)=>{

    setValue(id,value,{
        shouldDirty:true,
        shouldTouch:true,
        shouldValidate:true
    })
}




let bodycontent=(<>
    <div className='flex justify-center p-3 border-b'>Airbnb your home</div>
    <div className=' p-3  font-bold'>Which of the best describes your place</div>
    <div className='  px-3 text-gray-500  text-sm'>Pick a category</div>
   <div className='w-full p-4 '>
    <div className='  max-h-[525px] flex  flex-wrap gap-5 overflow-y-auto '>    {categories.map((items:any)=>{
        return(
         <Categoryinput onclick={(category)=>{ setCustomvalue('category',category)}} selected={(category===items.name)} name={items.name} icon={items.icon}></Categoryinput>
        );
    })}
  
    
  
    </div>
  
    </div>
    <div className="flex justify-between">
  
      <div></div>
    <Button className="px-20 py-5 m-2 mx-3" disabled={(category?.length===0)}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{} }}> Next</Button>
    </div>
    
    </>
  )

  const [step, setstep] = useState(steps.CATEGORY)

const [geo, setgeo] = useState([Number(location?.split('?')[1]),Number(location?.split("?")[2])])




  const [item, setitem] = useState([])



  const handleOnSearch = (string, results) => {
  // onSearch will have as the first callback parameter
  axios.get(` https://api.locationiq.com/v1/autocomplete?key=pk.deb87b54fd43801d7fd7b12571d34439&q=${string}`).then((res)=>{ setitem(res.data); }).catch(e=>console.log(e))
  // the string searched and for the second the results.
  console.log(string, results)
  }
  
  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }
  
  const handleOnSelect = (item) => {
    // the item selected
    setgeo([Number(item.lat),Number(item.lon)]);
    // `
    setCustomvalue("location",`${item.display_name}?${item.lat}?${item.lon}`);
  
  
  }
  
  const handleOnFocus = () => {
    console.log(item);
      console.log('Focused')
    }
    
    const formatResult = (item) => {
        return (
      <>
  
        <span style={{ display: 'block', textAlign: 'left' }}> {item.display_name}</span>
      </>
    )
  }
  
  
  
  
  







  if(step===steps.LOCATION){
    bodycontent=(
        <>
         <div className='flex justify-center p-3 border-b'>Airbnb your home</div>
    <div className=' p-3  font-bold'>Where is your place located?</div>
    <div className='  px-3 text-gray-500  text-sm'>Help guest find you</div>
    <div className='mt-5 '>
  
  
  
  
  
    <div style={{ width: 400 }} className='z-50'>
          <ReactSearchAutocomplete
          placeholder={location?.split("?")[0]}
            items={item||location?.split("?")[0]}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            styling={ {zIndex:50,fontSize:"15px"}}
            fuseOptions={{ keys: ["display_name"] }}
                resultStringKeyName="display_name"
            showItemsOnFocus
            formatResult={formatResult}
          />
        </div>
  
   {/* <Countryselect  value={location} onChange={(value)=>{ setCustomvalue('location',value)}} ></Countryselect> */}
   <div className='flex items-center'>
   {/* <input  className='w-full p-2 border rounded-l-lg' value={location} onChange={(e)=>{ setCustomvalue('location',e.target.value)}}></input> */}
  
  
   </div>
   <div><button className= ' border p-2 mt-1 rounded-lg text-neutral-700 flex items-center' ><BiCurrentLocation></BiCurrentLocation>Use Current loctation</button></div>
   <div className='min-h-96 pt-2 mb-6 '>
   <Map geo={geo}></Map></div>
        </div>
  
  
  
  <div className="flex justify-between">
  
  
  <Button className="px-20 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
  <Button className="px-20 py-5 m-2 mx-3 text-lg" disabled={(location.length===0)}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> Next</Button>
  
  </div>
  
  
        </>
    )
  
  }





  if(step===steps.INFO){

    bodycontent=(
        <>
         <div className='flex justify-center p-3 border-b'>Airbnb your home</div>
    <div className=' p-3  font-bold'>Share some basics about your space</div>
    <div className='  px-3 text-gray-500  text-sm'>What ameneties do you have?</div>
       <Counter Id='guestCount' value={guestCount} setCustomvalue={setCustomvalue}subtitle='How many guest do you allow?' title='Guest' ></Counter>
       <Counter  Id='roomCount' value={roomCount}setCustomvalue={setCustomvalue}subtitle='How many rooms do you have?' title='Rooms' ></Counter>
  
       <Counter Id='bathroomCount' value={bathroomCount}setCustomvalue={setCustomvalue}subtitle='How many bathrooms do you have?' title='Bathrooms' ></Counter>
  
  
  
  
       <> <div className='flex justify-between  w-full mt-3 gap-3'>
  
       <Button className="px-20 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
  <Button className="px-20 py-5 m-2 mx-3 text-lg" disabled={(roomCount===0||bathroomCount===0||guestCount===0)}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> Next</Button>
  
  
  </div></>
  
  
  
  
  
        </>
    )
  }
  





  const [imgs, setimgs] = useState<null|any[]>(imageSrc.split("="))



if(step===steps.IMAGES){
  bodycontent=(<>
  
  





{/* 
<CldUploadWidget  uploadPreset='oscthk8u'  options={{maxFiles:4}}  onQueuesEnd={(result)=>{console.log( result.info.files.map(item=>item.uploadInfo.secure_url));      }} >
{
({open})=>{
  return(
    <div className='cursor-pointer p-20 border-dashed border-2 h-80 mt-5 flex items-center justify-center rounded-lg relative' onClick={open}>
    <div className=' flex-col flex items-center justify-center'><TbPhotoPlus size={50}></TbPhotoPlus><div></div>Click to upload</div> */}
{/* {true&&<div className='w-full h-full absolute'><img className='w-full h-full ' src={}></img></div>} */}
          {/* </div>
      )
      
      }
      }
      
      </CldUploadWidget> */}






<>
      <div className='flex justify-center p-3 border-b'>Airbnb your home</div>
      <div className=' p-3  font-bold'>Add some photos of  your space</div>
      <div className='  px-3 text-gray-500  text-sm'>Let Guest know how your place looks like?</div>

      <Alert className="mt-2">

<AlertTitle>Heads up!</AlertTitle>
<AlertDescription>
first there uploaded images will be the thumblain images by default
</AlertDescription>
</Alert>

      <Button  className="m-3 p-4">Upload <input className=" absolute w-16 opacity-0" type="file" onChange={async(e)=>{axios.post('/api/imageupload',{path: await convertImageToBase64(e.target.files[0])}).then((res)=>{  setimgs([...imgs,res.data.url]);  setCustomvalue("imageSrc",imgs?.join('='));   console.log(imageSrc);})}}></input></Button>
     <></>
<div className="gallery max-h-96 overflow-y-auto overflow-x-hidden">

{imgs?.map(item=><div className="gallery-item relative"><div className='absolute mx-5 mt-5 text-white rounded-lg bg-red-600 p-1 z-40 cursor-pointer' onClick={(e)=>{ console.log("hello"); setimgs(imgs.filter(items => items !== item));setCustomvalue("imageSrc",imgs?.join('=')); }}><MdClose/></div> <img src={item} className=" rounded-lg m-3"></img> </div>)}

</div>
</>




<> <div className='flex justify-between  w-full mt-3 gap-3'>

<Button className="px-20 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
<Button className="px-20 py-5 m-2 mx-3 text-lg" disabled={(imgs.length===0)}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> Next</Button>


</div></>
</>
  )
}





if(step===steps.DESCRIPTION){
   
    bodycontent=(
        <>
 <div className='flex justify-center p-3 border-b'>Airbnb your home</div>
       <div className=' p-3  font-bold'>How would you describe your place?</div>
       <div className='  px-3 text-gray-500  text-sm'>Short and sweet works best !</div>
 <input type='text'  placeholder='Title' value={title}  className='border p-3 w-full my-3 rounded-lg'  onChange={(e)=>{setCustomvalue('title',e.target.value)}} ></input>
 <textarea  value={description}  placeholder='Descriptiom'  className='border p-4 w-full my-3 rounded-lg'  onChange={(e)=>{setCustomvalue('description',e.target.value); }}  ></textarea>
 <div>
 Amenties
 </div>
 
 
 
 <div className="grid grid-cols-2 gap-4">
 <Alert className="mt-2 w-52  flex item-center">
   <AlertTitle className="flex items-center gap-3">  <Checkbox /> <BiWifi1></BiWifi1> Free wifi  <  IoMdAdd></IoMdAdd> </AlertTitle>
 </Alert>
 
 
 <Alert className="mt-2 w-52 flex  flex item-center">
   <AlertTitle className="flex justify-between items-center gap-3"> <Checkbox /> <FaDog /> Pets allowed  <  IoMdAdd></IoMdAdd> </AlertTitle>
 </Alert>
 
 <Alert className="mt-2 w-452  flex item-center">
   <AlertTitle className="flex justify-between items-center gap-3"> <Checkbox /><FaMountain /> Window view  <   IoMdAdd></IoMdAdd> </AlertTitle>
 </Alert>
 
 <Alert className="mt-2 w-52  flex item-center">
   <AlertTitle className="flex justify-between items-center gap-3">  <Checkbox /><FaParking /> Free parking  <  IoMdAdd></IoMdAdd> </AlertTitle>
 </Alert>
 
 <Alert className="mt-2 w-52  flex item-center">
   <AlertTitle className="flex  justify-betweenitems-center gap-3"> <FaKitchenSet /> <Checkbox />  <  IoMdAdd></IoMdAdd> </AlertTitle>
 </Alert>
 
 <Alert className="mt-2 w-52  flex item-center">
   <AlertTitle  className="flex  justify-between items-center gap-3"> TV <FaTv /> <Checkbox />  <  IoMdAdd></IoMdAdd> </AlertTitle>
 </Alert>
 </div>
 
 
 <> <div className='flex justify-between  w-full mt-3 gap-3'>
 
 <Button className="px-20 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
 <Button className="px-20 py-5 m-2 mx-3 text-lg" disabled={(title?.length===0||description?.length===0)}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> Next</Button>
 
 
 </div></>
 
 </>
 
   )
 
 
 
 }

const [loadr, setloadr] = useState(false)

 const submit=handleSubmit((data)=>{
    console.log(data);
   if(step!==5){
       return
   }
 

   axios.put('/api/listings',{data:data,user:session?.user,listingid:items.id}).then((res)=>{ toast.success(res.data.msg);  setstep(steps.CATEGORY);
   

    setproperties(res.data);
    const {error}=res.data;
    if(error){
        toast.error(error);
    }else{ toast.success("listing updated successfully")}
    //    axios.get('api/listings').then((res)=>{setlistings(res.data);}).catch((e)=>{console.log(e);})
 
 setloadr(false);
   }).catch((e)=>{ console.log(e)});
 setloadr(false)
 })
 
 
if(step===steps.PRICE){
 
    bodycontent=(
       <>
         <div>
     
     <div className='flex justify-center p-3 border-b'>Airbnb your home</div>
         <div className=' p-3  font-bold'>Now,set your price</div>
         <div className='  px-3 text-gray-500  text-sm'>How much you charge per night</div>
         <CurrencyInput prefix='$' className='border p-2 m-3 mt-7'  value={price} allowNegativeValue={false} maxLength={3} placeholder='Price' onValueChange={(value)=>{  setCustomvalue('price',value)}}></CurrencyInput>
         </div>
   
         <> <div className='flex justify-between  w-full mt-3 gap-3'>
   
   <Button className="px-20 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
   <Button className="px-7 py-5 m-2 mx-3 text-lg " disabled={!(price>0)||loadr}  variant={"destructive"} onClick={()=>{ setloadr(true); submit() }}> {loadr?"Saving...":"Save Changes"} </Button>
   
   
   </div></>
         </>
   
     )
   }


  return (
    < >
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  <div className="w-full">
  
  
  {bodycontent}
  
  
  
  
  </div>

    
  </>
    
  
    
)}

export default EditModal