import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 10;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { nameInGame, nameZalo, role, order } = await request.json();

  if (!nameInGame || !nameZalo) {
    return NextResponse.json(
      { message: "Name in game and name Zalo are required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  const user = await User.create({ nameInGame, nameZalo, role, order });

  return NextResponse.json({ message: "User created", user }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();

  const users = await User.find();

  return NextResponse.json(users);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await connectMongoDB();

  await User.findByIdAndDelete(id);

  return NextResponse.json({ message: "User deleted" });
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const { nameInGame, nameZalo, role, order } = await request.json();

  if (!id || !nameInGame || !nameZalo) {
    return NextResponse.json(
      { message: "ID, name in game and name Zalo are required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  await User.findByIdAndUpdate(id, {
    nameInGame,
    nameZalo,
    role,
    order,
  });

  // return updated user
  const updatedUser = await User.findById(id);

  return NextResponse.json({ message: "User updated", user: updatedUser });
}
