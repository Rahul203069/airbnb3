
import { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";
import { getServerActionDispatcher } from "next/dist/client/components/app-router";

export async function POST(request:NextRequest){

    const prisma= new PrismaClient();


    const {listingId,email,authorId}= await request.json();

const query:any={}

if(listingId){

    query.listingId=listingId
}
if(email){

 const user=   await prisma.users.findFirst({where:{email}})
if(user){

    query.userid=user.id
}
}
if(authorId){

    query.authorId=authorId;
}
 

const reservations= await prisma.reservation.findMany({

    where:query,
    include:{listing:true},
    orderBy:{createdat:"desc"}
})
console.log(reservations)

return Response.json(reservations);


}


