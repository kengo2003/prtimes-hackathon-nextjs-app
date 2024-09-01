// src/app/api/ranking/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { startOfToday, endOfToday } from 'date-fns';
import { startOfWeek, endOfWeek } from 'date-fns';
import { startOfMonth, endOfMonth } from 'date-fns';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const articlesDay = await prisma.article.findMany({
      where: {
        published: true,
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      take: 5
    });

    const articlesWeek = await prisma.article.findMany({
      where: {
        published: true,
        likes: {
          some: {
            createdAt: {
              gte: startOfWeek(new Date(), { weekStartsOn: 1 }), // 月曜日開始
              lte: endOfWeek(new Date(), { weekStartsOn: 1 }),
            }
          }
        }
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      take: 5
    });

    const articlesMonth = await prisma.article.findMany({
      where: {
        published: true,
        likes: {
          some: {
            createdAt: {
              gte: startOfMonth(new Date()),
              lte: endOfMonth(new Date()),
            }
          }
        }
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        likes: {
          _count: 'desc',
        },
      },
      take: 5
    });

    const resultDay = articlesDay.map((article) => ({
      id: article.id,
      slug: article.slug,
      createdAt: article.createdAt,
      published: article.published,
      authorId: article.authorId,
      thumbnailURL: article.thumbnailURL,
      content: article.content,
      title: article.title,
      likeCount: article._count.likes,
    }));

    const resultWeek = articlesWeek.map((article) => ({
      id: article.id,
      slug: article.slug,
      createdAt: article.createdAt,
      published: article.published,
      authorId: article.authorId,
      thumbnailURL: article.thumbnailURL,
      content: article.content,
      title: article.title,
      likeCount: article._count.likes,
    }));

    const resultMonth = articlesMonth.map((article) => ({
      id: article.id,
      slug: article.slug,
      createdAt: article.createdAt,
      published: article.published,
      authorId: article.authorId,
      thumbnailURL: article.thumbnailURL,
      content: article.content,
      title: article.title,
      likeCount: article._count.likes,
    }));

    const resultData = { "day": resultDay, "week": resultWeek, "month": resultMonth }

    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to retrieve articles' }, { status: 500 });
  }
}
