//https://news.google.com/rss/search?q=incendios+cordoba
import { admin, db } from "@/app/admin.firebase";
import { Timestamp } from "firebase-admin/firestore";
import convert from "xml-js";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Extract the `messages` from the body of the request
  const eventRef = db.collection("events").doc(params.id);

  const eventSnap = await eventRef.get();

  if (!eventSnap.exists) return new Response("No event", { status: 400 });

  const commentsRef = db
    .collection("events")
    .doc(params.id)
    .collection("comments");

  const commentsSnap = await commentsRef.get();

  const comments = await Promise.all(
    commentsSnap.docs.map(async (doc) => {
      console.log(doc.data());
      let comment = {
        id: doc.id,
        createdAt: doc.createTime.toDate().toISOString(),
        updatedAt: doc.updateTime.toDate().toISOString(),

        ...(doc.data() as any),
      };

      if (comment.user) {
        const userRef = db.collection("users").doc(comment.user);
        const userSnap = await userRef.get();
        if (userSnap.exists) {
          const userData = userSnap.data();

          const user = {
            id: userSnap.id,
            ...userData,
          };
          comment.user = user;
        }
      }

      if (comment.validator) {
        const validatorOrganizationRef = db
          .collection("organizations")
          .doc(comment.validator);
        const validatorOrganizationSnap = await validatorOrganizationRef.get();

        if (validatorOrganizationSnap.exists) {
          const validatorOrganizationData = validatorOrganizationSnap.data();

          const validatorOrganization = {
            id: validatorOrganizationSnap.id,
            ...validatorOrganizationData,
          };
          comment.validator = validatorOrganization;
        }
      }
      return comment;
    })
  );

  return new Response(JSON.stringify(comments), {
    status: 200,
  });
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return new Response("No token", { status: 400 });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const eventRef = db.collection("events").doc(params.id);

    const eventSnap = await eventRef.get();

    if (!eventSnap.exists) return new Response("No event", { status: 400 });

    const body = await req.json();

    const comment = body.comment;

    const commentsRef = eventRef.collection("comments");

    await commentsRef.add({
      comment: comment,
      eventId: params.id,
      user: decodedToken.uid,
    });

    return new Response(
      JSON.stringify({
        message: "Comment created",
      }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 400 }
    );
  }
}
