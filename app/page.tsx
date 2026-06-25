"use client"

import Link from "next/link";

export default function Home() {
  const categories = [
    { name: "Animals", emoji: "🐾", color: "#FF6B9D", slug: "animals" },
    { name: "Space", emoji: "🚀", color: "#6C5CE7", slug: "space" },
    { name: "Vehicles", emoji: "🚜", color: "#BADC58", slug: "vehicles" },
    { name: "Animal Quiz", emoji: "🧠", color: "#6C5CE7", slug: "quiz" },
    { name: "Memory Match", emoji: "🧠", color: "#00B894", slug: "memory-match" },
  ];

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      fontFamily: "'Nunito', Arial, sans-serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
          <div style={{
            position: "absolute", inset: "-16px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,180,255,0.18) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", inset: "-8px", borderRadius: "50%",
            border: "2px solid rgba(100,180,255,0.2)",
          }} />
          <div style={{
            fontSize: "110px", lineHeight: 1,
            filter: "drop-shadow(0 8px 32px rgba(100,180,255,0.5)) drop-shadow(0 0 60px rgba(100,180,255,0.3))",
            display: "block",
          }}>🌍</div>
        </div>
        <h1 style={{
          fontSize: "clamp(44px, 9vw, 80px)", fontWeight: 900, color: "white",
          margin: "0 0 6px", letterSpacing: "-2px", lineHeight: 1,
          textShadow: "0 4px 32px rgba(100,180,255,0.4), 0 2px 8px rgba(0,0,0,0.4)",
        }}>
          Kallos{" "}
          <span style={{
            background: "linear-gradient(135deg, #81ECEC, #6C5CE7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Cosmos</span>
        </h1>
        <p style={{
          fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: 700,
          margin: "10px 0 0", letterSpacing: "0.5px",
        }}>The heavens declare it. So do the oceans, the creatures, and everything made.</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px", width: "100%", maxWidth: "900px", marginBottom: "48px",
      }}>
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/${cat.slug}`} style={{
            background: `linear-gradient(145deg, ${cat.color}dd, ${cat.color}99)`,
            borderRadius: "28px", padding: "36px 24px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
            textDecoration: "none", boxShadow: `0 8px 32px ${cat.color}44`,
            border: `2px solid ${cat.color}66`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "pointer",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
            e.currentTarget.style.boxShadow = `0 20px 48px ${cat.color}66`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = `0 8px 32px ${cat.color}44`;
          }}>
            <span style={{ fontSize: "72px", lineHeight: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>{cat.emoji}</span>
            <span style={{ fontSize: "28px", fontWeight: 900, color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>{cat.name}</span>
          </Link>
        ))}
      </div>

      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px", fontStyle: "italic", marginBottom: "8px" }}>More worlds coming soon 🪐</p>
      <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px", fontStyle: "italic" }}>- Psalm 19:1</p>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </main>
  );
}