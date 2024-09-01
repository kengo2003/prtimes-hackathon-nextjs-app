'use client';

import { User } from '@/types/userType';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const profiles = [
  {
    id: 1,
    uuid: 'test1',
    password: 'test',
    article: 'test2',
    profile: {
        username: 'test1',
        profile_img_url: 'https://sushida.net/',
        twitter_url: 'https://x.com/home',
        facebook_url: 'https://www.facebook.com/?locale=ja_JP',
        description: 'testtest',
    }
  },
  {
    id: 2,
    uuid: 'test2',
    password: 'test',
    article: 'test2',
    profile: {
        username: 'test2',
        profile_img_url: 'https://sushida.net/',
        twitter_url: 'https://x.com/home',
        facebook_url: 'https://www.facebook.com/?locale=ja_JP',
        description: 'testtest',
    }
  },
]

const ProfileList: React.FC = () => {

  // const [profiles, setProfiles] = useState<User[]>([]);

  // useEffect(() => {
  //   const getProfiles = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:8000/api/profile/', {
  //         headers: {
            
  //         },
  //       });
  //       setProfiles(res.data);
  //     } catch {
  //       console.log("error");
  //     }
  //   };
  //   getProfiles();
  // },[]);

  if (!profiles) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">プロフィール一覧</h1>
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <Image
                src={profile.profile.profile_img_url}
                alt={`${profile.profile.username}のプロフィール画像`}
                width={100}
                height={100}
                className="rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{profile.profile.username}</h2>
                <Link href={`/profile/${profile.id}`} className="text-blue-500 hover:underline">
                  {profile.profile.username}の詳細ページ
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-6">
          <Link href="/" className="text-blue-500 hover:underline">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl">
              Homeに戻る
            </button>
          </Link>
        </div>
      </div>
    );
  }

}

export default ProfileList;
