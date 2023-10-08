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

  if (!userData?.organizationUID)
    return new Response("No organization", { status: 400 });

  const organizationRef = db
    .collection("organizations")
    .doc(userData.organizationUID);

  const organizationSnap = await organizationRef.get();

  if (!organizationSnap.exists)
    return new Response("No organization", { status: 400 });

  const organization = {
    id: organizationSnap.id,
    ...organizationSnap.data(),
  };

  return new Response(JSON.stringify(organization), {
    status: 200,
  });
}
