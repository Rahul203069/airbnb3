//@ts-nocheck

"use client"
import React, { useState } from 'react'
import { Card,CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { Avatar,AvatarImage,AvatarFallback } from '../ui/avatar'
import { Dialog, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogContent } from '../ui/dialog'
import { BiImageAdd } from 'react-icons/bi'
import axios from 'axios'
import toast from 'react-hot-toast'








function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    }
    

const Edituser = () => {
    const{data:session}=useSession();
    const [loader, setloader] = useState(false)
    const [name, setname] = useState(session?.user?.name||'')

    const [imgs, setimgs] = useState(null);
  return (
    <div className='  '>


<Card className='w-[620px] md:w-[650px]  mx-auto md:mr-7 p-3 pb-4 pt-3'>
        
        <CardContent className='w-[620px] relative md:w-[650px] '>
          <div className='  flex w-full  relative gap-4 items-center'>
  <div className=' absolute top-1 left-0 '>

   

  <img  className='rounded-full  w-20 h-20 '    src={imgs||session?.user?.image} />
    


  </div>
  <div className=' flex justify-between w-[620px] md:w-[650px]'>


<div  className='pl-24'>
<div className='text-lg font-medium'> {session?.user?.name}</div>
<div className='text-gray-600'> {session?.user?.email}</div>
</div>

    
    
    <Dialog>

        <DialogTrigger>
        <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent>

       <DialogTitle className='text-lg font-semibold'>Edit your profile</DialogTitle>

       <div className='flex gap-5'><div className=''>   <img  className='rounded-full size-24' src={imgs||session?.user?.image}></img> <div className='flex justify-between w-full relative  items-center mt-4 gap-8 '><div className=''><Button className=' ' variant='secondary'>  <input   className='opacity-0 w-36 absolute b' onChange={async(e)=>{ setloader(true);axios.post('/api/imageupload',{path: await convertImageToBase64(e.target.files[0])}).then((res)=>{ setloader(false); setimgs(res.data.url);  toast.success('img uploaded succefully') }).catch(e=>{setloader(false); toast.error('something went wrong')})}} type='file'></input> <BiImageAdd size={25}></BiImageAdd> {loader?'uploading...':'Add image'}</Button> </div></div> </div><div className='flex-col '> <div>Name</div><input  value={name} onChange={(e)=>{ setname(e.target.value)}} className='border rounded-lg p-2'></input> <div className='h-full relative w-full'><Button   onClick={()=>{ setloader(true); axios.post('/api/edituser',{name,image:imgs,email:session?.user?.email}).then(res=>setloader(false)).catch(e=>setloader(true)) }} disabled={ !(name?.length>1)||loader  } className='  absolute bottom-14 right-0'>{loader?'Savings..':'Save'}</Button></div></div></div>
        </DialogContent>
    </Dialog>
    
  
  </div>
</div>
        </CardContent>
      </Card>


    </div>
  )
}

export default Edituser