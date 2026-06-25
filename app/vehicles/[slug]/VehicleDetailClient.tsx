"use client";

import { VEHICLE_ITEMS, slugifyExplore } from "../../../data/explore";
import ExploreDetail from "../../components/ExploreDetail";

export default function VehicleDetailClient({ slug }: { slug: string }) {
  const item = VEHICLE_ITEMS.find(i => slugifyExplore(i.name) === slug);
  return (
    <ExploreDetail
      item={item}
      backHref="/vehicles"
      backLabel="← Back to Vehicles"
      exploreMoreLabel="🚒 Explore More Vehicles"
      verse="So God created mankind in his own image."
      verseRef="Genesis 1:27"
    />
  );
}