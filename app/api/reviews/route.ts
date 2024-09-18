import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

import { NextRequest, NextResponse } from "next/server";

import { connect } from "http2";

const prisma= new PrismaClient();

export async function POST(request:NextRequest){


const {rdescription,rating,listingId,email}= await  request.json();


const user=await prisma.users.findFirst({where:{email}});


if(!user){
    return NextResponse.json({error:"User not found"})
}

const check= await prisma.reviews.findFirst({
    
    
    
    where:{userId:user.id,listingid:listingId}})

if(check){
  
}


const [posts, review]=await prisma.$transaction([
     prisma.reviews.create({
    
        
        
        data:{
    
        description:rdescription,
        listingid:listingId,
        rating,
        userId:user.id,
    
    
    }}),

    prisma.reviews.findMany({

        where:{listingid:listingId},
        include:{user:true},
        orderBy: {
            createdat: 'desc'
          },
          take: 4
    })



])

console.log(review);


// console.log(AuthOptions)
// const session= await getServerSession(AuthOptions);
// console.log(session)
// ;

// const review= await prisma.Reviews.create({data:{
//     description:rdescription,
//     rating,
//     listingid:listinId
// }})


return Response.json(review);



}


export async function PUT(request:NextRequest){



const {email,listingid}=await request.json();

const user=await  prisma.users.findFirst({where:{email}});


if(!user){

return Response.json({error:"user not found"});


}



console.log(listingid);

const reservation=await prisma.reservation.findFirst({where:{listingId:listingid,userid:user.id}});

if(reservation){

    console.log(reservation,"reservation");
    // const review =await prisma.reviews.findFirst({where:{userId:user.id,listingid:listingid}})
    
    // if(review){


    //     // return NextResponse.json({alredyhaveanreview:true})
    // }
    return NextResponse.json(true);
}

return NextResponse.json(false)

}