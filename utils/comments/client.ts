import { useQuery } from "@tanstack/react-query";

export interface UserCommentActivity {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  eventId: string;
  comment: string;
}

export const getCommentsByUser = async (id: string | undefined) => {
  const res = await fetch(`/api/user/${id}/comments`);

  const data: UserCommentActivity[] = await res.json();

  return data;
};

export const useCommentsByUser = (id: string | undefined) => {
  return useQuery(["comments", id], () => getCommentsByUser(id));
};
