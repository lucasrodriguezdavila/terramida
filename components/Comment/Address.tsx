"use client";
import { useAddressFromLatLng } from "@/utils/geocode";
import React from "react";

interface Props {
  lat: number;
  lng: number;
}

export const Address: React.FC<Props> = ({ lat, lng }) => {
  const { data: address } = useAddressFromLatLng(lat, lng);
  return <>{address?.address}</>;
};
