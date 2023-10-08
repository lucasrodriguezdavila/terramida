import { db } from "@/app/admin.firebase";

export const getEventById = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  const organizationRef = db.collection("events").doc(id);

  const organization = await organizationRef.get();

  if (!organization.exists) {
    return null;
  }

  return { ...organization.data(), id: organization.id } as Event;
};
