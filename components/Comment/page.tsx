import { getCommentById } from "@/utils/comments";
import { useAddressFromLatLng } from "@/utils/geocode";
import React from "react";
import { Address } from "./Address";

export default async function Comment({ id }: { id: string }) {
  /*
  const comment = await getCommentById(id)

  const date = new Date(comment?.date)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const dayOfWeek = date.toLocaleString('default', { weekday: 'short' })
  const formattedDate = `${dayOfWeek} ${day} ${month} -  ${hour}:${minute}:${second} hs`
  */

  //const address=useAddressFromLatLng(-34.9220967, -57.9543474)

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <span className="text-gray-600 font-bold">Comment</span>
        <p>
          <span className="text-blue-300 mr-2">Lun 8 Sep 2023</span>
          <span className="text-gray-300 mr-2"> | </span>
          <span className="text-blue-300">
            <Address lat={-34.9220967} lng={-57.9543474} />
          </span>
        </p>
      </div>
      <p className="mt-2">{id}</p>
    </div>
  );
}
