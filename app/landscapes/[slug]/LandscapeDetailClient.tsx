"use client";

import { LANDSCAPE_ITEMS, slugifyExplore } from "../../../data/explore";
import ExploreDetail from "../../components/ExploreDetail";

export default function LandscapeDetailClient({ slug }: { slug: string }) {
  const item = LANDSCAPE_ITEMS.find(i => slugifyExplore(i.name) === slug);
  return (
    <ExploreDetail
      item={item}
      backHref="/landscapes"
      backLabel="← Back to Landscapes"
      exploreMoreLabel="🏔️ Explore More Landscapes"
      verse="The earth is the Lord's, and everything in it."
      verseRef="Psalm 24:1"
    />
  );
}