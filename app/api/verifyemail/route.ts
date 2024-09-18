import Users from "@/app/models/Signup";
import { connectToDatabase } from "@/lib/mongoose"
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma= new PrismaClient();
export async function POST(request:NextRequest){

    try{
const reqbody= await request.json();
const{token}=reqbody
const user=await prisma.users.findFirst({where:{verifytoken:token,verifytokenexpiry:{gt:new Date()}}})
if(!user){
    return NextResponse.json({error:"Invaild token"})
}
await prisma.users.update({where:{id:user.id},data:{verified:true}})



return NextResponse.json({message:"emailverified"})    }catch(e){return NextResponse.json({error:"something went wrong"})}
}