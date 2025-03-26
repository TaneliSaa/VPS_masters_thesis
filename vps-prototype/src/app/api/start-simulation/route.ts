/*This is API for the simulation start. This adds a new entry into simulations table with user_id and created at field. This will come handy in the feedback page. */

import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  const { user_id } = await req.json();

  //Check if the user_id is missing
  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  //Save the current timestamp
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  //Insert the entry into database
  const [result]: any = await db.query(
    "INSERT INTO simulations (user_id, created_at) VALUES (?, ?)",
    [user_id, timestamp]
  );

  const simulation_id = result.insertId;

  return NextResponse.json({ simulation_id });
}
