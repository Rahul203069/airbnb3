import { NextRequest } from "next/server";

import { Prisma, PrismaClient } from "@prisma/client";
import Reservation from "@/app/components/reservations";
import Listings from "@/app/components/Listings";
import { error } from "console";

export   async function POST(request:NextRequest){

const prisma= new PrismaClient();
    const body=await request.json();



    const {userid}= body;
const email= userid

  
  

    
    const listings=await prisma.listing.findMany(
        {where:{user:{email:'rs3296472t@gmail.com'}},  
        include:{reservations:true}
    })
    
    console.log(listings);

const reservation= await prisma.reservation.findMany({

    
    where:{
        listingId:{in:listings.map(item=>item.id)}
    },
    include:{user:true}
    ,orderBy:{
        createdat:'desc'
    }
}
)


return  Response.json(reservation);

}





//     let rv:any=[]

    
//  listings.map(async(listing)=>{
// const reservations=await prisma.reservation.findMany({
//     where:{listingId:listing.id}

// })

// rv=[...rv,...reservations]
// })

// console.log(rv);





