import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string | undefined };
}): Promise<Metadata> {
  try {
    return {
      title: `${params.id} | Terramida`,
    };
  } catch (error) {
    notFound();
  }
}

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>loading...</p>,
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
    <div className=" w-full">
      <Map />
    </div>
  );
}
