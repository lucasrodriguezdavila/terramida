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
} from "@/utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePostEvent } from "@/utils/terramida";

const inter = Inter({ subsets: ["latin"] });

const PrivateController = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { mutate: disconnect } = useDisconnect();

  const { data: authUser, isFetching: isFetchingAuthUser } = useAuthUser();
  const { mutate: login } = useSignInWithGoogle();

  const handleLogout = React.useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <>
      <div className="relative h-16 -z-10 bg-slate-100 shadow-2xl border-b-[1px] border-gray-400 p-5 items-center flex">
        <nav className="hidden md:flex ml-auto gap-4">
          <Link
            href="/mapa"
            passHref
            className="py-2 font-bold text-gray-500 cursor-pointer"
          >
            Mapa
          </Link>

          {authUser ? (
            <div
              className="py-2 font-bold text-gray-500 cursor-pointer"
              onClick={handleLogout}
            >
              Cerrar sesion
            </div>
          ) : (
            <div
              className="py-2 font-bold text-gray-500 cursor-pointer"
              onClick={() => login()}
            >
              Iniciar sesion
            </div>
          )}
        </nav>
        <div
          className="ml-auto w-7 grid gap-2 cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className=" w-full h-[3px] bg-gray-900" />
          <div className=" w-full h-[3px] bg-gray-900" />
          <div className=" w-full h-[3px] bg-gray-900" />
        </div>
        {menuOpen && (
          <ul className="fixed right-0 top-16 bg-slate-800 p-4 rounded-bl-md border-l-[0.2px] border-b-[0.2px] border-slate-700 z-50 md:hidden">
            <Link href="/mapa" passHref>
              <li className="py-2 font-bold text-white cursor-pointer">Mapa</li>
            </Link>

            <li
              className="py-2 font-bold text-white cursor-pointer"
              onClick={handleLogout}
            >
              Cerrar sesion
            </li>
          </ul>
        )}
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
