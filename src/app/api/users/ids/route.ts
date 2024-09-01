import PrismaClient from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  try {
    PrismaClient.$connect

    const user = await PrismaClient.user.findMany({
      select: {
        id: true
      }
    })

    const ids = user.map(item => item.id)

    return NextResponse.json(
      { data: ids }
    )
  } catch (err) {
    return NextResponse.json(
      { data: err },
      { statusText: "Failed"},
    )
  } finally {
    PrismaClient.$disconnect
  }
}