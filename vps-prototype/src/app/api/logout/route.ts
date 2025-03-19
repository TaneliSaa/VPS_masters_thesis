/* This is very simple logout api. This basically just clears the cookies by removing their value. It also gives a "Logout succesful message" */ 

import { NextResponse } from "next/server";



export async function POST() {
    //logout message
    const response = NextResponse.json({message: "Logout succesful."});
    //Clear cookies
    response.headers.set("Set-Cookie", "token=; Path=/; HttpOnly; Secure; Max-Age=0");
    
    return response;
    
} 
    
