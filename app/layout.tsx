"use client";
import Modals from "@/components/modals";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/utils/Provider";
import React from "react";
import {
  useAuthUser,
  useDisconnect,
  useSignInWithGoogle,
  useUserData,
  useUserOrganization,
} from "@/utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePostEvent } from "@/utils/terramida";
import { useOrganization } from "@/utils/organizations/client";
import { Menu } from "@headlessui/react";

const inter = Inter({ subsets: ["latin"] });

const PrivateController = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { mutate: disconnect } = useDisconnect();

  const { data: authUser, isFetching: isFetchingAuthUser } = useAuthUser();
  const { mutate: login } = useSignInWithGoogle();

  const { data: myOrganization } = useUserOrganization(authUser?.uid);

  const handleLogout = React.useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <>
      <div className="relative h-16 z-0 bg-slate-100 shadow-xl border-b-[1px] border-gray-400 p-5 items-center flex">
        <nav className="hidden md:flex ml-auto gap-4">
          <Link
            href="/mapa"
            passHref
            className="py-2 font-bold text-gray-500 cursor-pointer"
          >
            Map
          </Link>

          {authUser ? (
            <Link
              href={`/usuario/${authUser.uid}`}
              passHref
              className="py-2 font-bold text-gray-500 cursor-pointer"
            >
              My Profile
            </Link>
          ) : null}

          {myOrganization ? (
            <Link
              href={`/organizacion/${myOrganization.id}`}
              passHref
              className="py-2 font-bold text-gray-500 cursor-pointer"
            >
              My organization
            </Link>
          ) : null}

          {authUser ? (
            <div
              className="py-2 font-bold text-gray-500 cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </div>
          ) : (
            <div
              className="py-2 font-bold text-gray-500 cursor-pointer"
              onClick={() => login()}
            >
              Log in
            </div>
          )}
        </nav>
        <Menu>
          <Menu.Button className="ml-auto md:hidden">
            <div
              className="w-7 grid gap-2 cursor-pointer "
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className=" w-full h-[3px] bg-gray-700" />
              <div className=" w-full h-[3px] bg-gray-700" />
              <div className=" w-full h-[3px] bg-gray-700" />
            </div>
          </Menu.Button>
          <Menu.Items className="list-none flex flex-col gap-4  absolute right-0 top-16 bg-slate-200 border border-slate-300 px-3 py-4 bottom-0 rounded-bl-lg h-fit text-right text-slate-600 pb-6 pl-4">
            <Menu.Item>
              {({ active }) => (
                <Link href="/mapa" passHref>
                  <li className=" font-bold  cursor-pointer">Map</li>
                </Link>
              )}
            </Menu.Item>

            {authUser ? (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/usuario/${authUser.uid}`}
                    passHref
                    className=" font-bold  cursor-pointer"
                  >
                    My Profile
                  </Link>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <li
                    className=" font-bold  cursor-pointer"
                    onClick={() => login()}
                  >
                    Log in
                  </li>
                )}
              </Menu.Item>
            )}

            {myOrganization ? (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/organizacion/${myOrganization.id}`}
                    passHref
                    className=" font-bold  cursor-pointer"
                  >
                    My organization
                  </Link>
                )}
              </Menu.Item>
            ) : null}
          </Menu.Items>
        </Menu>
      </div>

      {children}
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen max-w-screen flex">
      <body
        className={`flex-1 flex-col z-0 flex bg-gray-100 text-gray-400 ${inter.className}`}
      >
        <Provider>
          <PrivateController>{children}</PrivateController>
          <Modals />
        </Provider>
      </body>
    </html>
  );
}
