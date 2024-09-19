
//@ts-nocheck

import { error } from "console";
import bcrypt from "bcrypt";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verify } from "crypto";

const prisma=new PrismaClient();
async function hashPassword(password:any) {

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }
 


export async function POST(request:NextRequest) {
    

    const{email,token,password}= await request.json();


    
    try{

        const user=await prisma.users.findFirst({where:{email}})
if(!user){
    return NextResponse.json({error:"user not found"})
    
    console.log(token)
}
//@ts-ignore
if(user.verifytoken.toString()===token.toString()){

  const update=await prisma.users.update({where:{id:user.id}, data:{hashedpassword:await hashPassword(password)}})
 
    
    return NextResponse.json({message:"password chnaged succefully"})
}
else{

  return NextResponse.json({error:"invailid token"});
}
}catch(e){
    


    return NextResponse.json({error:"something went wrong"});



    }

}