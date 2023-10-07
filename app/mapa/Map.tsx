"use client";

import { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { getReverseGeocode } from "@/utils/geocode/index";
import { getNewsByQuery } from "@/utils/news";

const Map = () => {
  const map = useMap();

  const handleOnClick = useCallback(async (event: L.LeafletMouseEvent) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    const geocode = await getReverseGeocode(lat, lng);
    // get address by splitting addres in the first space
    const results = geocode?.plus_code.compound_code.split(" ");
    console.log({ results });
    const address = results?.slice(1).join(" ");
    console.log(address);

    if (!address) return;

    const news = await getNewsByQuery("incendios " + address);
    console.log(news);
  }, []);

  useEffect(() => {
    map.addEventListener("click", handleOnClick);
    map.setZoom(12);
    map.setView([-33.4372, -70.6506]);
    L.tileLayer
      .wms("https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?", {
        layers: "VIIRS_NOAA20_Thermal_Anomalies_375m_All",
        format: "image/png",
        transparent: true,
      })
      .addTo(map);

    return () => {
      map.removeEventListener("click");
    };
  }, [map, handleOnClick]);

  return <></>;
};

export default function MapDefault() {
  return (
    <div className="w-full h-full flex flex-1">
      <MapContainer zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Map />
      </MapContainer>
    </div>
  );
}
