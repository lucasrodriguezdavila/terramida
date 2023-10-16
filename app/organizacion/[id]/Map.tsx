"use client";

import { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useModal } from "@/stores/modals";
import { useParams } from "next/navigation";
import { useOrganization } from "@/utils/organizations/client";

interface Props {
  organization: Organization;
}

const Map: React.FC<Props> = ({ organization }) => {
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
    if (organization?.interestArea) {
      map.setZoom(12);
      map.setView([
        organization.interestArea.latitude,
        organization.interestArea.longitude,
      ]);

      // create a circule with the radius of the interest area where radius is in kilometers
      L.circle(
        [
          organization.interestArea.latitude,
          organization.interestArea.longitude,
        ],
        {
          radius: organization.interestArea.radius * 1000,
        }
      ).addTo(map);
    }
  }, []);

  useEffect(() => {
    map.addEventListener("click", handleOnClick);

    return () => {
      map.removeEventListener("click");
    };
  }, [map, handleOnClick]);

  return <></>;
};

export default function MapDefault() {
  const params = useParams<{ id: string }>();

  const { data: organization, isLoading } = useOrganization(params.id);

  if (!organization?.interestArea || isLoading) return <></>;

  return (
    <div className="w-full h-full flex flex-1">
      <MapContainer
        zoom={12}
        style={{ height: "100%", width: "100%", borderRadius: 12 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Map organization={organization} />
      </MapContainer>
    </div>
  );
}
