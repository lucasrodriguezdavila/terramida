import { useQuery } from "@tanstack/react-query";
import { getOrganizationById } from ".";

export const useOrganization = (id: string | undefined) => {
  return useQuery<Organization | null, Error>(["organization", id], () =>
    getOrganizationById(id)
  );
};
