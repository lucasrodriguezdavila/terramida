import { db } from "@/app/admin.firebase";

export const getCommentById = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  const commentRef = db.collection("comments").doc(id)

  const comment = await commentRef.get();

  if (!comment.exists) {
    return null;
  }

  return comment.data();
};