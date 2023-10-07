import { db } from "@/app/admin.firebase";

export async function GET(req: Request) {
  // Extract the `messages` from the body of the request

  const usersRef = await db.collection("users").get();

  const users = usersRef.docs.map((doc) => doc.data());

  return new Response(
    JSON.stringify({
      message: "pong",
      users: users,
    }),
    {
      status: 200,
    }
  );

  // Request the OpenAI API for the response based on the prompt
}
