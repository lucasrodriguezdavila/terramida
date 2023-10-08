import { useQuery } from "@tanstack/react-query";

const getOrganizationById = async (id: string | undefined) => {
  const res = await fetch(`/api/organization/${id}`);
  const json = await res.json();
  return json as Organization;
};

export const useOrganization = (id: string | undefined) => {
  return useQuery<Organization | null, Error>(["organization", id], () =>
    getOrganizationById(id)
  );
};
