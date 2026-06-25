import { MetadataRoute } from "next";
import { ANIMALS, slugify } from "../data/animals";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wild-animal-explorer.vercel.app";

  const animalPages = ANIMALS.map((animal) => ({
    url: `${baseUrl}/animals/${slugify(animal.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/animals`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/quiz`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    ...animalPages,
  ];
}