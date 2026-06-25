"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ANIMALS } from "../../data/animals";

const UNSPLASH_KEY = "8h_-JU-VsjZC2oL0rw5Rb9X_qQIbU1kxuahd1-YS3FA";

type AnimalData = {
  name: string;
  emoji: string;
  color: string;
  imageQuery: string;
  photoUrl: string | null;
};

type Card = {
  id: number;
  animalName: string;
  emoji: string;
  color: string;
  photoUrl: string | null;
  type: "photo" | "name";
  isFlipped: boolean;
  isMatched: boolean;
};

function generateCards(animals: AnimalData[]): Card[] {
  const cards: Card[] = [];
  animals.forEach((animal, i) => {
    cards.push({
      id: i * 2,
      animalName: animal.name,
      emoji: animal.emoji,
      color: animal.color,
      photoUrl: animal.photoUrl,
      type: "photo",
      isFlipped: false,
      isMatched: false,
    });
    cards.push({
      id: i * 2 + 1,
      animalName: animal.name,
      emoji: animal.emoji,
      color: animal.color,
      photoUrl: animal.photoUrl,
      type: "name",
      isFlipped: false,
      isMatched: false,
    });
  });
  return cards.sort(() => Math.random() - 0.5);
}

export default function MemoryMatchPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalData[]>([]);

  async function loadGame() {
    setLoading(true);
    setFlipped([]);
    setMatches(0);
    setMoves(0);
    setLocked(false);
    setFinished(false);
    setElapsed(0);

    const picked = [...ANIMALS].sort(() => Math.random() - 0.5).slice(0, 6);

    const animalsWithPhotos: AnimalData[] = await Promise.all(
      picked.map(async (animal) => {
        try {
          const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(animal.imageQuery)}&per_page=1&orientation=squarish`,
            { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
          );
          const data = await res.json();
          const photoUrl = data.results?.[0]?.urls?.small || null;
          return { name: animal.name, emoji: animal.emoji, color: animal.color, imageQuery: animal.imageQuery, photoUrl };
        } catch {
          return { name: animal.name, emoji: animal.emoji, color: animal.color, imageQuery: animal.imageQuery, photoUrl: null };
        }
      })
    );

    setSelectedAnimals(animalsWithPhotos);
    setCards(generateCards(animalsWithPhotos));
    setStartTime(Date.now());
    setLoading(false);
  }

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    if (!startTime || finished) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, finished]);

  function handleFlip(cardId: number) {
    if (locked) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flipped.length === 1 && flipped[0] === cardId) return;

    const newFlipped = [...flipped, cardId];
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, isFlipped: true } : c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [firstId, secondId] = newFlipped;
      const first = cards.find(c => c.id === firstId)!;
      const second = cards.find(c => c.id === secondId)!;

      if (first.animalName === second.animalName) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.animalName === first.animalName ? { ...c, isMatched: true } : c
          ));
          const newMatches = matches + 1;
          setMatches(newMatches);
          setFlipped([]);
          setLocked(false);
          if (newMatches === 6) setFinished(true);
        }, 600);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlipped([]);
          setLocked(false);
        }, 1000);
      }
    }
  }

  function getRating() {
    if (moves <= 8) return { stars: "⭐⭐⭐", label: "Perfect Memory!", color: "#FFD700" };
    if (moves <= 12) return { stars: "⭐⭐", label: "Great Job!", color: "#FF9F43" };
    return { stars: "⭐", label: "Keep Practicing!", color: "#00B894" };
  }

  const rating = getRating();

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', Arial, sans-serif" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🧠</div>
        <div style={{ fontSize: "22px", fontWeight: 900, color: "white", marginBottom: "8px" }}>Loading animals...</div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>Getting photos ready</div>
      </main>
    );
  }

  if (finished) {
    return (
      <main style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Nunito', Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>🎉</div>
          <h1 style={{ fontSize: "40px", fontWeight: 900, color: "white", margin: "0 0 8px" }}>You did it!</h1>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>{rating.stars}</div>
          <div style={{ fontSize: "20px", fontWeight: 900, color: rating.color, marginBottom: "24px" }}>{rating.label}</div>

          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "28px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "36px", fontWeight: 900, color: "white" }}>{moves}</div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>Moves</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "36px", fontWeight: 900, color: "white" }}>{elapsed}s</div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>Time</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "36px", fontWeight: 900, color: "white" }}>6</div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>Matched</div>
              </div>
            </div>
          </div>

          {/* Show matched animals */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {selectedAnimals.map(animal => (
              <div key={animal.name} style={{ background: `${animal.color}22`, border: `1px solid ${animal.color}44`, borderRadius: "50px", padding: "6px 14px", fontSize: "13px", fontWeight: 800, color: "white" }}>
                {animal.emoji} {animal.name}
              </div>
            ))}
          </div>

          <button onClick={loadGame} style={{ display: "block", width: "100%", background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "white", border: "none", borderRadius: "50px", padding: "20px", fontSize: "20px", fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', Arial, sans-serif", marginBottom: "12px" }}>
            🔄 Play Again
          </button>
          <Link href="/" style={{ display: "block", background: "rgba(255,255,255,0.08)", color: "white", borderRadius: "50px", padding: "16px", textDecoration: "none", fontWeight: 800, fontSize: "16px", border: "1px solid rgba(255,255,255,0.15)", textAlign: "center" }}>
            🏠 Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Nunito', Arial, sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <Link href="/" style={{ background: "rgba(255,255,255,0.1)", borderRadius: "50px", padding: "10px 20px", color: "white", textDecoration: "none", fontWeight: 800, fontSize: "14px", border: "1px solid rgba(255,255,255,0.2)" }}>← Home</Link>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 900, color: "white" }}>🧠 Memory Match</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "rgba(255,255,255,0.5)" }}>{moves} moves</div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "rgba(255,255,255,0.5)" }}>{elapsed}s</div>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ width: "24px", height: "8px", borderRadius: "50px", background: i < matches ? "#00B894" : "rgba(255,255,255,0.1)", transition: "background 0.3s ease" }} />
          ))}
        </div>

        {/* Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleFlip(card.id)}
              style={{
                aspectRatio: "3/4",
                borderRadius: "14px",
                cursor: card.isMatched || card.isFlipped ? "default" : "pointer",
                overflow: "hidden",
                border: card.isMatched
                  ? `3px solid ${card.color}`
                  : card.isFlipped
                  ? `2px solid ${card.color}66`
                  : "2px solid rgba(255,255,255,0.15)",
                boxShadow: card.isMatched ? `0 0 20px ${card.color}44` : "none",
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              {card.isFlipped || card.isMatched ? (
                card.type === "photo" ? (
                  <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    {card.photoUrl ? (
                      <img src={card.photoUrl} alt={card.animalName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: `${card.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>
                        {card.emoji}
                      </div>
                    )}
                    {card.isMatched && (
                      <div style={{ position: "absolute", top: "6px", right: "6px", fontSize: "16px", background: "rgba(0,0,0,0.5)", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>✅</div>
                    )}
                  </div>
                ) : (
                  <div style={{
                    width: "100%", height: "100%",
                    background: `linear-gradient(135deg, ${card.color}44, ${card.color}22)`,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: "8px", gap: "6px",
                  }}>
                    <div style={{ fontSize: "28px" }}>{card.emoji}</div>
                    <div style={{ fontSize: "11px", fontWeight: 900, color: "white", textAlign: "center", lineHeight: 1.3 }}>{card.animalName}</div>
                    {card.isMatched && <div style={{ fontSize: "14px" }}>✅</div>}
                  </div>
                )
              ) : (
                <div
                  style={{
                    width: "100%", height: "100%",
                    background: "linear-gradient(135deg, rgba(108,92,231,0.4), rgba(129,236,236,0.15))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "32px", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(108,92,231,0.4), rgba(129,236,236,0.15))"; }}
                >
                  🌍
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Restart */}
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <button onClick={loadGame} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50px", padding: "12px 28px", color: "white", fontWeight: 800, fontSize: "14px", cursor: "pointer", fontFamily: "'Nunito', Arial, sans-serif" }}>
            🔄 New Game
          </button>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "32px", fontStyle: "italic" }}>Psalm 19:1</p>
      </div>
    </main>
  );
}