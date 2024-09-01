import PrismaClient from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
  try {
    PrismaClient.$connect
    const req = await request.json();
    console.log(req)

    const user = await PrismaClient.user.findUnique({
      where: {
        username: req.username
      }
    });


    if(!user) {
      return NextResponse.json(
        { message: "User Not Found." },
        { status: 500 },
      )
    }else if(user.password != req.password) {
      return NextResponse.json(
        { message: "Password Incorrect." },
        { status: 401 }
      )
    } else {
      return NextResponse.json(
        { message: "Login Successd", data: user },
        { status: 200 }
      )
    }
  } finally {
    PrismaClient.$disconnect
  }
}