"use client";

import { PLANT_ITEMS } from "../../data/explore";
import ExploreList from "../components/ExploreList";

export default function PlantsPage() {
  return (
    <ExploreList
      items={PLANT_ITEMS}
      title="Plant Explorer"
      emoji="🌿"
      subtitle="Every plant declares His wisdom"
      basePath="/plants"
      noun="plant"
      categoryIcons={{ All: "🌿", Flowers: "🌸", Trees: "🌳", "Carnivorous Plants": "🪴", Fungi: "🍄" }}
    />
  );
}