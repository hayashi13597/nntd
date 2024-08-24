import { dataTypes } from "@/app/page";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 10;
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  // get array of users from request body
  const users = await request.json();

  // connect to MongoDB
  await connectMongoDB();

  try {
    // update all users in the array
    await Promise.all(
      users.map(async (user: dataTypes) => {
        await User.findByIdAndUpdate(user._id, user);
      })
    );
    return NextResponse.json({ message: "Update successfully", users });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
