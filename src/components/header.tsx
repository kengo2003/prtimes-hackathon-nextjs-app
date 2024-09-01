"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";

const RichHeader = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const userId = localStorage.getItem("userId");

  //ログイン状態を取得
  useEffect(() => {
    console.log("log:", userId);
    if (userId) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userId]);

  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6">
        <Link href="/" className="text-3xl font-extrabold">
          PRTIMES_STUDENT
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-4">
            <Link
              className="bg-white text-blue-600 py-2 px-4 rounded-md transition duration-300"
              href="/"
            >
              {/* ページ未作成 */}
              サービスについて
            </Link>
            <Link
              className="bg-white text-blue-600 py-2 px-4 rounded-md transition duration-300"
              href="/posts/create"
            >
              新規投稿
            </Link>
          </nav>
          {/* ログイン状態でアイコンを変更 */}
          {isLogin ? (
            <div className="relative">
              <Link href={`/profile/${userId}`}>
                <UserCircleIcon className="h-10 w-10 cursor-pointer" />
              </Link>
            </div>
          ) : (
            <div className="relative">
              <Link href="/login">
                <ArrowLeftEndOnRectangleIcon className="h-10 w-10 cursor-pointer" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default RichHeader;
