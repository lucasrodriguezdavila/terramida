"use client";

import { useQuery } from "@tanstack/react-query";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
  OutputFormat,
} from "react-geocode";

setDefaults({
  key: "AIzaSyC9lEkDIdufRmq0CQo7uqN1GzGI9olb6Nc", // This key works for this project only.
  language: "es", // Default language for responses.
  region: "es", // Default region for responses.
  outputFormat: OutputFormat.JSON,
});

interface CoordinatedGeocodedResult {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    bounds: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  types: string[];
}

interface CoordinatedGeocoded {
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  results: CoordinatedGeocodedResult[];
}

export const getGeocode = async (address: string) => {
  try {
    const response = await fromAddress(address);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getReverseGeocode = async (
  lat: number | undefined,
  lng: number | undefined
) => {
  try {
    if (!lat || !lng) return;

    const response = await fromLatLng(lat, lng);

    return response as CoordinatedGeocoded;
  } catch (error) {
    console.error(error);
  }
};

const stringHasNumber = (string: string) => {
  return /\d/.test(string);
};

export const getAdressFromLatLng = async (
  lat: number | undefined,
  lng: number | undefined
) => {
  try {
    if (!lat || !lng) throw new Error("No address found");

    const geocode = await getReverseGeocode(lat, lng);
    // get address by splitting addres in the first space

    if (!geocode?.plus_code.compound_code) {
      // find the first result where formatted_address has something after the first space
      let address: string = "";
      geocode?.results.map((result) => {
        if (address) return;

        const results = result?.formatted_address?.split(" ");

        if (results.length === 1 && stringHasNumber(results[0])) return false;

        if (stringHasNumber(results[0])) address = results?.slice(1).join(" ");

        if (!stringHasNumber(results[0])) address = results?.slice(0).join(" ");
      });

      if (!address) throw new Error("No address found");

      return address;
    }
    const results = geocode?.plus_code.compound_code?.split(" ");

    let address: string = "";
    if (stringHasNumber(results[0])) address = results?.slice(1).join(" ");

    return address;
  } catch (error) {
    throw new Error("No address found");
  }
};

export const useReverseGeocode = (
  lat: number | undefined,
  lng: number | undefined
) => {
  return useQuery(["reverse-geocode", lat, lng], {
    queryFn: () => getReverseGeocode(lat, lng),
    enabled: !!lat && !!lng,
  });
};

export const useAddressFromLatLng = (
  lat: number | undefined,
  lng: number | undefined
) => {
  return useQuery(["address-from-lat-lng", lat, lng], {
    queryFn: () => getAdressFromLatLng(lat, lng),
    enabled: !!lat && !!lng,
  });
};
