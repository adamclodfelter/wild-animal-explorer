"use client";

import { useState } from "react";
import Link from "next/link";
import { ANIMALS, CATEGORIES, slugify } from "../../data/animals";

const CATEGORY_ICONS: Record<string, string> = {
  "All": "🌍",
  "Mammals": "🐾",
  "Birds": "🪶",
  "Ocean Creatures": "🌊",
  "Amphibians": "🐸",
  "Micro Creatures": "🔬",
};

export default function AnimalsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? ANIMALS
    : ANIMALS.filter(a => a.category === activeCategory);

  return (
    <main style={{
      minHeight: "100vh",
      
      padding: "40px 20px",
      fontFamily: "'Nunito', Arial, sans-serif",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Link href="/" style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50px",
          padding: "10px 24px",
          fontWeight: 800,
          fontSize: "15px",
          color: "white",
          textDecoration: "none",
          marginBottom: "24px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>← Back to Kallos Cosmos</Link>

        <div style={{ fontSize: "64px" }}>🐾</div>
        <h1 style={{
          fontSize: "clamp(36px, 7vw, 60px)",
          fontWeight: 900,
          color: "white",
          margin: "10px 0 8px",
          letterSpacing: "-1px",
        }}>Animal Explorer</h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
          Every creature tells a story
        </p>
      </div>

      {/* Category Filter */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "40px",
        maxWidth: "800px",
        margin: "0 auto 40px",
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat
                ? "white"
                : "rgba(255,255,255,0.1)",
              color: activeCategory === cat ? "#302b63" : "white",
              border: "none",
              borderRadius: "50px",
              padding: "10px 20px",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'Nunito', Arial, sans-serif",
              transition: "all 0.2s ease",
            }}
          >
            {CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Animal Count */}
      <p style={{
        textAlign: "center",
        color: "rgba(255,255,255,0.4)",
        fontSize: "13px",
        fontWeight: 700,
        marginBottom: "24px",
        letterSpacing: "1px",
        textTransform: "uppercase",
      }}>
        {filtered.length} {filtered.length === 1 ? "creature" : "creatures"} found
      </p>

      {/* Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "16px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {filtered.map((animal, index) => (
          <Link
            key={animal.name}
            href={`/animals/${slugify(animal.name)}`}
            style={{
              background: `linear-gradient(145deg, ${animal.color}22, ${animal.color}44)`,
              borderRadius: "20px",
              padding: "24px 16px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              border: `2px solid ${animal.color}66`,
              transition: "all 0.2s ease",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
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
            }}
          >
            {/* Card number badge */}
            <div style={{
              position: "absolute",
              top: "10px",
              right: "12px",
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 900,
              letterSpacing: "0.5px",
            }}>
              #{String(index + 1).padStart(3, "0")}
            </div>

            {/* Category pill */}
            <div style={{
              background: `${animal.color}33`,
              border: `1px solid ${animal.color}66`,
              borderRadius: "50px",
              padding: "3px 10px",
              fontSize: "10px",
              color: animal.color,
              fontWeight: 800,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}>
              {animal.category}
            </div>

            <span style={{ fontSize: "56px", lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
              {animal.emoji}
            </span>

            <div style={{ textAlign: "center" }}>
              <div style={{
                fontWeight: 900,
                fontSize: "16px",
                color: "white",
                marginBottom: "4px",
              }}>
                {animal.name}
              </div>
              <div style={{
                fontSize: "11px",
                color: animal.color,
                fontWeight: 700,
              }}>
                {animal.nickname}
              </div>
            </div>

            {/* Habitat tag */}
            <div style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 600,
              marginTop: "2px",
            }}>
              📍 {animal.regions[0]}
            </div>
          </Link>
        ))}
      </div>

      {/* Footer verse */}
      <p style={{
        textAlign: "center",
        color: "rgba(255,255,255,0.25)",
        fontSize: "12px",
        marginTop: "60px",
        fontStyle: "italic",
      }}>
        Psalm 19:1
      </p>
    </main>
  );
}