/* 
  This is a very simple register backend system for the prototype. Firstly, the system will check if given username or password is missing. If both or other is missing the system will give error message "Missing username or password". After that the system will check if given username already exist in the database. The comparison is simply made using SELECT command where the username prop is the user given username. If there exist the same username in the database, the system gives a error message "Username already taken". If there are none, the system will hash the password and insert the given username and password into the database. Finally, the system gives a message "user registered successfully" if everything went well. If there are any other errors the system gives a error message "Internal server error".

*/

import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    //Check if given username or password is missing
    if (!username || !password) {
      return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
    }

    // Check if username already exists
    const [existingUsers]: any = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "Username already taken" }, { status: 409 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

    //Return successfull message when new user and password is inserted into the database
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    //Typical error message
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
