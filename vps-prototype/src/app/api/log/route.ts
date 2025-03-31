/* This is api for the activity log. This checks if required fields are given to the activity log which are user_id, type, message, timestamp, and simulation_id. If any of the fields are missing or are unidentified, it gives a error message "Missing required fields" and also prints every field to help the debugging. If every field are given correctly, it will insert them into the database and give a response "Log entry saved". */

import { NextResponse } from "next/server";
import db from "@/app/lib/db"

export async function POST(req: Request) {

    try {
        const { user_id, type, message, timestamp, simulation_id } = await req.json();
        //Check that fields are not missing
        if (!user_id || !type || !message || !timestamp || !simulation_id) {
            return NextResponse.json({ message: "Missing required fields" + user_id + type + message + timestamp + simulation_id }, { status: 400 });
        }
        //If all fields are given correctly, insert them into the database
        await db.execute(
            "INSERT INTO activity_logs (user_id, type, message, timestamp, simulation_id) VALUES (?,?,?,?,?)",
            [user_id, type, message, timestamp, simulation_id]
        );
        //Return positive message if logs are saved into the database
        return NextResponse.json({ message: "Log entry saved" }, { status: 201 })
    } catch (error) {
        console.error("Error saving log entry: ", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
} 