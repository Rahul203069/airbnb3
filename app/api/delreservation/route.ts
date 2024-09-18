import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function POST(request:NextRequest){

const prisma=new PrismaClient();
    const body= await request.json()
const{id}= body;

const delet= await prisma.reservation.delete({
 where:{id}
});


return Response.json(delet);
}