/* This is me api which basically is used to see if user is properly logged in. When the user logs in a JWT token is generated and stored in the cookies. The token basically has user data which is in this case id,username and my JWT_SECRET key which I generated via cmd (it is stored in my .env.local ). This data is used in my layout.tsx file where I have a navbar which displays if users are logged in. */


import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function GET(req: Request) {

    try {
        //this splits the token from the cookies
        const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

        //If there is no token in the cookies, give error message
        if (!token) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return NextResponse.json({ user: decoded });
    } catch (error) {
        return NextResponse.json({ message: "Invalid token." }, { status: 401 });
    }
}