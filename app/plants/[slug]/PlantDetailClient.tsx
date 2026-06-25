"use client";

import { PLANT_ITEMS, slugifyExplore } from "../../../data/explore";
import ExploreDetail from "../../components/ExploreDetail";

export default function PlantDetailClient({ slug }: { slug: string }) {
  const item = PLANT_ITEMS.find(i => slugifyExplore(i.name) === slug);
  return (
    <ExploreDetail
      item={item}
      backHref="/plants"
      backLabel="← Back to Plants"
      exploreMoreLabel="🌿 Explore More Plants"
      verse="And God said, 'Let the land produce vegetation.'"
      verseRef="Genesis 1:11"
    />
  );
}