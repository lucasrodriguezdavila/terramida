// POST /thermalAnomalies expects a JSON with lat, lng and radius

import { useMutation } from "@tanstack/react-query";
import { useAuthUser } from "../auth";
import { auth } from "@/app/firebase";

const BASE_URL = "https://griffith-koala-gdzd.2.us-1.fl0.io";
const BASE_URL_TEST = "http://localhost:8080";

interface ThermalAnomalyPost {
  lat: number;
  lng: number;
  radius: number;
}

interface ThermalAnomaly {
  latitude: string;
  longitude: string;
  bright_ti4: string;
  scan: string;
  track: string;
  acq_date: string;
  acq_time: string;
  satellite: string;
  instrument: string;
  confidence: string;
  version: string;
  bright_ti5: string;
  frp: string;
  daynight: string;
}

const postThermalAnomalies = async (data: ThermalAnomalyPost) => {
  const res = await fetch(`${BASE_URL}/thermalAnomalies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: data.lat,
      longitude: data.lng,
      radius: data.radius,
    }),
  });
  const json = await res.json();
  return json as ThermalAnomaly[];
};

export const useThermalAnomalies = () => {
  return useMutation((data: ThermalAnomalyPost) => postThermalAnomalies(data));
};

const postEvent = async (data: ThermalAnomalyPost, token: string) => {
  const res = await fetch(`${BASE_URL_TEST}/createEventDTO`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: data.lat,
      longitude: data.lng,
    }),
  });
  const json = await res.json();
  return json;
};

export const usePostEvent = () => {
  return useMutation({
    mutationFn: async (data: ThermalAnomalyPost) => {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("No token provided");
      return postEvent(data, token);
    },
  });
};
