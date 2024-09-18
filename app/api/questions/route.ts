//@ts-nocheck
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient();
export async function POST(request:NextRequest){

    const url=request.headers.get('referer')
const{questions,email}=await request.json();
console.log(questions)

try{


    const user=await prisma.users.findFirst({where:{email}});
    if(!user){
        return NextResponse.json({error:'not authenticated'})
    }

    const question=await prisma.question.create({data:{
question:questions,
userid:user.id,
listingId:url.split('/').slice(-1)[0],
answered:false,



    }})




return NextResponse.json(question)



}catch(e){console.log(e)}
return NextResponse.json('ok')



}





export async function GET(request:NextRequest){

    const url=request.headers.get('referer')



try{


   

    const question=await prisma.question.findMany({where:{

        listingId:url.split('/').slice(-1)[0]

    },

include:{user:true},

orderBy: {
    createdat: 'desc',  // Sort by 'name' in ascending order
  }
})




return NextResponse.json(question)



}catch(e){console.log(e)}
return NextResponse.json('ok')



}
