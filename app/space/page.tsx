"use client";

import { SPACE_ITEMS } from "../../data/explore";
import ExploreList from "../components/ExploreList";

export default function SpacePage() {
  return (
    <ExploreList
      items={SPACE_ITEMS}
      title="Space Explorer"
      emoji="🚀"
      subtitle="The heavens declare the glory of God"
      basePath="/space"
      noun="object"
      categoryIcons={{ All: "🌌", Planets: "🪐", Stars: "⭐", Moons: "🌕", Galaxies: "🌌", Phenomena: "✨", Spacecraft: "🚀" }}
    />
  );
}