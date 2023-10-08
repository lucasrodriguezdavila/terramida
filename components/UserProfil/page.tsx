import React from 'react'

export default function UserProfil({ userName, imgUrl, subtitle}:{ userName:string, imgUrl:string, subtitle:string}) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={imgUrl}
        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
      />
      <h1 className="text-xl font-bold">{userName}</h1>
      <p className="text-gray-600">{subtitle}</p>

    </div>
  )
}
