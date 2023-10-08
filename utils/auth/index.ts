import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/firebase";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

const provider = new GoogleAuthProvider();

const createUserInDB = async (token: string) => {
  const res = await fetch("/api/user/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const signWithGoogle = async () => {
  const data = await signInWithPopup(auth, provider);
  const token = await data.user?.getIdToken();

  await createUserInDB(token);

  return data;
};

export const useSignInWithGoogle = () => {
  const queryclient = useQueryClient();
  return useMutation(["signWithGoogle"], {
    mutationFn: signWithGoogle,
    onSuccess: async (data) => {
      queryclient.invalidateQueries(["user"]);
    },
  });
};

export const useAuthUser = (): UseQueryResult<User> => {
  const key = ["user"];
  const client = useQueryClient();
  const unsubscribe = React.useRef<any>(null);

  return useQuery({
    queryKey: key,
    staleTime: Infinity,
    async queryFn() {
      unsubscribe.current?.();

      let resolved = false;

      return new Promise((resolve, reject) => {
        unsubscribe.current = auth.onAuthStateChanged((user) => {
          if (!resolved) {
            resolved = true;
            if (key[0] === "user") {
              if (!!user) {
              }
            }
            resolve(user);
          } else {
            client.setQueryData(key, user);
          }
        }, reject);
      });
    },
  });
};

export const useDisconnect = () => {
  return useMutation({
    mutationFn: () => {
      return auth.signOut();
    },
  });
};

export interface User {
  uid: string;
  email: string | undefined;
  displayName: string | undefined;
  photoURL: string | undefined;
  phoneNumber: string | undefined;
  disabled: boolean;
}

const getAllUsers = async () => {
  const res = await fetch("/api/users");
  const data = await res.json();
  return data as User[];
};

export const useAllUsers = () => {
  return useQuery<User[], Error>(["users"], getAllUsers);
};

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

export interface UserData {
  uid: string;
  email: string | undefined;
  displayName: string | undefined;
  photoURL: string | undefined;
  phoneNumber: string | undefined;
  disabled: boolean;

  // custom data
  role: Role;
}

export const getUserData = async (uid: string | undefined) => {
  if (!uid) throw new Error("No uid provided");

  const res = await fetch(`/api/users/${uid}`);
  const data = await res.json();
  return data as UserData;
};

export const usePublicUserData = (uid: string | undefined) => {
  return useQuery<UserData, Error>(
    ["publicUserData", uid],
    () => getUserData(uid),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useUserData = () => {
  const { data: user } = useAuthUser();

  return useQuery<UserData, Error>(["userData", user?.uid], () =>
    getUserData(user?.uid)
  );
};

export const postUserData = async (uid: string, data: Partial<UserData>) => {
  const res = await fetch(`/api/users/${uid}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  return resData as User;
};

export const usePostUserData = (uid: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["userData", uid],
    (data: Partial<UserData>) => postUserData(uid, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userData", uid]);
      },
    }
  );
};
