
//@ts-nocheck
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
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { TbPhotoPlus } from 'react-icons/tb';
import { BiCurrentLocation, BiWifi, BiWifi1 } from "react-icons/bi";
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
import { FaKitchenSet } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";







enum steps{
   CATEGORY =0,
   LOCATION=1,
   INFO=2,
   IMAGES=3,
   DESCRIPTION=4,
   PRICE=5
  } 

const Rent= ({login,setregister,refetch,listings,register:any,setlistings}:any) => {

const router=useRouter();
const [dropup, setdropup] = useState(false)
const [dropdown, setdropdown] = useState(false)
const [loading, setloading] = useState(false)
const [step, setstep] = useState(steps.CATEGORY);
const {data:session}=useSession();
const [geo, setgeo] = useState([48.8566,2.3522])
const [Location, setLocation] = useState('')





  const{register,formState:{errors},watch,setValue,handleSubmit,reset,getValues}=useForm({
  
      defaultValues:{
          category: '',
          location: '',
     
          guestCount:0,
          roomCount:0,
          bathroomCount:0,
          imageSrc:'',
          price:0,
          title:'',
          description:'',
          tv:false
  ,wifi:false,
  pets:false,
  view:false,
  kitchen:false,
  parking:false,


      }
  })
  const [next, setnext] = useState(true);
  

  
  
  //    const Map =useEffect(() => dynamic(()=>import('./Map'),{ssr:false}) , [loctation])
  const Map = dynamic(() => import('./Map'), { ssr: false });
  
  
  
  console.log("bahi hye bhi rerender");
  const location=watch("location");
  const category=watch("category");
  const guestCount=watch('guestCount');

  const roomCount =watch('roomCount');
  const bathroomCount=watch('bathroomCount');
  const imageSrc =watch('imageSrc');
  const price=watch('price');
  const title=watch('title');
  const extrainfo=watch('extrainfo')
  const tv=watch('tv');
  const wifi=watch('wifi');
  const pets=watch('pets');
  const view=watch('view');
  const kitchen=watch('kitchen');
  const parking=watch('parking');

  




  






  const description =watch('description'); 
  // const Map= useMemo(()=> dynamic(()=>import('./Map')),{ssr:false},[location])

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
  <Button className="px-20 py-5 m-2 mx-3" disabled={(category.length===0)}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> Next</Button>
  </div>
  
  </>
)


 
//  const getlocation=function(){                          

//     const options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     };
  
//     function success(pos:any) {
//       const crd = pos.coords;
//       console.log(crd);
//       console.log("Your current position is:");
//       console.log(`Latitude: ${crd.latitude}`);
//       console.log(`Longitude: ${crd.longitude}`);
//       console.log(`More or less ${crd.accuracy} meters.`);
//      const l=[crd.latitude,crd.longitude];
//      setgeo(l);
   
   
//      axios.get(` https://geocode.maps.co/reverse?lat=${crd.latitude}&lon=${crd.longitude}&api_key=66439f8cd92b5061250040ubt6be173`).then((res)=>{const address=res.data.display_name; console.log(address);  setCustomvalue('location',address) }).catch((e)=>{console.log(e);})
//     }
  
//     function error(err:any) {
//       console.warn(`ERROR(${err.code}): ${err.message}`);
//     }
  
//     navigator.geolocation.getCurrentPosition(success, error, options);


//    } 




//   const [item, setitems] = useState([]);




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























































const  searchlocation=function(){
  
  const add= location.split(' ');
  const address=add.join('+');
  
  axios.get(`https://geocode.maps.co/search?q=${address}&api_key=66439f8cd92b5061250040ubt6be173`).then((res)=>{const addres=res.data; console.log(addres); setgeo([address[0].lat,address[0].lon]);  setCustomvalue('location',address) }).catch((e)=>{console.log(e);})
  
  
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
          items={item}
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
     <Counter Id='guestCount' value={guestCount}setCustomvalue={setCustomvalue}subtitle='How many guest do you allow?' title='Guest' ></Counter>
     <Counter  Id='roomCount' value={roomCount}setCustomvalue={setCustomvalue}subtitle='How many rooms do you have?' title='Rooms' ></Counter>

     <Counter Id='bathroomCount' value={bathroomCount}setCustomvalue={setCustomvalue}subtitle='How many bathrooms do you have?' title='Bathrooms' ></Counter>




     <> <div className='flex justify-between  w-full mt-3 gap-3'>

     <Button className="px-20 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
<Button className="px-20 py-5 m-2 mx-3 text-lg" disabled={(roomCount===0||bathroomCount===0||guestCount===0)}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> Next</Button>


</div></>





      </>
  )
}





function convertImageToBase64(file) {
return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
}


const [imgs, setimgs] = useState<null|any[]>([])



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

{imgs?.map(item=><div className="gallery-item relative"> <img src={item} className=" rounded-lg m-3"></img> </div>)}

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
       <div className="overflow-y-scroll">
<div className='flex justify-center p-3 border-b'>Airbnb your home</div>
      <div className=' p-3  font-bold'>How would you describe your place?</div>
      <div className='  px-3 text-gray-500  text-sm'>Short and sweet works best !</div>
<input type='text'  placeholder='Title'   className='border p-3 w-full my-3 rounded-lg'  onChange={(e)=>{setCustomvalue('title',e.target.value)}} ></input>
<textarea type='text'  placeholder='Descriptiom'  className='border p-4 w-full my-3 rounded-lg'  onChange={(e)=>{setCustomvalue('description',e.target.value); }}  ></textarea>
<textarea type='text'  placeholder='Extrainfo'  className='border p-4 w-full my-3 rounded-lg'  onChange={(e)=>{setCustomvalue('extrainfo',e.target.value); }}  ></textarea>

 
 
 <div>
Amenties
</div>



<div className="grid grid-cols-2 gap-4 text-gray-600">
<Alert className="mt-2 w-52  flex item-center ">
  <AlertTitle className="flex items-center gap-3 text-gray-600">      <Checkbox   onCheckedChange={(value)=>{setCustomvalue('wifi',value)}} /> <BiWifi></BiWifi> Free wifi   </AlertTitle>
</Alert>
<Alert className="mt-2 w-52  flex item-center">
  <AlertTitle  className="flex  justify-between items-center gap-3 text-gray-600"> <Checkbox     onCheckedChange={(value)=>{setCustomvalue('tv',value)}} /> <FaTv /> TV   </AlertTitle>
</Alert>

<Alert className="mt-2 w-52  flex item-center">
  <AlertTitle className="flex justify-between items-center gap-3 text-gray-600"> <Checkbox        onCheckedChange={(value)=>{setCustomvalue('pets',value)}}  /> <FaDog /> Pets allowed   </AlertTitle>
</Alert>

<Alert className="mt-2 w-452  flex item-center">
  <AlertTitle className="flex justify-between items-center gap-3 text-gray-600"> <Checkbox         onCheckedChange={(value)=>{setCustomvalue('view',value)}} /><FaMountain /> Window view   </AlertTitle>
</Alert>

<Alert className="mt-2 w-52  flex item-center">
  <AlertTitle className="flex justify-between items-center gap-3 text-gray-600">  <Checkbox        onCheckedChange={(value)=>{setCustomvalue('parking',value)}} /><FaParking /> Free parking   </AlertTitle>
</Alert>

<Alert className="mt-2 w-52  flex item-center">
  <AlertTitle className="flex  justify-betweenitems-center gap-3 text-gray-600"> <Checkbox           onCheckedChange={(value)=>{setCustomvalue('kitchen',value)}} /><FaKitchenSet /> Kitchen    </AlertTitle>
</Alert>


</div>


<> <div className='flex justify-between  w-full mt-3 gap-3'>

<Button className="px-20 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
<Button className="px-20 py-5 m-2 mx-3 text-lg" disabled={(title.length===0||description.length===0)}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> Next</Button>


</div></>

</div>

  )



}

const [Price, setPrice] = useState(0)
const [loader, setloader] = useState(false);

if(step===steps.PRICE){
 
 bodycontent=(
    <>
      <div>
  
  <div className='flex justify-center p-3 border-b'>Airbnb your home</div>
      <div className=' p-3  font-bold'>Now,set your price</div>
      <div className='  px-3 text-gray-500  text-sm'>How much you charge per night</div>
      <CurrencyInput prefix='$' className='border p-2 m-3 mt-7'  value={Price} allowNegativeValue={false} maxLength={3} placeholder='Price' onValueChange={(value)=>{ setPrice(value); setCustomvalue('price',value)}}></CurrencyInput>
      </div>

      <> <div className='flex justify-between  w-full mt-3 gap-3'>

<Button className="px-20 py-5 m-2 mx-3 text-lg"  variant={"ghost"}onClick={()=>{setstep(step-1)}}> Back</Button>
<Button className="px-20 py-5 m-2 mx-3 text-lg" disabled={!(price>0)||loader}  variant={"destructive"} onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}> {loader?"creating...":"create"}</Button>


</div></>
      </>

  )
}

const submit=handleSubmit((data)=>{
  setloader(true);
   console.log(data);
  if(step!==5){
      return
  }

  
  axios.post('/api/listings',{data:data,user:session?.user}).then((res)=>{
    
    const{error}=res.data
    if(error){
      return toast.error(erroe)
    }else{


      toast.success("listing created succesfully");  
      setstep(steps.CATEGORY);

    }
    setloader(false)

      axios.get('api/listings').then((res)=>{setlistings(res.data);}).catch((e)=>{console.log(e);})


  }).catch((e)=>{console.log(e)});

})




  return (
  < >
  
















  <div className='w-screen absolute z-10 bg-black  h-screen opacity-0 flex justify-center items-center cursor-pointer ' > </div>




{register&&
  
  
  <Dialog   open={true} onOpenChange={()=>{setregister(false)}} >

<DialogContent className="">

<div className="w-full ">


{bodycontent}




</div>
</DialogContent>
</Dialog>
  
  

  

}



{/* 
   <div className='w-screen absolute z-10 bg-black  h-screen opacity-0 flex justify-center items-center cursor-pointer 'onClick={()=>{setdropdown(true); setTimeout(() => {
setregister(false);
}, 150); }}> </div> */}









{/* 
  </div> */}

{/* <div className=' flex justify-center   w-full h-full ' >
    <div className={`w-full h-screen md:h-auto md:w-2/4 max-h-screen bg-white absolute z-40  md:mt-14  rounded-lg px-4 pb-5 duration-200  transition-all ${ dropdown&& ` opacity-0 `}`}>
   {bodycontent}


   {(step>0)&&<> <div className='flex justify-between  w-full mt-3 gap-3'>
      
      <div className=' border-2 text-gray-700 rounded-lg  p-2  justify-center flex  border-gray-700 w-full  cursor-pointer' onClick={()=>{setstep(step-1)}}>Back</div>
      <div className='  border-2 border-red-600 justify-center p-2 flex items-center text-white rounded-lg bg-red-600 w-full  cursor-pointer'   onClick={()=>{  if(step!==5){const newstep=step+1; setstep(newstep);}else{submit()} }}>{(step===5)?'Create':'Next'}</div>
      
      </div></>}
  {(step===0)&&<div className=' flex justify-center mt-6 text-2xl bg-red-600 p-3 rounded-lg text-white cursor-pointer' onClick={()=>{ const newstep=step+1; setstep(newstep); setnext(!next)}}>Next</div>}
    </div>
  </div> */}
  </>
)
}

export default Rent