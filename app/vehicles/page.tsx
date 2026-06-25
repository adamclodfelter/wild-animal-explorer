"use client";

import { VEHICLE_ITEMS } from "../../data/explore";
import ExploreList from "../components/ExploreList";

export default function VehiclesPage() {
  return (
    <ExploreList
      items={VEHICLE_ITEMS}
      title="Vehicle Explorer"
      emoji="🚒"
      subtitle="Built to serve, build, and protect"
      basePath="/vehicles"
      noun="vehicle"
      categoryIcons={{ All: "🚒", "Emergency Vehicles": "🚨", "Construction Vehicles": "🏗️" }}
    />
  );
}