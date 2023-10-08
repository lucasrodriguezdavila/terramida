import Loading from "@/components/Loading";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { FadeLoader } from "react-spinners";

export async function generateMetadata({
  params,
}: {
  params: { id: string | undefined };
}): Promise<Metadata> {
  try {
    return {
      title: `Map | Terramida`,
    };
  } catch (error) {
    notFound();
  }
}

const Map = dynamic(() => import("./Map"), {
  loading: () => <Loading />,
  ssr: false,
});

export default async function Mapa({
  params: { id },
  searchParams,
}: {
  params: { id: string | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className=" flex-1 -z-10">
      <Map />
    </div>
  );
}
