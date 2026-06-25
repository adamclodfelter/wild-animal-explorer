"use client";

import { LANDSCAPE_ITEMS } from "../../data/explore";
import ExploreList from "../components/ExploreList";

export default function LandscapesPage() {
  return (
    <ExploreList
      items={LANDSCAPE_ITEMS}
      title="Landscape Explorer"
      emoji="🏔️"
      subtitle="The earth is the Lord's, and everything in it"
      basePath="/landscapes"
      noun="landscape"
      categoryIcons={{ All: "🏔️", Mountains: "🏔️", Forests: "🌳", Deserts: "🏜️", Ocean: "🌊", Waterfalls: "💧", Canyons: "🏜️", Biomes: "❄️", Wilderness: "🌲", "Geological Wonders": "🌋" }}
    />
  );
}