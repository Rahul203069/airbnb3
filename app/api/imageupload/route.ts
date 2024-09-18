import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary'


cloudinary.v2.config({
    cloud_name:'dkcrdxvio',
    
    api_key:'839813111465819',
    api_secret:'UadDxmxjz1c_-IsO1YZFNjCm9SI'
  })

export async function POST(req:NextRequest){
const {path}= await req.json();



 let results
console.log()

 const result= await cloudinary.v2.uploader.upload(path ,{resource_type:'auto'})





 return NextResponse.json({url:result.secure_url});


}