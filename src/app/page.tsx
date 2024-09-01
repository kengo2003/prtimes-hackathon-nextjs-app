"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

type Data = {
  rankings: any;
  articles: any;
};

interface Article {
  id: string
  slug: number,
  createdAt: string,
  published: boolean,
  authorId: string,
  thumbnailUrl: string,
  content: string,
  title: string,
  likeCount: number
}

const categories = [
  { name: '食品', categoryName: "food" },
  { name: 'IT', categoryName: "it" },
  { name: 'ロボット', categoryName: "robot" },
  { name: 'その他', categoryName: "other" },
];

const timeFrames = ['1時間以内', '今日', '今週', '今月'];

export default function Homepage() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0]);
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + '...';
  }

  useEffect(() => {
    // データを非同期で取得
    const fetchData = async () => {
      try {
        const [rankingRes, articlesRes] = await Promise.all([
          fetch('/api/ranking'),
          fetch('/api/articles?max=20&isPublishe=true'),
        ]);

        if (!rankingRes.ok || !articlesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const rankings = await rankingRes.json();
        const articles = await articlesRes.json();

        setData({
          rankings,
          articles,
        });
        setIsLoading(false)
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []); // 空の依存配列で、ページロード時に一度だけ実行

  if (isLoading) {
    return (
      <div>test</div>
    )
  } else {
    return (
      <div className="flex min-h-screen bg-white text-gray-800">
        {/* サイドバー */}
        <div className="w-64 bg-[#9ba88d] pt-6">
          <nav>
            <ul>
              <li className="">
                  <Link href="/general">
                  <div className="flex items-center text-[#9ba88d] bg-white hover:text-gray-200 border-b pb-1 pl-4">
                  総合
                  </div>
                  </Link>
              </li>
              {categories.map((category) => (
                <li key={category.name} className="">
                    <Link href={"/" + category.categoryName}>
                    <div className="flex items-center text-white hover:text-gray-200 border-b pb-1 pl-4">
                    {category.name}
                    </div>
                    </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
  
        {/* メインコンテンツ */}
        <div className="flex-1 p-8">
          {/* ランキング */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">ランキング</h2>
              <div className="relative">
                <select
                  value={selectedTimeFrame}
                  onChange={(e) => setSelectedTimeFrame(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:border-[#9ba88d]"
                >
                  {timeFrames.map((timeFrame) => (
                    <option key={timeFrame} value={timeFrame}>
                      {timeFrame}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              {data?.rankings["day"].map((ranking:Article, index:number) => (
                <Link key={ranking.id} href={"/posts/" + ranking.id}>
                <div className="flex items-center mb-4 last:mb-0">
                  <span className="text-2xl font-bold mr-4 text-[#9ba88d]">{index + 1}</span>
                  <div className="border-b w-full">
                    <h3 className="font-semibold">{ranking.title}</h3>
                    <p className="text-sm text-gray-500">{ranking.likeCount.toLocaleString()} likes</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
  
          {/* 新着記事 */}
          <div>
            <h2 className="text-2xl font-bold mb-4">新着記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.articles.map((article:Article) => (
                <Link key={article.id} href={"/posts/" + article.id}>
                <div className="bg-white rounded-lg border-0 hover:border shadow-md overflow-hidden max-h-[220px] h-full">
                  <div className="p-6">
                    <span className="inline-block bg-[#9ba88d] text-white text-xs px-2 py-1 rounded-full mb-2">
                      test
                    </span>
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-500">{truncateString(article.content, 100)}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}