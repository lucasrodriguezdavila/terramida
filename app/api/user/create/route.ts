//https://news.google.com/rss/search?q=incendios+cordoba
import { admin, db } from "@/app/admin.firebase";
import { Timestamp } from "firebase-admin/firestore";
import convert from "xml-js";
import { faker } from "@faker-js/faker";

export async function POST(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return new Response("No token", { status: 400 });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const userRef = db.collection("users").doc(decodedToken.uid);
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      return new Response("User already exists", { status: 203 });
    }

    const user = {
      description: "Usuario de Terramida",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      imageProfile: faker.image.avatar(),
      username: faker.internet.userName(),
    };

    await db.collection("users").doc(decodedToken.uid).set(user);

    return new Response(
      JSON.stringify({
        message: "User created",
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
