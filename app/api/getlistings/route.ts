import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client"; 


export async function POST(request:NextRequest) {
    

    const body= await request.json();

    const {email,name}=body

    const prisma= new PrismaClient();

    const user:any=await prisma.users.findUnique({where:{email}})
   
    const listings=await prisma.listing.findMany({
        where:{userid:user.id}
    })


    return Response.json(listings);


}