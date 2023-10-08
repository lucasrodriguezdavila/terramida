import React from 'react'

export default function DescriptionUser({title, description}:{title:string, description:string}) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-600 uppercase font-bold tracking-wider mb-2 text-center">
        {title}
      </span>
      <p className="text-gray-700 text-center">
        {description}
      </p>
    </div>
  )
}
