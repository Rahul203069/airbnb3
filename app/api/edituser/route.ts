import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const primsa= new PrismaClient();

export async  function POST(request:NextRequest){


const {name,image,email}= await request.json();


try{


const user= await primsa.users.update({


where:{
    email
},
data:{


    username:name,
    image,
}

});



return NextResponse.json(user);



}catch(e){

    return NextResponse.json({error:'oops something went wrong'});
}


}