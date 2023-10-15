"use client";

import { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { getReverseGeocode } from "@/utils/geocode/index";
import { getNewsByQuery } from "@/utils/news";
import { useModal } from "@/stores/modals";

const Map = () => {
  const map = useMap();

  const eventModal = useModal((state) => state.eventModal);

  const handleOnClick = useCallback(
    async (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      eventModal.setData({
        lat,
        lng,
      });
    },
    [eventModal]
  );

  useEffect(() => {
    map.setZoom(12);
    map.setView([-31.421631960419607, -64.18899536132814]);

    const yesterdayParsed = new Date();
    yesterdayParsed.setDate(yesterdayParsed.getDate() - 1);
    const yesterday = yesterdayParsed.toISOString().split("T")[0];

    L.tileLayer
      .wms("https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?", {
        layers: "VIIRS_NOAA20_Thermal_Anomalies_375m_Night",
        format: "image/png",
        transparent: true,
        version: "1.1.0",
      })
      .addTo(map);

    L.tileLayer
      .wms("https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?", {
        layers: "VIIRS_NOAA20_Thermal_Anomalies_375m_Day",
        format: "image/png",
        transparent: true,
        version: "1.1.0",
      })
      .addTo(map);

    L.tileLayer
      .wms(
        `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?TIME=${yesterday}T00:00:00Z`,
        {
          layers: "VIIRS_NOAA20_Thermal_Anomalies_375m_Night",
          format: "image/png",
          transparent: true,
          version: "1.1.0",
        }
      )
      .addTo(map);

    L.tileLayer
      .wms(
        `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?TIME=${yesterday}T00:00:00Z`,
        {
          layers: "VIIRS_NOAA20_Thermal_Anomalies_375m_Day",
          format: "image/png",
          transparent: true,
          version: "1.1.0",
        }
      )
      .addTo(map);
  }, [map]);

  useEffect(() => {
    map.addEventListener("click", handleOnClick);

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
