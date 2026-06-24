"use client";

import { useEffect, useState } from "react";

interface Props {
  lat: number;
  lng: number;
  animalName: string;
  region: string;
  color: string;
}

export default function HabitatMap({ lat, lng, animalName, region, color }: Props) {
  const [ready, setReady] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    setReady(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          setUserLocation({ lat: userLat, lng: userLng });

          const R = 3958.8;
          const dLat = (userLat - lat) * Math.PI / 180;
          const dLng = (userLng - lng) * Math.PI / 180;
          const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat * Math.PI / 180) *
            Math.cos(userLat * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2;
          const miles = R * 2 * Math.asin(Math.sqrt(a));
          setDistance(miles > 1000
            ? `${Math.round(miles / 100) * 100} miles`
            : `${Math.round(miles)} miles`
          );
        },
        () => {}
      );
    }
  }, [lat, lng]);

  if (!ready) {
    return (
      <div style={{
        height: "280px",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.3)",
        fontSize: "14px",
        fontWeight: 700,
      }}>Loading map...</div>
    );
  }

  const MapEmbed = () => {
    const bbox = `${lng - 20},${lat - 15},${lng + 20},${lat + 15}`;
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

    return (
      <iframe
        src={mapUrl}
        style={{
          width: "100%",
          height: "280px",
          border: "none",
          borderRadius: "16px",
        }}
        title={`${animalName} habitat map`}
      />
    );
  };

  return (
    <div>
      {distance && (
        <div style={{
          background: `${color}22`,
          border: `1px solid ${color}44`,
          borderRadius: "12px",
          padding: "10px 16px",
          marginBottom: "10px",
          fontSize: "14px",
          color: "rgba(255,255,255,0.8)",
          fontWeight: 700,
        }}>
          📍 The nearest wild {animalName} habitat is about <span style={{ color }}>{distance}</span> from you
        </div>
      )}
      <MapEmbed />
    </div>
  );
}