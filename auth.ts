

// @ts-nocheck


import Users from "./app/models/Signup";
import NextAuth from "next-auth"
import { connectToDatabase } from "./lib/mongoose";
import bcrypt from 'bcrypt'

import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();




export const {handlers}= NextAuth({
    
  providers: [
    GoogleProvider({
        clientId: "46452253666-rfd5vgji7idi3875vmahml1a0brtj78c.apps.googleusercontent.com",
        clientSecret:"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",
    
         // Example URI
    }),


    Credentials({
      credentials: {
        email: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },

        authorize:async (credentials) => {

   console.log(credentials);
      


        // logic to verify if the user exists
        const user=await prisma.users.findFirst({where:{email:credentials.email}})
    
         
         const plainPassword = credentials.password;
         console.log(plainPassword);
         // Hashed password stored in the database
         const hashedPassword = user.hashedpassword
         console.log(user);
        console.log(hashedPassword);
        // Compare the plain password with the hashed password
  
         console.log(plainPassword);
         const isvalid=await bcrypt.compare(plainPassword, hashedPassword);
      
        console.log(isvalid)

        
  if(isvalid){
console.log(user)

    return {email:user.email,name:user.username ,userid:user._id,verified:user.verified,image:user.image}

  }
  
  
    
       else{



         return null

       }





      
  

      
      
      
      
      
      
      },
    
    }),


    

  ],secret:"mxckwdcxwmxck", session: {
    strategy: 'jwt', // Use 'jwt' if you are using JWT for session management
    maxAge: 60 * 60 * 24 * 7, // Session will expire after 7 days
    updateAge: 24 * 60 * 60,  // Optional, the session is updated every 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // JWT token expires after 7 days
  },
  
  pages: {
    signIn: "/login" // Custom sign-in Page
   , newUser: '/'
   ,signOut:'/login'
  },

  
 callbacks:{

    async signIn(credentials) {


      if(credentials.account.provider==="google"){



        try{

        const userexist= await prisma.users.findFirst({where:{email:credentials.user.email}});

 if(!userexist){
                console.log("hello");
  console.log(userexist);
  
            const user= await prisma.users.findFirst({data:{email:credentials.user.email,username:credentials.user.name,verified:true,image:credentials.user.image}})}
         
            return true
            
          }catch(e){console.log(e)}

          return true

      }

return true

      }


//         try{
// console.log(user.email)
//             await connectToDatabase();
//             const userexist= await User.findOne({email:user.email});
//             if(!userexist){
//                 console.log("hello");
//   console.log(userexist);
//   const{email,name}=user
//             const test= await User.create({email,username:name,verified:true,})}
//             return true
            
//           }catch(e){console.log(e)}
        
      
// ,\


,async session({ session, user, token }) {
  try{

    if (token && token.email) {
      // Fetch the user from the database using Prisma
      const userFromDb = await prisma.users.findFirst({
        where: { email: token.email },
        select: { image: true }, // Only select the `image` field if that's all you need
      });
      
      // If a user is found, update the session
      if (userFromDb) {
        session.user.image = userFromDb.image;
      }
      
      // Update the session with the token information
      session.accessToken = token.accessToken
      session.user.id = token.id
      
      session.user.name = token.name;
      session.user.email = token.email;
    }}
    catch(e){
      session.user.image=user.image;
      session.user.name = token.name;
      session.user.email = token.email;

  }
return session

},


     async redirect({ url, baseUrl }) {
        console.log(url)
        console.log(baseUrl)
        return baseUrl

         // // Allows relative callback URLs
         // if (url.startsWith("/")) return `${baseUrl}${url}`
         // // Allows callback URLs on the same origin
         // else if (new URL(url).origin === baseUrl) return url
         // return baseUrl


      }

}
  
})


