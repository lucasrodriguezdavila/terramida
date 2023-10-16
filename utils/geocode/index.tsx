"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEOCODER as string;

export const getAdressFromLatLng = async (
  lat: number | undefined,
  lng: number | undefined
) => {
  if (!lat || !lng) throw new Error("No address found");

  const geocoder = new google.maps.Geocoder();

  const geocode = await new Promise<google.maps.GeocoderResult[] | null>(
    (resolve) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status !== "OK") {
          return resolve(null);
        }

        return resolve(results);
      });
    }
  );

  if (!geocode) throw new Error("No address found");
  if (geocode?.length === 0) throw new Error("No address found");

  const address = geocode[0].formatted_address;
  return address;
};

export const useAddressFromLatLng = (
  lat: number | undefined,
  lng: number | undefined
) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  return useQuery(["address-from-lat-lng", lat, lng], {
    queryFn: () => {
      if (!isLoaded) return undefined;
      return getAdressFromLatLng(lat, lng);
    },
    enabled: !!lat && !!lng,
    staleTime: Infinity,
  });
};
