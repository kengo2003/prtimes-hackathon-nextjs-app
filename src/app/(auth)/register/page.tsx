import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex justify-center">
        <div className="bg-white mt-12 flex flex-col items-center border p-8">
          <div className="text-xl font-bold w-full text-center">PR TIMES STUDENTにユーザー登録</div>
          <div className="mt-10">
            <div className="font-bold mb-2">ユーザー名</div>
            <Input className="w-[400px] border-2 border-gray-300 rounded placeholder:text-gray-400
                focus-visible:border-sky-600 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0" 
                placeholder='ユーザー名を入力'
                name="username" />
            <div className="font-bold mb-2 mt-8">パスワード</div>
            <Input className="w-[400px] border-2 border-gray-300 rounded placeholder:text-gray-400
                focus-visible:border-sky-600 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0" 
                name="password" />
            <Button className="w-full bg-blue-700 py-8 mt-10 text-white font-bold text-base rounded-lg">メールアドレスで新規登録</Button>
          </div>

        </div>
      </div>
    </div>
  )
}


