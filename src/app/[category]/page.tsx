"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
  { name: '総合', categoryName: 'general' },
  { name: '食品', categoryName: "food" },
  { name: 'IT', categoryName: "it" },
  { name: 'ロボット', categoryName: "robot" },
  { name: 'その他', categoryName: "other" },
];

const articles = [
  { id: 1, title: '大学生が開発したAIアプリが話題に', category: 'IT', date: '2024-08-29' },
  { id: 2, title: '食品ロス削減アプリで起業した高校生', category: '食品', date: '2024-08-28' },
  { id: 3, title: '介護ロボットのプロトタイプを発表', category: 'ロボット', date: '2024-08-27' },
];

const rankings = [
  { id: 1, title: '大学生チームが開発した環境配慮型食品がクラウドファンディングで大成功', views: 15000 },
  { id: 2, title: '高校生プログラマーが作成したアプリが10万ダウンロードを突破', views: 12000 },
  { id: 3, title: '中学生が考案した新しいリサイクル方法が特許取得', views: 10000 },
  { id: 4, title: '中学生が考案した新しいリサイクル方法が特許取得', views: 10000 },
  { id: 5, title: '中学生が考案した新しいリサイクル方法が特許取得', views: 10000 },
];

export default function Homepage({ params }: { params: { category: string }}) {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("today");
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentCategory = params.category

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
              {categories.map((category) => (
                <li key={category.name} className="">
                  {
                    currentCategory == category.categoryName
                    ?
                    <Link href={"/" + category.categoryName}>
                      <div className="flex items-center text-[#9ba88d] bg-white hover:text-gray-200 border-b pb-1 pl-4">
                      {category.name}
                      </div>
                    </Link>
                    :
                    <Link href={"/" + category.categoryName}>
                      <div className="flex items-center text-white hover:text-gray-200 border-b pb-1 pl-4">
                      {category.name}
                      </div>
                    </Link>
                  }

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
                <Button variant="outline" onClick={() => setSelectedTimeFrame("today")} className="rounded-none border-gray-400 border-r-0">今日のランキング</Button>
                <Button variant="outline" onClick={() => setSelectedTimeFrame("week")} className="rounded-none border-gray-400">今週のランキング</Button>
                <Button variant="outline" onClick={() => setSelectedTimeFrame("month")} className="rounded-none border-gray-400 border-l-0">今月のランキング</Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              {data?.rankings.map((ranking:Article, index:number) => (
                <Link key={ranking.id} href={"/posts/" + ranking.id}>
                <div className="flex items-center mb-5 mt-2 last:mb-0">
                  <span className="text-2xl font-bold mr-4 mb-4 text-[#9ba88d]">{index + 1}</span>
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
                    <p className="text-sm text-gray-500">{article.content}</p>
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