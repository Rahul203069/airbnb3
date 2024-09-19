//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";

import { Prisma ,PrismaClient} from "@prisma/client";
import { parse } from "path";
import mongoose from 'mongoose'

import { MongoClient } from "mongodb"
import { headers } from "next/headers";
import { IoCompassOutline } from "react-icons/io5";
import { Coming_Soon } from "next/font/google";





// if (!process.env.MONGO_URL) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URL"')
// }

// const uri = process.env.MONGO_URL
// const options = {}

// let client
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

const uri = process.env.DATABASE_URL;

console.log("datbaseurl",uri);
const client = new MongoClient(uri);

const database = client?.db('test');
    const collection = database?.collection('listing');
    
    
    
    
    
    
    
    
    // async function getListingsWithinRadius(centerLat, centerLng, radius) {
    //     const query =[
    //       {
    //         $geoNear: {
    //           near: { type: "Point", coordinates: [74.8411, 34.1251] },
    //           distanceField: "distance",
    //           maxDistance: radius, // Radius in meters
    //           spherical: true,
    //         },
    //       },
    //       {
    //         $match: {
    //           price: { $lt: 100, $gt: 10 }, // Filter for  price less than 10 and greater than 100
    //           reservations: {
                
    //               $elemMatch: {
    //                 $or: [
    //                   { startdate: { $lt: new Date(endDate), $gte: new Date(startDate) } },
    //                   { enddate: { $gt: new Date(startDate), $lte: new Date(endDate) } }
    //                 ]
                  
    //             }
    //           }
              
    //         }
    //       },
    //       {
    //         $sort: { distance: 1 }, // Sort by  distance
    //       },
    //     ];
    // const prisma =new PrismaClient();
    
    
    // return  await prisma.$runCommandRaw({
    //     aggregate: 'Listing',
    //     pipeline: query,
    //     cursor: {}
    //   });
      
  
  
    // }
  
  
  
  export async function POST(request:NextRequest){
  
      const prisma =new PrismaClient();
      
      // if(!session){
        //     return Response.json({err:"no user data"});
        // }

        
const jsonbody= await request.json()

        console.log("ye,lo backend")
        const{data,user}=jsonbody;
        console.log(data);
        const users=await prisma.users.findUnique({where:{email:user.email}})
       if(!users){
        return Response.json({error:'you are not authentictaed to createa a listing'})
       }
        console.log(users);
        console.log(data.location);
        const listing =await prisma.listing.create({data:{
            title :data.title,
            descriptiom :data. description,
            imagesrc :data.imageSrc,
            category :data.category,
            roomcount :data.roomCount,
            tv:data.tv,
            wifi:data.wifi,
            pets:data.pets,
            view:data.view,
            kitchen:data.kitchen,
            parking:data.parking,
          extrainfo:data.extrainfo,
            bathroomcount :data.bathroomCount,
            guestcount :data.guestCount,
            locationValue :data.location,            
            userid :users.id,
            location: {type:'Point', coordinates:[Number(data.location.split('?')[2]),Number(data.location.split('?')[1])]},
            price : parseInt(data.price)
            
        }})
        return Response.json(listing);
        
    }
    
    
    export async function GET(request:NextRequest){

        




        const prisma =new PrismaClient();
      
        // const jsonbody=  await request.json();
console.log(request.headers.get('referer'));

  const url= new URL(request.headers.get('referer')||'dw');
  const min=url.searchParams.get('min')
  const maxx=url.searchParams.get('max')
  const geo=url.searchParams.get('geo')
const range= url.searchParams.get('range:');
  const startDate=url.searchParams.get('endDate:')
  const endDate=url.searchParams.get('startDate:')
  const Category=url.searchParams.get('category')
  const distance=url.searchParams.get('distance')




    
  const category=Category;
  console.log(category);
  console.log(geo);
  
  if(geo==='undefined'||!geo){
    
   
    
    console.log('hello');
    console.log(min,maxx);
    try{

      const listing= await prisma.listing.findMany({where:{...(category?{category:category}:{}),   ...((maxx)?{price:{gte:parseInt(min)*10,lte:parseInt(maxx)*10}}:{}) }});

      return NextResponse.json(listing);
    }catch(e){console.log(e)}



}



  console.log( url.searchParams);



  //   console.log(request.headers.referer('value'));
  // const loction =params.getAll("location");
  
  // console.log(loction);
  
  // console.log(endDate.toString());
  
  let reservations= null
  
  if(min&&maxx){
  const   price=  { $lt: Number(maxx), $gt:Number(min) }
    // @ts-ignore
    let category:any= { $exists: true, $ne: null }
 reservations =   {
    $not: {
      $elemMatch: {
        $or: [
          { startdate: { $lt: new Date(endDate), $gt: new Date(startDate) } },
          { startdate: { $lt: new Date(startDate), $gt: new Date(endDate) } },
          { enddate: { $gt: new Date(startDate), $lt: new Date(endDate) } },
          { enddate: { $gt: new Date(endDate), $lt: new Date(startDate) } }
        ]
      }
    }
  }

}



const start= new Date(startDate);
    console.log( new Date(startDate))
    
        async function getListingsWithinRadius(centerLat, centerLng, radius) {
          const query =[
            {
              $geoNear: {
                near: { type: "Point", coordinates: [centerLng,centerLat] },
                distanceField: "distance",
                ...(radius?{maxDistance: radius}:{}),
               // Radius in meters
                spherical: true,
              },
            },
      //       {
      // //         $match: {
      // //            // Filter for  price less than 10 and greater than 100
   
      // // ...(min?{price:price}:{price:{gt:0}}),
      // //         ...(category?{category:category}:{category:{ $exists: true, $ne: null }})
              
              
                
      // //         }


      //       },


     { $match: {
        // Price filter
        ...(min ? { price: { $gt: parseInt(min)*10, $lt: parseInt(maxx)*10 } } : {  }),
      
        // // Category filter
        ...(category ? { category: category } : {  })
      }},
            {
              $sort: { distance: 1}, // Sort by  distance
            },
          
          ];
      const prisma =new PrismaClient();
      
      
      return  await prisma.$runCommandRaw({
          aggregate: 'Listing',
          pipeline: query,
          cursor: {}
        });
        
    
    
      }






        // const listings=  await prisma.listing.findMany({orderBy:{createdat:'desc'}});
        
        
        try {
            await client.connect();
            const database = client.db('test');
            const collection = database.collection('Listing');
        
            // Create the geospatial index
            await collection.createIndex({ location: '2dsphere' });
        
            console.log('Index created');
          } finally {
            await client.close();
          }


          
        const listing = await getListingsWithinRadius(parseFloat(geo?.split(',')[0]), parseFloat(geo?.split(',')[1]), parseFloat(range)*10000);
        
      // @ts-ignore
const listings=JSON.parse(JSON.stringify(listing.cursor.firstBatch))
        
console.log(listings)

// const listing= await  prisma.listing.findMany();
// console.log(listing);

    return Response.json(listings);



}





export async function PUT(request:NextRequest){
  
  const {data,listingid,user}= await request.json();
  
  
  try{
    
    const prisma =new PrismaClient();
    
    
      const users =await prisma.users.findFirst({where:{email:user.email}})
      if(!users){
        return NextResponse.json({error:"you dont own the listing "})
      }
    
    
    const listing= await prisma.listing.update({where:{ id:listingid, user:{email:user.email}},data:{
    
      title :data.title,
      descriptiom :data. description,
      imagesrc :data.imageSrc,
      category :data.category,
      roomcount :data.roomCount,
      bathroomcount :data.bathroomCount,
      guestcount :data.guestCount,
      locationValue :data.location,            

      location: {type:'Point', coordinates:[Number(data.location.split('?')[2]),Number(data.location.split('?')[1])]},
      price : parseInt(data.price)
    }})


    const listings=await prisma.listing.findMany({
      where:{userid:user.id}
  })


return NextResponse.json(listings);


}catch(e){

  return NextResponse.json({error:'something went wrong'});


}

}