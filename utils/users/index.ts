import { db } from "@/app/admin.firebase";

export const getUserById = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  const userRef = db.collection("users").doc(id);

  const user = await userRef.get();

  if (!user.exists) {
    return null;
  }

  return user.data() as UserData;
};
