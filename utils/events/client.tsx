import { auth } from "@/app/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getEventCommentsByEventId = async (eventId: string | undefined) => {
  if (!eventId) throw Error("Event ID is required");

  const response = await fetch(
    `${window.location.origin}/api/event/${eventId}/comments`
  );

  if (!response.ok) throw Error("Error fetching comments");

  return (await response.json()) as EventComment[];
};

export const useEventComments = (eventId: string | undefined) => {
  return useQuery(
    ["eventComments", eventId],
    () => getEventCommentsByEventId(eventId),
    {
      enabled: !!eventId,
    }
  );
};

interface PostEventCommentProps {
  eventId: string;
  comment: string;
  token: string;
}

const postEventComment = async ({
  eventId,
  comment,
  token,
}: PostEventCommentProps) => {
  const response = await fetch(
    `${window.location.origin}/api/event/${eventId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    }
  );

  if (!response.ok) throw Error("Error posting comment");

  return true;
};

export const usePostEventComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (props: { comment: string; eventId: string }) => {
      const token = await auth.currentUser?.getIdToken();
      return postEventComment({
        ...props,
        token: token || "",
      });
    },
    onSuccess: (_, context) => {
      // invalidate query to refetch comments
      queryClient.invalidateQueries(["eventComments", context.eventId]);
    },
  });
};
