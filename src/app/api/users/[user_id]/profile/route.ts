import PrismaClient from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params: { user_id: string }}) {

  try {
    PrismaClient.$connect
    const user_id = params.user_id

    const user = await PrismaClient.user.findUnique({
      where: {
        id: user_id
      },
      select: {
        username: true,
        profile: true
      }
    });
    // user not found
    if (!user) {
      return NextResponse.json(
        { message: "User Not Found."},
        { statusText: "Failed"},
      )
    } else {
      return NextResponse.json(
        { data: user }
      )
    }
  } catch (err) {
    return NextResponse.json(
      { data: err },
      { statusText: "Failed"},
    )
  } finally {
    PrismaClient.$disconnect
  }
}