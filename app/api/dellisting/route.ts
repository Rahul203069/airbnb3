import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest } from "next/server";
import { TbReceiptEuro } from "react-icons/tb";
import { NextResponse } from "next/server";

import { ObjectId } from "mongoose";
const prisma= new PrismaClient();

export async function POST(request:NextRequest){
    
    const {id}= await request.json();
    
    try{
        
    
    console.log(id);

   const del = await prisma.listing.delete({
        where:{id:id}
    });

    console.log(del)
    
    return NextResponse.json(del);

}catch(e){ console.log(e); return NextResponse.json({error:'something went wrong'})}


return Response.json({error:"something went wrong"});

}