import { db } from "@/app/admin.firebase";

export const getOrganizationById = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  const organizationRef = db.collection("organizations").doc(id);

  const organization = await organizationRef.get();

  if (!organization.exists) {
    return null;
  }

  return organization.data();
};
