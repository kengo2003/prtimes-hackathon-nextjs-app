import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient()

export async function POST(request: NextRequest) {

  try {
    prisma.$connect
    const req = await request.json()

    const res = await prisma.user.create(
      {
        data: {
          uuid: "aaaaa-bbbbbb-ccccc-ddddd",
          username: req.username, 
          password: req.password,
          profile: {
            profileImageURL: "",
            twitterURL: "",
            facebookURL: "",
            description: ""
          }
        }
      }
    )

    return NextResponse.json(
      { message: res },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { data: err },
      { status: 500 },
    )
  } finally {
    prisma.$disconnect
  }
}