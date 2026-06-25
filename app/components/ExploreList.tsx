"use client";

import { useState } from "react";
import Link from "next/link";
import { slugifyExplore } from "../../data/explore";
import type { ExploreItem } from "../../data/explore";

type Props = {
  items: ExploreItem[];
  title: string;
  emoji: string;
  subtitle: string;
  basePath: string;
  noun: string;
  categoryIcons: Record<string, string>;
};

export default function ExploreList({ items, title, emoji, subtitle, basePath, noun, categoryIcons }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];
  const filtered = activeCategory === "All" ? items : items.filter(i => i.category === activeCategory);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Nunito', Arial, sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Link href="/" style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", borderRadius: "50px", padding: "10px 24px", fontWeight: 800, fontSize: "15px", color: "white", textDecoration: "none", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.2)" }}>← Back to Kallos Cosmos</Link>
        <div style={{ fontSize: "64px" }}>{emoji}</div>
        <h1 style={{ fontSize: "clamp(36px, 7vw, 60px)", fontWeight: 900, color: "white", margin: "10px 0 8px", letterSpacing: "-1px" }}>{title}</h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{subtitle}</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", maxWidth: "800px", margin: "0 auto 40px" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            background: activeCategory === cat ? "white" : "rgba(255,255,255,0.1)",
            color: activeCategory === cat ? "#302b63" : "white",
            border: "none", borderRadius: "50px", padding: "10px 20px",
            fontWeight: 800, fontSize: "14px", cursor: "pointer",
            fontFamily: "'Nunito', Arial, sans-serif", transition: "all 0.2s ease",
          }}>
            {categoryIcons[cat] || "✨"} {cat}
          </button>
        ))}
      </div>

      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 700, marginBottom: "24px", letterSpacing: "1px", textTransform: "uppercase" }}>
        {filtered.length} {filtered.length === 1 ? noun : `${noun}s`} found
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", maxWidth: "1100px", margin: "0 auto" }}>
        {filtered.map(item => (
          <Link key={item.name} href={`${basePath}/${slugifyExplore(item.name)}`} style={{
            background: `linear-gradient(145deg, ${item.color}22, ${item.color}44)`,
            borderRadius: "20px", padding: "28px 16px 20px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
            textDecoration: "none", border: `2px solid ${item.color}66`,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 12px 32px ${item.color}44`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ background: `${item.color}33`, border: `1px solid ${item.color}66`, borderRadius: "50px", padding: "3px 10px", fontSize: "10px", color: item.color, fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase" }}>{item.category}</div>
            <span style={{ fontSize: "56px", lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>{item.emoji}</span>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 900, fontSize: "16px", color: "white", marginBottom: "4px" }}>{item.name}</div>
              <div style={{ fontSize: "11px", color: item.color, fontWeight: 700 }}>{item.nickname}</div>
            </div>
          </Link>
        ))}
      </div>

      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "12px", marginTop: "60px", fontStyle: "italic" }}>Psalm 19:1</p>
    </main>
  );
}