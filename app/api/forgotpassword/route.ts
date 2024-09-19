

import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { Result } from "postcss";
import {Resend }from "resend";
import bcryptjs from 'bcryptjs';

import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
const prisma=  new PrismaClient()

const resend = new Resend('  re_UVLot9AN_J9ns6fYk4Vu795DoeZ5Ah6of');




function generateRandomFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}











export async function POST(request:NextRequest){
    const {data}= await request.json()
const otp= generateRandomFourDigitNumber();
const{email}=data
try{
    
   

    const userexist=await prisma.users.findFirst({where:{email}});
    if(!userexist){
        return NextResponse.json({error:"user dosent exist"});
    }
    
const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Hello World',
    html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #4CAF50;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 30px;
            text-align: center;
        }

        .content p {
            font-size: 18px;
            margin-bottom: 20px;
        }

        .code-box {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 8px;
            letter-spacing: 10px;
            display: inline-block;
        }

        .footer {
            background-color: #4CAF50;
            padding: 15px;
            text-align: center;
            color: #ffffff;
        }

        .footer p {
            margin: 0;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>Your Verification Code</h1>
        </div>
        <div class="content">
            <p>Hello!</p>
            <p>Use the following 4-digit code to verify your account:</p>
            <div class="code-box">${otp}</div>
            <p>This code will expire in 10 minutes.</p>
        </div>
        <div class="footer">
            <p>If you didn’t request this code, please ignore this email.</p>
        </div>
    </div>
</body>

</html>`,
});

if (error) {
    
    console.log(error)
}






if(data){



   const check= await prisma.users.update({where:{email},data:{otpforforgotpassword:otp}})








    return NextResponse.json({message:"otpsend"});

}
if(error){
    return NextResponse.json({message:"something went  err wrong"})
}
    
    
}catch(e){
    return NextResponse.json({error:"something went wrong"});
    
    
}


}

export async function PUT(res:NextRequest){


const{email,otp}=await res.json();


try{



    
    const user= await prisma.users.findFirst({where:{email}});

    if(!user){
        return NextResponse.json({error:"something went wrong"})
    }
    //@ts-ignore
    if(user.otpforforgotpassword.toString()===otp.toString()){
        
        const hashedToken=await bcryptjs.hash(user.id.toString(),10)

        const token=await prisma.users.update({where:{id:user.id},data:{verifytoken:hashedToken}})
  


        return NextResponse.json({message:user.verifytoken});
        
    }
    else{
        return NextResponse.json({error:"otp not match"})
        
    }



}catch(e){
    return NextResponse.json({error:"sonmething went wrong in catch"});
}






}