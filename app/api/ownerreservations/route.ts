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

    const user=await prisma.users.findUnique({
        where:{email}
    })


    if(user){
    const listings=await prisma.listing.findMany(
        {where:{userid:user.id},
    include:{reservations:true}
    
}
) 

return  Response.json(listings);

}


return Response.json({error:'cant fetch your reservations'})

//     let rv:any=[]

    
//  listings.map(async(listing)=>{
// const reservations=await prisma.reservation.findMany({
//     where:{listingId:listing.id}

// })

// rv=[...rv,...reservations]
// })

// console.log(rv);





}