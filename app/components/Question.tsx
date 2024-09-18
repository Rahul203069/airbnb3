
//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { Badge } from "@/app/ui/badge"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/ui/dialog"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { format } from 'date-fns';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/app/ui/card"
  import { Button } from '@/app/ui/button'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Alert, AlertDescription, AlertTitle } from '@/app/ui/alert'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { FaPerson } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'
const Question = () => {

const {data:session}=useSession();

    const [questions, setquestions] = useState('')
    const [questionset, setquestionset] = useState([])




    useEffect(() => {


        axios.get('/api/questions').then((res)=>{setquestionset(res.data)}).catch(e=>console.log(e));
    
    }, [])
    
  return (
    <div>

<Card className='w-[700px] h-[800px] m-5 mr-10 relative'>
  <CardHeader>
    <CardTitle className='text-2xl'> Questions from users</CardTitle>

  </CardHeader>
  <CardContent className=''>

<ScrollArea  className="h-[600px] w-full -m-2  p-4">




{questionset?.map((item:any)=>{
  
  
  return(
    
    
    <>
    
    
<Dialog >
  <DialogTrigger>



  <Card className='w-[600px] mt-4'>

<CardContent className='flex justify-between'>



<div className='flex items-center '>

<Avatar>
  <AvatarImage src={item.user?.image}></AvatarImage>
  <AvatarFallback className='p-3 bg-slate-200 text-slate-500'><IoPersonSharp></IoPersonSharp></AvatarFallback>
</Avatar>
<div className='pl-2'>



  <div className='pt-4 font-semibold float-left '> {item?.question}</div>
  <div  className='pt-3 text-gray-500 '> {item?.user?.email}</div>
</div>

</div>
<div className='flex-col ' >



{item?.answered?<Badge variant="destructive" className='h-min w-min mt-2'>answered</Badge>:<Badge variant="default" className='h-min w-min mt-2'>unanswered</Badge>}

<div className='mt-7'>{ format(new Date(item.createdat), 'yyyy-MM-dd')}</div>
</div>


</CardContent>

</Card>
    
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-3xl'>{item.question}?</DialogTitle>
      <DialogDescription className='text-xl'>
      {item.answer?<>{item?.answer}</>:<div className='mt-5 text-2xl'><Alert><AlertTitle><div className='text-2xl font-semibold'>Sorry</div></AlertTitle><AlertDescription className='text-lg text-gray-600'>Sorry, this question is not yet answerd by the listing owner</AlertDescription></Alert></div>}
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>



    
    
    </>
)
})}

</ScrollArea>















  </CardContent>
  <CardFooter className='absolute bottom-0  '>
    
    
  <Dialog>
  <DialogTrigger>    <Button className='p-6'>Post Question</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Post question?</DialogTitle>
      <DialogDescription>
      ask what you want to know about the property
       
      </DialogDescription>
    </DialogHeader>

<textarea onChange={(e)=>{setquestions(e.target.value)}} placeholder='ask question here' className='p-3 border rounded-lg min-h-28'></textarea>
<Button disabled={!(questions.length>1&&session?.user)} className='w-min px-4' onClick={()=>{  axios.post('/api/questions',{questions,email:session?.user?.email}).then((res)=>{setquestionset([...questionset,res.data])})  }}>Post</Button>



  </DialogContent>
</Dialog>
    

    
    







       
    
    </CardFooter>
 
</Card>













    </div>
  )
}

export default Question