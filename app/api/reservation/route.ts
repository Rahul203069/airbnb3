
//@ts-nocheck
import { Prisma, PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt";

import { NextRequest, NextResponse } from "next/server";
import { FaRegClosedCaptioning } from "react-icons/fa";

import { startTransition } from "react";
import { headers } from "next/headers";
import { format } from 'date-fns';
import Stripe from "stripe";


const stripe = new Stripe("sk_test_51Pua0OJkvwiGj3S53r8a4K2JUhNYc8sYpUosF8jaGsWx1Cv0FLDeoW2NpYIiUAhz98KnR2jddGLonLyqfMMJ7vJ400ZoWa5Px2", {
  apiVersion: '2024-06-20', // Use the latest API version
});

const prisma=new PrismaClient();

function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= new Date(endDate)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    return dates;
  }
  


  function datesMatch(array1, array2) {
    // Convert each date in both arrays to a string in ISO format for accurate comparison
    const dateStrings1 = array1.map(date => new Date(date).toISOString());
    const dateStrings2 = array2.map(date => new Date(date).toISOString());
  
    // Check if any date in array1 exists in array2
    for (let dateStr1 of dateStrings1) {
      if (dateStrings2.includes(dateStr1)) {
        return true; // Match found
      }
    }
  
    return false; // No match found
  }
  

























export async function POST(request:NextRequest) {
    // const session=  getServerSession(AuthOptions);
    
    // console.log(session?.user);

    const json= await request.json()
   console.log(json);

   const{state,totalprice,listingId,user}=json;
if(!user){
   return Response.json({msg:'no user'});
}

const userinfo= await prisma.users.findUnique({where:{email:user.email}})







if(userinfo){
  
  //    let arryofbokkeddates:any[]=[]
  //    checkdatesarefree?.map((item:any)=>{arryofbokkeddates=[arryofbokkeddates,...getDatesBetween(item.startdate,item.enddate)]})
  // if(datesMatch(checkdatesarefree,getDatesBetween(state[0].startDate,state[0].endDate) )){
    
  
  //     return Response.json({err:"sorry no reservations dates overlaped"});
  
  
    // }


    
    
    
    try {
      const listing=await prisma.listing.findFirst({where:{id:listingId}});
    const listingandreservations= await prisma.listing.update({
    
        where:{
            id:listingId,
        },
        data:{
            reservations:{
                create:{
                    userid:userinfo.id,
                    startdate:state[0].startDate,
                    enddate:state[0].endDate,
                    totalprice:totalprice
    
    
    
                }
            }
        }
    })
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Airbnb ',
                description:`This is to book reservation from ${ format(new Date(state[0].startDate), 'MM/dd/yyyy')  } to ${ format(new Date(state[0].endDate), 'MM/dd/yyyy')  } for arbnb whose id ${listing?.id}`,
        
              },
              // @ts-ignore
              unit_amount:parseFloat(listing.price)*100, // $20.00
            },
            quantity: 1,
          },
        ],
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cancel`,
      });
      console.log(session);

     return  NextResponse.json({ url:session.url });
    } catch (err) {
     return NextResponse.json({ statusCode: 500, message: err.message });
    }







// return Response.json(listingandreservations)

}


return Response.json({err:"sorry no reservation couldnt happen"});
}


export async function DELETE(request:NextRequest){

    const body=await request.json();
   const {id}=body;
   return Response.json({id});

}



