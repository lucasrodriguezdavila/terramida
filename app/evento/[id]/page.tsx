import { getEventById } from "@/utils/events";
import { getAdressFromLatLng, getReverseGeocode } from "@/utils/geocode";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Address } from "./Address";
import Activity from "./Activity";
import dynamic from "next/dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string | undefined };
}): Promise<Metadata> {
  try {
    return {
      title: `Evento | Terramida`,
    };
  } catch (error) {
    notFound();
  }
}

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default async function Organizacion({
  params: { id },
  searchParams,
}: {
  params: { id: string | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="-z-10 text-gray-400 w-full">
      <div className="container mx-auto py-8">
        <div className="grid z-100  grid-cols-12 gap-6 px-4">
          <div className="col-span-12 md:col-span-4 ">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col text-gray-500 items-center">
                <Address
                  lat={event.initialLatitude}
                  lng={event.initialLongitude}
                />
                <div className="mt-6 flex flex-wrap gap-4 justify-center aspect-square w-full">
                  <Map
                    lat={event.initialLatitude}
                    lng={event.initialLongitude}
                  />
                </div>
              </div>
            </div>
          </div>
          <Activity />
        </div>
      </div>
    </div>
  );
}
