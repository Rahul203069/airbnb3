import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function POST(request:NextRequest){
    const prisma =new PrismaClient();

    const jsonbody=  await request.json()
    const id=jsonbody.id;
    
    const item = await prisma.listing.findUnique({
        where: {
          id: id
        },
        include: {
          reviews: {
            orderBy: {
              createdat: 'desc', // Orders by creation date in descending order
            },
            take: 4,
            include: {
              user: true, // This will include the associated user for each review
            },
          },
        },
      });

    const users=await prisma.users.findUnique({
        where:{
            id:item?.userid
        },
    
    })
    




    console.log(item);

    
    return Response.json({item,users});
    

}