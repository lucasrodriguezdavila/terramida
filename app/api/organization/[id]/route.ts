import { db } from "@/app/admin.firebase";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const orgRef = db.collection("organizations").doc(params.id);
  const orgSnap = await orgRef.get();
  const orgData = orgSnap.data();

  const organization = {
    id: orgSnap.id,
    ...orgData,
  };

  if (!orgSnap.exists) return new Response("No organization", { status: 400 });

  return new Response(JSON.stringify(organization), {
    status: 200,
  });
}
