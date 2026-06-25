import { VEHICLE_ITEMS, slugifyExplore } from "../../../data/explore";
import VehicleDetailClient from "./VehicleDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return VEHICLE_ITEMS.map(item => ({ slug: slugifyExplore(item.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = VEHICLE_ITEMS.find(i => slugifyExplore(i.name) === slug);
  if (!item) return { title: "Not Found" };
  return { title: item.name, description: item.description };
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <VehicleDetailClient slug={slug} />;
}