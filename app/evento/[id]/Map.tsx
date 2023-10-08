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

interface Props {
  lat: number;
  lng: number;
}

const Map: React.FC<Props> = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    map.setZoom(12);
    map.setView([lat, lng]);

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
        "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?TIME=2023-10-07T00:00:00Z",
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
        "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?TIME=2023-10-07T00:00:00Z",
        {
          layers: "VIIRS_NOAA20_Thermal_Anomalies_375m_Day",
          format: "image/png",
          transparent: true,
          version: "1.1.0",
        }
      )
      .addTo(map);
  }, [map, lat, lng]);

  return <></>;
};

export const MinMap: React.FC<Props> = ({ lat, lng }) => {
  return (
    <div className="w-full h-full flex flex-1">
      <MapContainer
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        dragging={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Map lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
};
