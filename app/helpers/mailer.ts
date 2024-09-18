import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '../models/Signup';
import { error } from 'console';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const resend = new Resend('  re_UVLot9AN_J9ns6fYk4Vu795DoeZ5Ah6of');
const prisma= new PrismaClient();


export const sendemail=async function({email,emailtype,userid}:any){

try{
    const hashedToken=await bcryptjs.hash(userid.toString(),10)

    await prisma.users.update({where:{id:userid},data:{verifytoken:hashedToken, verifytokenexpiry:new Date(Date.now()+3600000)}})
    // await User.findByIdAndUpdate(userid,{verifytoken:hashedToken, verifytokenexpiry:Date.now()+3600000})
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Hello World',
      html:`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
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
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(to right, #6a11cb, #2575fc);
            padding: 30px;
            text-align: center;
            color: #ffffff;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
        }

        .content {
            padding: 40px 30px;
            text-align: center;
        }

        .content p {
            font-size: 18px;
            margin-bottom: 30px;
            color: #555555;
        }

        .verification-link {
            display: inline-block;
            background: linear-gradient(to right, #ff416c, #ff4b2b);
            color: white;
            padding: 15px 25px;
            font-size: 18px;
            font-weight: bold;
            text-decoration: none;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(255, 75, 43, 0.4);
            transition: background 0.3s ease;
        }

        .verification-link:hover {
            background: linear-gradient(to right, #ff416c, #ff4b2b);
        }

        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #888888;
        }

        .footer p {
            margin: 0;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>Email Verification Required</h1>
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>Thank you for signing up! Please confirm your email address by clicking the button below:</p>
            <a href="http://localhost:3000/verifyemail?token=${hashedToken}" class="verification-link">Verify Email</a>
            <p>If you did not create an account, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`

  });
  
  if (error) {
      
    return error
      
  }
  
  
  
  
  
  
  if(data){
  
  
  
  
  
  
  
  
  
  
  
      return data
  
  }
}catch(error:any){
    throw new Error(error.message)
}


}