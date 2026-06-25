"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ANIMALS, CATEGORIES, slugify } from "../../data/animals";
import { useFavorites } from "../hooks/useFavorites";

const CATEGORY_ICONS: Record<string, string> = {
  "All": "🌍",
  "Mammals": "🐾",
  "Birds": "🪶",
  "Ocean Creatures": "🌊",
  "Amphibians": "🐸",
  "Reptiles": "🦎",
  "Insects": "🦋",
  "Micro Creatures": "🔬",
};

const QUICK_PICKS = [
  { name: "T. Rex", emoji: "🦖" },
  { name: "Komodo Dragon", emoji: "🐉" },
  { name: "Harpy Eagle", emoji: "🦅" },
  { name: "Mantis Shrimp", emoji: "🦐" },
  { name: "Capybara", emoji: "🦫" },
  { name: "Narwhal", emoji: "🦄" },
  { name: "Wolverine", emoji: "🦡" },
  { name: "Platypus", emoji: "🦆" },
];

export default function AnimalsPage() {
  const router = useRouter();
  const { favorites, toggle, isFavorite, mounted } = useFavorites();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showCollection, setShowCollection] = useState(false);
  const [didYouKnow, setDidYouKnow] = useState<{ animal: string; fact: string; color: string; emoji: string } | null>(null);
  const [bouncing, setBouncing] = useState(false);

  const isDino = activeCategory === "Dinosaurs";

  const filtered = ANIMALS.filter(a => {
    if (showCollection) return isFavorite(a.name);
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch = search === "" ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.nickname.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const random = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const fact = random.funFacts[Math.floor(Math.random() * random.funFacts.length)];
    setDidYouKnow({ animal: random.name, fact, color: random.color, emoji: random.emoji });
  }, []);

  const goRandom = () => {
    setBouncing(true);
    setTimeout(() => {
      const random = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
      router.push(`/animals/${slugify(random.name)}`);
    }, 400);
  };

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Nunito', Arial, sans-serif" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Link href="/" style={{
          display: "inline-block", background: "rgba(255,255,255,0.1)",
          borderRadius: "50px", padding: "10px 24px", fontWeight: 800,
          fontSize: "15px", color: "white", textDecoration: "none",
          marginBottom: "24px", border: "1px solid rgba(255,255,255,0.2)",
        }}>← Back to Kallos Cosmos</Link>

        <div style={{ fontSize: "64px" }}>{showCollection ? "❤️" : isDino ? "🦖" : "🐾"}</div>
        <h1 style={{
          fontSize: "clamp(36px, 7vw, 60px)", fontWeight: 900, color: "white",
          margin: "10px 0 8px", letterSpacing: "-1px",
        }}>
          {showCollection ? "My Collection" : isDino ? "Dinosaur Explorer" : "Animal Explorer"}
        </h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
          {showCollection
            ? `${favorites.length} ${favorites.length === 1 ? "animal" : "animals"} saved`
            : isDino ? "Ancient giants of a lost world" : "Every creature tells a story"}
        </p>
      </div>

      {/* My Collection + Random + Search row */}
      <div style={{
        maxWidth: "700px", margin: "0 auto 28px",
        display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap",
      }}>

        {/* My Collection button */}
        <button
          onClick={() => { setShowCollection(s => !s); setSearch(""); }}
          style={{
            background: showCollection
              ? "linear-gradient(135deg, #FF6B9D, #e84393)"
              : "rgba(255,255,255,0.1)",
            border: showCollection ? "2px solid #FF6B9D" : "2px solid rgba(255,255,255,0.2)",
            borderRadius: "50px", padding: "14px 22px", fontWeight: 900,
            fontSize: "15px", color: "white", cursor: "pointer",
            fontFamily: "'Nunito', Arial, sans-serif",
            display: "flex", alignItems: "center", gap: "8px",
            transition: "all 0.2s ease",
            boxShadow: showCollection ? "0 4px 20px rgba(255,107,157,0.4)" : "none",
            whiteSpace: "nowrap",
          }}
        >
          ❤️ My Collection {mounted && favorites.length > 0 && `(${favorites.length})`}
        </button>

        {/* Surprise Me */}
        <button
          onClick={goRandom}
          style={{
            background: "linear-gradient(135deg, #FF9F43cc, #FDCB6Ecc)",
            border: "2px solid rgba(255,255,255,0.2)", borderRadius: "50px",
            padding: "14px 22px", fontWeight: 900, fontSize: "15px", color: "white",
            cursor: "pointer", fontFamily: "'Nunito', Arial, sans-serif",
            whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "8px",
            transition: "all 0.2s ease",
            transform: bouncing ? "scale(0.95)" : "scale(1)",
            boxShadow: "0 4px 20px rgba(255,159,67,0.3)",
          }}
        >
          🎲 Surprise Me!
        </button>

        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: "160px" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none" }}>🔍</span>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => { setSearch(e.target.value); setShowCollection(false); }}
            style={{
              width: "100%", background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.15)", borderRadius: "50px",
              padding: "14px 20px 14px 44px", fontSize: "15px", fontWeight: 700,
              color: "white", fontFamily: "'Nunito', Arial, sans-serif",
              outline: "none", boxSizing: "border-box",
            }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{
              position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
              width: "24px", height: "24px", cursor: "pointer", color: "white",
              fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          )}
        </div>
      </div>

      {/* Empty collection state */}
      {showCollection && mounted && favorites.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🫶</div>
          <div style={{ fontSize: "20px", fontWeight: 900, color: "white", marginBottom: "8px" }}>No favorites yet!</div>
          <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: "24px" }}>Tap the ❤️ on any animal to save it here</div>
          <button onClick={() => setShowCollection(false)} style={{
            background: "linear-gradient(135deg, #FF6B9D, #e84393)", border: "none",
            borderRadius: "50px", padding: "14px 32px", fontSize: "16px", fontWeight: 900,
            color: "white", cursor: "pointer", fontFamily: "'Nunito', Arial, sans-serif",
          }}>Browse Animals</button>
        </div>
      )}

      {/* Did You Know — hide when showing collection */}
      {!showCollection && !search && didYouKnow && mounted && (
        <div style={{
          maxWidth: "700px", margin: "0 auto 28px",
          background: `linear-gradient(135deg, ${didYouKnow.color}22, ${didYouKnow.color}11)`,
          border: `1px solid ${didYouKnow.color}44`, borderRadius: "20px",
          padding: "16px 20px", display: "flex", alignItems: "flex-start",
          gap: "12px", cursor: "pointer",
        }}
        onClick={() => router.push(`/animals/${slugify(didYouKnow.animal)}`)}>
          <span style={{ fontSize: "28px", flexShrink: 0 }}>{didYouKnow.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "10px", fontWeight: 900, color: didYouKnow.color, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
              💡 Did You Know? — {didYouKnow.animal}
            </div>
            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", fontWeight: 600, lineHeight: 1.5 }}>
              {didYouKnow.fact}
            </div>
          </div>
          <button onClick={e => {
            e.stopPropagation();
            const random = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
            const fact = random.funFacts[Math.floor(Math.random() * random.funFacts.length)];
            setDidYouKnow({ animal: random.name, fact, color: random.color, emoji: random.emoji });
          }} style={{
            background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%",
            width: "32px", height: "32px", fontSize: "16px", cursor: "pointer",
            color: "white", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
          }}>🔄</button>
        </div>
      )}

      {/* Quick Picks */}
      {!search && !showCollection && (
        <div style={{ maxWidth: "800px", margin: "0 auto 28px" }}>
          <p style={{ textAlign: "center", fontSize: "11px", fontWeight: 900, letterSpacing: "2px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "12px" }}>⚡ Fan Favorites</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
            {QUICK_PICKS.map(pick => (
              <Link key={pick.name} href={`/animals/${slugify(pick.name)}`} style={{
                background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)",
                borderRadius: "50px", padding: "10px 18px", fontWeight: 800, fontSize: "14px",
                color: "white", textDecoration: "none", display: "flex", alignItems: "center",
                gap: "7px", transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span style={{ fontSize: "18px" }}>{pick.emoji}</span>
                {pick.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Dino chip */}
      {!search && !showCollection && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
          <button onClick={() => setActiveCategory(isDino ? "All" : "Dinosaurs")} style={{
            background: isDino ? "linear-gradient(135deg, #FF9F43, #E17055)" : "linear-gradient(135deg, #FF9F4333, #E1705533)",
            border: isDino ? "2px solid #FF9F43" : "2px solid #FF9F4366",
            borderRadius: "50px", padding: "12px 28px", fontWeight: 900, fontSize: "16px",
            color: "white", cursor: "pointer", fontFamily: "'Nunito', Arial, sans-serif",
            display: "flex", alignItems: "center", gap: "8px",
            boxShadow: isDino ? "0 0 24px #FF9F4388, 0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease",
          }}>
            <span style={{ fontSize: "22px" }}>🦖</span>
            DINOSAURS
            <span style={{ fontSize: "22px" }}>🦕</span>
          </button>
        </div>
      )}

      {/* Category Filter */}
      {!search && !showCollection && (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", maxWidth: "800px", margin: "0 auto 40px" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: activeCategory === cat ? "white" : "rgba(255,255,255,0.1)",
              color: activeCategory === cat ? "#302b63" : "white",
              border: "none", borderRadius: "50px", padding: "10px 20px",
              fontWeight: 800, fontSize: "14px", cursor: "pointer",
              fontFamily: "'Nunito', Arial, sans-serif", transition: "all 0.2s ease",
            }}>
              {CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      {!(showCollection && favorites.length === 0) && mounted && (
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 700, marginBottom: "24px", letterSpacing: "1px", textTransform: "uppercase" }}>
          {filtered.length} {filtered.length === 1 ? "creature" : "creatures"} {search ? `matching "${search}"` : "found"}
        </p>
      )}

      {/* No search results */}
      {filtered.length === 0 && search && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🤔</div>
          <div style={{ fontSize: "20px", fontWeight: 900, color: "white", marginBottom: "8px" }}>No animals found</div>
          <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Try a different search</div>
        </div>
      )}

      {/* Cards Grid */}
      {!(showCollection && favorites.length === 0) && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", maxWidth: "1100px", margin: "0 auto" }}>
          {filtered.map((animal, index) => (
            <div key={animal.name} style={{ position: "relative" }}>
              {/* Heart button */}
              <button
                onClick={e => { e.preventDefault(); toggle(animal.name); }}
                style={{
                  position: "absolute", top: "10px", left: "10px", zIndex: 2,
                  background: mounted && isFavorite(animal.name) ? "rgba(255,107,157,0.9)" : "rgba(0,0,0,0.4)",
                  border: "none", borderRadius: "50%", width: "32px", height: "32px",
                  fontSize: "15px", cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                  transform: mounted && isFavorite(animal.name) ? "scale(1.1)" : "scale(1)",
                }}
              >{mounted && isFavorite(animal.name) ? "❤️" : "🤍"}</button>

              <Link href={`/animals/${slugify(animal.name)}`} style={{
                background: `linear-gradient(145deg, ${animal.color}22, ${animal.color}44)`,
                borderRadius: "20px", padding: "24px 16px 20px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                textDecoration: "none", border: `2px solid ${animal.color}66`,
                transition: "all 0.2s ease", cursor: "pointer", position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                e.currentTarget.style.border = `2px solid ${animal.color}`;
                e.currentTarget.style.boxShadow = `0 12px 32px ${animal.color}44`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.border = `2px solid ${animal.color}66`;
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{ position: "absolute", top: "10px", right: "12px", fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 900, letterSpacing: "0.5px" }}>
                  #{String(index + 1).padStart(3, "0")}
                </div>

                <div style={{ background: `${animal.color}33`, border: `1px solid ${animal.color}66`, borderRadius: "50px", padding: "3px 10px", fontSize: "10px", color: animal.color, fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  {animal.category}
                </div>

                <span style={{ fontSize: "56px", lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>{animal.emoji}</span>

                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 900, fontSize: "16px", color: "white", marginBottom: "4px" }}>{animal.name}</div>
                  <div style={{ fontSize: "11px", color: animal.color, fontWeight: 700 }}>{animal.nickname}</div>
                </div>

                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginTop: "2px" }}>
                  📍 {animal.regions[0]}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "12px", marginTop: "60px", fontStyle: "italic" }}>
        Psalm 19:1
      </p>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.35); }
        input:focus { border-color: rgba(255,255,255,0.4) !important; }
      `}</style>
    </main>
  );
}