import { NextRequest } from "next/server";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Users from "@/app/models/Signup";
 import { connectToDatabase } from "@/lib/mongoose"
import { sendemail } from "@/app/helpers/mailer";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
const saltRounds = 10; // Number of salt rounds
async function hashPassword(password:any) {
    
  try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
    }

    
  }

export async function POST(request:NextRequest){

    const {data}= await request.json()
    const {email,username,password}=data
  

const hashedPassword= await hashPassword(password)
const user= await prisma.users.findFirst({where:{email,username}})
console.log(user)
if(user){

    return Response.json({err:'user already exist'});
}
let newuser
try{
     newuser= await prisma.users.create({data:{email,username,hashedpassword:hashedPassword}});

}catch(e){

    return Response.json({err:'something went wrong'});
}



//send verification email

   const help= await sendemail({email,emailtype:'VERIFY',userid:newuser.id})
   console.log(help);
    return Response.json({message:newuser});
    }
