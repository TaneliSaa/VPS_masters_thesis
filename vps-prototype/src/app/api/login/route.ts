/*
    This is the login api for the system. This is very simple implementation of a login. If users dont give a username or password, there will be error message
    missing username or password. If both are correctly given, the system makes SELECT command to the SQL database with the username first. If username is not found in the database, the system gives error message "invalid username or password". If the there are existing username what was given, then it will check password next. The same goes if that password is not found with that username, it gives same error message. If both username and password is correctly found in the database, system gives a "login succesfull" message. If there are any other problems, system will give "internal server error" message. 
*/



import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    //Check if username or password is missing
    if (!username || !password) {
      return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
    }

    //Find given username in the database
    const [rows]: any = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    //Check if given given username exist in the database
    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid username" }, { status: 401 });
    }

    //The given and found username in the database
    const user = rows[0];

    //Check if given password match with the username
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({message: "Login successful!"});
    response.headers.set(
      "Set-cookie",
      `token=${token}; path=/; HttpOnly; Secure; Max-Age=3600`
    );

    //Return successfull login message when given username and password matched with the database
    return response;

  } catch (error) {
    //Typical error message if something went wrong
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
