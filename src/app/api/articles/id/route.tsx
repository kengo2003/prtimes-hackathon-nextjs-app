import PrismaClient from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  try {
    PrismaClient.$connect

    const articles = await PrismaClient.article.findMany({
      where: {  
        published: true
      },
      select: {
        id: true
      }
    })

    const ids = articles.map(item => item.id)

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