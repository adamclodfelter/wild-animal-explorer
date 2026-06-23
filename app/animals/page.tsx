"use client";

import Link from "next/link";

const ANIMALS = [
  { name: "Axolotl", emoji: "🦎", color: "#FF6B9D", nickname: "the zombie lizard" },
  { name: "Quokka", emoji: "🐾", color: "#FF9F43", nickname: "the happiest animal" },
  { name: "Pangolin", emoji: "🦔", color: "#A29BFE", nickname: "the walking pinecone" },
  { name: "Narwhal", emoji: "🦄", color: "#81ECEC", nickname: "the unicorn of the sea" },
  { name: "Shoebill Stork", emoji: "🦅", color: "#E17055", nickname: "the dinosaur bird" },
  { name: "Kakapo", emoji: "🦜", color: "#BADC58", nickname: "the chonky night parrot" },
  { name: "Mantis Shrimp", emoji: "🦐", color: "#FF7675", nickname: "the punch machine" },
  { name: "Leafy Sea Dragon", emoji: "🐉", color: "#00CEC9", nickname: "the ocean plant dragon" },
  { name: "Aye-Aye", emoji: "🐒", color: "#00B894", nickname: "the finger tapper" },
  { name: "Blobfish", emoji: "🐡", color: "#74B9FF", nickname: "the grumpy blob" },
  { name: "Capybara", emoji: "🦫", color: "#A1887F", nickname: "the friendliest giant" },
  { name: "Platypus", emoji: "🦆", color: "#00B894", nickname: "the impossible animal" },
  { name: "Tardigrade", emoji: "🦠", color: "#FAB1A0", nickname: "the water bear" },
  { name: "Wolverine", emoji: "🦡", color: "#636E72", nickname: "the tiny grizzly" },
  { name: "Dumbo Octopus", emoji: "🐙", color: "#FDCB6E", nickname: "the deep sea flapper" },
];

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function AnimalsPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8d7e3 0%, #ffeaa7 100%)",
      padding: "40px 20px",
      fontFamily: "'Nunito', Arial, sans-serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Link href="/" style={{
          display: "inline-block",
          background: "white",
          borderRadius: "50px",
          padding: "10px 24px",
          fontWeight: 800,
          fontSize: "15px",
          color: "#636E72",
          textDecoration: "none",
          marginBottom: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}>← Back to Kallos Cosmos</Link>
        <div style={{ fontSize: "64px" }}>🐾</div>
        <h1 style={{
          fontSize: "clamp(36px, 7vw, 60px)",
          fontWeight: 900,
          color: "#2D3436",
          margin: "10px 0 8px",
        }}>Animal Explorer</h1>
        <p style={{ fontSize: "18px", color: "#636E72", fontWeight: 700 }}>
          Pick an animal and discover amazing facts!
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}>
        {ANIMALS.map((animal) => (
          <Link key={animal.name} href={`/animals/${slugify(animal.name)}`} style={{
            background: "white",
            borderRadius: "24px",
            padding: "28px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            borderTop: `6px solid ${animal.color}`,
            transition: "transform 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <span style={{ fontSize: "52px", lineHeight: 1 }}>{animal.emoji}</span>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 900, fontSize: "17px", color: "#2D3436" }}>{animal.name}</div>
              <div style={{ fontSize: "12px", color: animal.color, fontWeight: 700, marginTop: "4px" }}>
                {animal.nickname}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}