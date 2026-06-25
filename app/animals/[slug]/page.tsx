import { ANIMALS, slugify } from "../../../data/animals";
import AnimalPageClient from "./AnimalPageClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return ANIMALS.map((animal) => ({
    slug: slugify(animal.name),
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const animal = ANIMALS.find((a) => slugify(a.name) === slug);

  if (!animal) {
    return { title: "Animal Not Found" };
  }

  return {
    title: animal.name,
    description: `${animal.name} (${animal.nickname}) — ${animal.description.slice(0, 140)}...`,
    keywords: [animal.name, animal.category, "animal facts for kids", "Christian homeschool", "creation science", animal.regions[0]],
    openGraph: {
      title: `${animal.name} ${animal.emoji} | Kallos Cosmos`,
      description: `${animal.description.slice(0, 140)}...`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${animal.name} ${animal.emoji} | Kallos Cosmos`,
      description: `${animal.description.slice(0, 140)}...`,
    },
  };
}

export default async function AnimalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AnimalPageClient slug={slug} />;
}