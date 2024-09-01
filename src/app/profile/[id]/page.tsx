// 'use client';

// import { User } from '@/types/userType';
// import axios from 'axios';
// import { useParams, useSearchParams } from 'next/navigation';
// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { RiTwitterXLine } from "react-icons/ri";
// import { FaFacebook } from "react-icons/fa";
// import { RiMailSendLine } from "react-icons/ri";
// import Tooltip from '@/components/profile/toolTip';

// // const profile = {
// //     id: 1,
// //     uuid: 'test',
// //     password: 'test',
// //     article: 'test',
// //     profile: {
// //         username: 'test',
// //         profile_img_url: 'https://sushida.net/',
// //         twitter_url: 'https://x.com/home',
// //         facebook_url: 'https://www.facebook.com/?locale=ja_JP',
// //         description: 'testtest',
// //     }
// // }

// const ProfileDetail: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
  
// //   const searchParams = useSearchParams();
// //   const id = searchParams.get('id');
// //   console.log(id)

//   const { id } = useParams();

//   console.log(id); // ダイナミックルートの id が表示されます

//   const [profile, setProfile] = useState<{
//     username: string;
//     profile: {
//         profileImageURL: string;
//         twitterURL: string;
//         facebookURL: string;
//         description: string;
//     };
//   } | null>(null);


//     useEffect(() => {
//         if (!id) return;
    
//         const getProfile = async () => {
//         try {
//             const res = await axios.get(`/api/users/${id}/profile`);
//             setProfile(res.data.data); // `data` フィールドにアクセス
//         } catch {
//             console.log('error');
//         }
//         };
//         getProfile();
//     }, [id]);

//     const ref = useRef<HTMLDivElement>(null);

//     //   // マウスが乗ったらツールチップを表示
//     // const handleMouseEnter = () => {
//     //     if (!ref.current) return;
//     //     ref.current.style.opacity = "1";
//     //     ref.current.style.visibility = "visible";
//     // };
//     // // マウスが離れたらツールチップを非表示
//     // const handleMouseLeave = () => {
//     //     if (!ref.current) return;
//     //     ref.current.style.opacity = "0";
//     //     ref.current.style.visibility = "hidden";
//     // };

//   if (!profile) {
//     return (
//         <div className="flex items-center justify-center h-screen">
//             <p className="text-3xl font-bold">Loading...</p>
//         </div>
//     )
//   } else {
//       return (
//         <div className="container mx-auto p-4">
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <div className="flex items-center mb-6">
//               <Image
//                 src={profile.profile.profileImageURL}
//                 alt={`${profile.username}のプロフィール画像`}
//                 width={100}
//                 height={100}
//                 className="rounded-full mr-4"
//               />
//               <h1 className="text-2xl font-bold">{profile.username}</h1>
//             </div>
    
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-2">自己紹介</h2>
//               <p>{profile.profile.description}</p>
//             </div>
    
//             <button 
//               className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl"
//               onClick={openModal}
//             >
//               話を聞きに行く
//             </button>
//           </div>

//           <div className="mt-6">
//             <Link href="/" className="text-blue-500 hover:underline">
//               <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl">
//                 Homeに戻る
//               </button>
//             </Link>
//           </div>

//           {/* {isModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                 <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//                 <h2 className="text-2xl font-semibold mb-6">SNSリンク</h2>
//                 <div className="flex justify-around mb-6">
//                     <Link href={profile.profile.twitterURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                       <RiTwitterXLine color="black" size="65px" />
//                     </Link>
//                     <Link href={profile.profile.facebookURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                       <FaFacebook color="black" size="65px" />
//                     </Link>
//                     <Link href={profile.profile.facebookURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                       <RiMailSendLine color="black" size="65px" />
//                     </Link>
//                 </div>
//                 <div className="flex justify-center">
//                     <button 
//                     className="bg-red-500 text-white font-bold py-1 px-2 text-sm rounded shadow-lg hover:shadow-xl"
//                     onClick={closeModal}
//                     >
//                     閉じる
//                     </button>
//                 </div>
//                 </div>
//             </div>
//         )} */}
//         {isModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                 <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//                 <h2 className="text-2xl font-semibold mb-6">SNSリンク</h2>
//                 <div className="flex justify-around mb-6">
//                     <Tooltip text="Twitterで話を聞く">
//                     <Link href={profile.profile.twitterURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                         <RiTwitterXLine color="black" size="65px" />
//                     </Link>
//                     </Tooltip>
//                     <Tooltip text="Facebookで話を聞く">
//                     <Link href={profile.profile.facebookURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                         <FaFacebook color="black" size="65px" />
//                     </Link>
//                     </Tooltip>
//                     <Tooltip text="ここで直接話を聞く">
//                     <Link href={`/`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                         <RiMailSendLine color="black" size="65px" />
//                     </Link>
//                     </Tooltip>
//                 </div>
//                 <div className="flex justify-center">
//                     <button 
//                     className="bg-red-500 text-white font-bold py-1 px-2 text-sm rounded shadow-lg hover:shadow-xl"
//                     onClick={closeModal}
//                     >
//                     閉じる
//                     </button>
//                 </div>
//                 </div>
//             </div>
//         )}
//         </div>
//       );
//   }
// }

// export default ProfileDetail;




'use client';

import { User } from '@/types/userType';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import Tooltip from '@/components/profile/toolTip';

const ProfileDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { id } = useParams();

  const [profile, setProfile] = useState<{
    username: string;
    profile: {
      profileImageURL: string;
      twitterURL: string;
      facebookURL: string;
      description: string;
    };
  } | null>(null);

  useEffect(() => {
    if (!id) return;

    const getProfile = async () => {
      try {
        const res = await axios.get(`/api/users/${id}/profile`);
        setProfile(res.data.data); // data フィールドにアクセス
      } catch {
        console.log('error');
      }
    };
    getProfile();
  }, [id]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-3xl font-bold">Loading...</p>
      </div>
    );
  } else {
    return (
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-6 border-b border-gray-300 pb-4">
              <Image
                src={profile.profile.profileImageURL}
                alt={`${profile.username}のプロフィール画像`}
                width={100}
                height={100}
                className="rounded-full mr-4 border border-gray-300"
              />
              <h1 className="text-2xl font-bold">{profile.username}</h1>
            </div>
      
            <div className="mb-6 border-b border-gray-300 pb-4">
              <h2 className="text-xl font-semibold mb-2">自己紹介</h2>
              <p>{profile.profile.description}</p>
            </div>
      
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl"
              onClick={openModal}
            >
              話を聞きに行く
            </button>
          </div>
      
          <div className="mt-6">
            <Link href="/" className="text-blue-500 hover:underline">
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl">
                Homeに戻る
              </button>
            </Link>
          </div>
      
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-300">
                <h2 className="text-2xl font-semibold mb-6">SNSリンク</h2>
                <div className="flex justify-around mb-6">
                  <Tooltip text="Twitterで話を聞く">
                    <Link href={profile.profile.twitterURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      <RiTwitterXLine color="black" size="65px" />
                    </Link>
                  </Tooltip>
                  <Tooltip text="Facebookで話を聞く">
                    <Link href={profile.profile.facebookURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      <FaFacebook color="black" size="65px" />
                    </Link>
                  </Tooltip>
                  <Tooltip text="ここで直接話を聞く">
                    <Link href="/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      <RiMailSendLine color="black" size="65px" />
                    </Link>
                  </Tooltip>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-red-500 text-white font-bold py-1 px-2 text-sm rounded shadow-lg hover:shadow-2xl"
                    onClick={closeModal}
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    );
      
  }
}

export default ProfileDetail;
