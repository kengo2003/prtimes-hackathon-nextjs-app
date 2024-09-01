import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Article } from "@/types/type";

interface bbDataProps {
  bbData: Article;
}

const BBCard = ({ bbData }: bbDataProps) => {
  const { id, title, content } = bbData;
  //ここでユーザー名を取得して格納する
  const username = "テスト";

  return (
    <div className="mx-auto w-full">
      <Card className="text-black flex">
        <div className="w-1/2">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{username}</CardDescription>
          </CardHeader>
          <CardContent className="w-full">{content}</CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/posts/${id}`} className="text-blue-500">
              Read More
            </Link>
          </CardFooter>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-2/3 h-2/3 bg-slate-900 text-white flex items-center justify-center">
            ここに画像
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BBCard;
