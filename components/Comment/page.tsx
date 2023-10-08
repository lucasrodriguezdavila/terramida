import { getCommentById } from "@/utils/comments";
import { useAddressFromLatLng } from "@/utils/geocode";
import React from "react";
import { Address } from "./Address";
import { UserCommentActivity } from "@/utils/comments/client";
import Link from "next/link";
import dayjs from "dayjs";

export default function Comment({ comment }: { comment: UserCommentActivity }) {
  return (
    <Link href={`/evento/${comment.eventId}`}>
      <div className="mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 font-bold">Comment</span>
          <p>
            <span className="text-gray-500 mr-2">
              {dayjs(comment.createdAt).format("DD/MM/YYYY")}
            </span>
          </p>
        </div>
        <p className="mt-2">{comment.comment}</p>
      </div>
    </Link>
  );
}
