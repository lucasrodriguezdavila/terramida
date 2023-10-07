"use client";

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
  plus_code: {
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

export const getReverseGeocode = async (lat: number, lng: number) => {
  try {
    console.log({
      key: process.env.NEXT_FIREBASE_PRIVATE_KEY_ID, // This key works for this project only.
    });
    const response = await fromLatLng(lat, lng);
    return response as CoordinatedGeocoded;
  } catch (error) {
    console.error(error);
  }
};
