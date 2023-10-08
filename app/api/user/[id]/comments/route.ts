//https://news.google.com/rss/search?q=incendios+cordoba
import { admin, db } from "@/app/admin.firebase";
import { Timestamp } from "firebase-admin/firestore";
import convert from "xml-js";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userRef = db.collection("users").doc(params.id);
  const userSnap = await userRef.get();
  const userData = userSnap.data();

  const user = {
    id: userSnap.id,
    ...userData,
  };

  if (!userSnap.exists) return new Response("No user", { status: 400 });

  // Extract the `messages` from the body of the request
  const commentsRef = db
    .collectionGroup("comments")
    .where("user", "==", params.id);

  const commentsSnap = await commentsRef.get();

  let comments: any[] = [];

  await Promise.all(
    commentsSnap.docs.map(async (doc) => {
      let comment = {
        id: doc.id,
        createdAt: doc.createTime.toDate().toISOString(),
        updatedAt: doc.updateTime.toDate().toISOString(),
        user,

        ...(doc.data() as any),
      };

      comments.push(comment);
    })
  );

  return new Response(JSON.stringify(comments), {
    status: 200,
  });
}
