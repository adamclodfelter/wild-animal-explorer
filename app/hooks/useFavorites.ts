import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kallos-favorites");
    if (stored) setFavorites(JSON.parse(stored));
    setMounted(true);
  }, []);

  const toggle = (name: string) => {
    setFavorites(prev => {
      const updated = prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name];
      localStorage.setItem("kallos-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (name: string) => favorites.includes(name);

  return { favorites, toggle, isFavorite, mounted };
}