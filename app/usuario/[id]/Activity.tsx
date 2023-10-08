"use client";
import Comment from "@/components/Comment/page";
import { useCommentsByUser } from "@/utils/comments/client";
import { useParams } from "next/navigation";
import React from "react";

const Activity = () => {
  const params = useParams<{ id: string }>();

  const { data: comments } = useCommentsByUser(params.id);

  return (
    <>
      {comments?.map((comment) => {
        return (
          <div key={comment.id}>
            <Comment comment={comment} />
          </div>
        );
      })}
    </>
  );
};

export default Activity;
