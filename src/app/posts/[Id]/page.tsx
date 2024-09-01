import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Article } from "@/types/type";
import { Button } from "@/components/elements/button";
import { getDetailData } from "@/actions/post";
import { deleteBB } from "@/actions/post";
import { HeartIcon } from "@heroicons/react/16/solid";
import { ClientContent } from "@/components/ui/client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { marked } from "marked";

const DetailPage = async ({ params }: { params: { Id: number } }) => {
  const data = await getDetailData(params.Id);

  //Loding画面
  if (!data) {
    return (
      <div>
        <div className="font-bold text-2xl text-black text-center pt-32">
          Loading...
        </div>
      </div>
    );
  }

  // Markdown を HTML に変換
  const formattedContent = marked(data.content);
  const { id, title, content } = data;

  return (
    <div className="mx-auto w-full max-w-4xl p-10 border border-gray-300 bg-white mt-10 text-gray-900">
      <div className="flex">
        <div className="w-11/12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{title}</h1>
            {/* <p>{username}</p> */}
          </div>
          <div className="mb-8">
            <p dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </div>
        </div>
        <div className="w-1/12">
          <HeartIcon />
        </div>
      </div>
      <div className="w-full flex text-white pt-20">
        <div className="w-full">
          <Link href={"/"}>
            <Button className="w-1/4 bg-blue-500">戻る</Button>
          </Link>
        </div>
        <div className="w-full text-right">
          <Link href={`/edit/${id}`}>
            <Button className="w-1/4 bg-slate-500 p-5">
              <PencilSquareIcon />
              <p>編集</p>
            </Button>
          </Link>
          <ClientContent
            paramsId={params.Id}
            className="ml-8 w-1/4 bg-red-600 border-slate-500 p-5"
          >
            <TrashIcon />
            <p>削除</p>
          </ClientContent>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
