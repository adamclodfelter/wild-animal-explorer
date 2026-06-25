"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ANIMALS, slugify } from "../../../data/animals";
import { useFavorites } from "../../hooks/useFavorites";
import dynamic from "next/dynamic";
const HabitatMap = dynamic(() => import("../../components/HabitatMap"), { ssr: false });

const STATUS_CONFIG: Record<string, { color: string; emoji: string }> = {
  "Extinct":              { color: "#636E72", emoji: "💀" },
  "Critically Endangered":{ color: "#D63031", emoji: "🚨" },
  "Endangered":           { color: "#E17055", emoji: "⚠️" },
  "Vulnerable":           { color: "#FDCB6E", emoji: "🟡" },
  "Near Threatened":      { color: "#74B9FF", emoji: "🔵" },
  "Least Concern":        { color: "#00B894", emoji: "✅" },
};

function AnimalGallery({ query, color, animalName }: { query: string; color: string; animalName: string }) {
  const [images, setImages] = useState<{ url: string; credit: string }[]>([]);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [flagged, setFlagged] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
          {
            headers: {
              Authorization: "Client-ID 8h_-JU-VsjZC2oL0rw5Rb9X_qQIbU1kxuahd1-YS3FA",
            },
          }
        );
        const data = await res.json();
        const results = (data.results || []).map((photo: any) => ({
          url: photo.urls.regular,
          credit: `© ${photo.user.name} on Unsplash`,
        }));
        if (results.length > 0) {
          setImages(results);
        } else {
          setErrored(true);
        }
      } catch {
        setErrored(true);
      }
    }

    fetchImages();
  }, [query]);

  const prev = () => { setLoaded(false); setFlagged(false); setCurrent(i => (i - 1 + images.length) % images.length); };
  const next = () => { setLoaded(false); setFlagged(false); setCurrent(i => (i + 1) % images.length); };

  return (
    <div style={{
      height: "300px", background: "#0d0d1a", position: "relative",
      overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: color, zIndex: 2 }} />

      {images.length === 0 && !errored && (
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)", fontWeight: 700, fontFamily: "'Nunito', Arial, sans-serif", letterSpacing: "1px", textTransform: "uppercase" }}>
          Loading photos...
        </div>
      )}

      {errored && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ fontSize: "64px" }}>🔍</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontWeight: 700, fontFamily: "'Nunito', Arial, sans-serif" }}>No photos found</div>
        </div>
      )}

      {images.length > 0 && (
        <>
          <img
            key={current}
            src={images[current].url}
            alt={animalName}
            onLoad={() => setLoaded(true)}
            onError={() => { if (images.length > 1) next(); else setErrored(true); }}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
          />

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", zIndex: 2 }} />

          {images[current].credit && (
            <div style={{ position: "absolute", bottom: "8px", left: "12px", fontSize: "10px", color: "rgba(255,255,255,0.35)", fontWeight: 600, zIndex: 3, maxWidth: "55%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {images[current].credit}
            </div>
          )}

          <button
            onClick={() => {
              setFlagged(true);
              console.log(`🚩 BAD PHOTO REPORT\nAnimal: ${animalName}\nPhoto #${current + 1}\nURL: ${images[current].url}\nCredit: ${images[current].credit}`);
            }}
            style={{
              position: "absolute", bottom: "8px", right: "12px",
              background: flagged ? "#E17055" : "rgba(0,0,0,0.6)",
              color: "white", border: flagged ? "none" : "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50px", padding: "6px 14px", fontSize: "12px", fontWeight: 800,
              cursor: "pointer", fontFamily: "'Nunito', Arial, sans-serif", zIndex: 3,
              transition: "all 0.2s ease", backdropFilter: "blur(4px)",
            }}
          >{flagged ? "🚩 Flagged!" : "👎 Bad Photo"}</button>

          {images.length > 1 && (
            <>
              <button onClick={prev} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "20px", color: "white", cursor: "pointer", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>‹</button>
              <button onClick={next} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "20px", color: "white", cursor: "pointer", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>›</button>

              <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "5px", zIndex: 3 }}>
                {images.map((_, i) => (
                  <div key={i} onClick={() => { setLoaded(false); setFlagged(false); setCurrent(i); }} style={{ width: i === current ? "18px" : "6px", height: "6px", borderRadius: "50px", background: i === current ? color : "rgba(255,255,255,0.35)", cursor: "pointer", transition: "all 0.2s ease" }} />
                ))}
              </div>
            </>
          )}

          {images.length > 1 && (
            <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(0,0,0,0.5)", borderRadius: "50px", padding: "4px 12px", fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.6)", zIndex: 3, backdropFilter: "blur(4px)" }}>
              {current + 1} / {images.length}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AnimalPageClient({ slug }: { slug: string }) {
  const animal = ANIMALS.find(a => slugify(a.name) === slug);
  const { toggle, isFavorite, mounted } = useFavorites();

  if (!animal) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', Arial, sans-serif", color: "white" }}>
        <div style={{ fontSize: "64px" }}>🤔</div>
        <h1 style={{ fontSize: "32px", fontWeight: 900 }}>Animal not found!</h1>
        <Link href="/animals" style={{ marginTop: "20px", background: "#6C5CE7", color: "white", borderRadius: "50px", padding: "14px 32px", textDecoration: "none", fontWeight: 800, fontSize: "18px" }}>← Back to Animals</Link>
      </main>
    );
  }

  const statusConfig = STATUS_CONFIG[animal.status] || STATUS_CONFIG["Least Concern"];

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Nunito', Arial, sans-serif" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        <Link href="/animals" style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", borderRadius: "50px", padding: "12px 28px", fontWeight: 800, fontSize: "16px", color: "white", textDecoration: "none", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.2)" }}>← Back to Animals</Link>

        <div style={{
          background: "rgba(255,255,255,0.05)", borderRadius: "28px",
          overflow: "hidden", border: `2px solid ${animal.color}66`, marginBottom: "16px",
        }}>
          <AnimalGallery query={animal.imageQuery} color={animal.color} animalName={animal.name} />
          <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "48px" }}>{animal.emoji}</span>
                <div>
                  <div style={{ background: `${animal.color}33`, border: `1px solid ${animal.color}66`, borderRadius: "50px", padding: "4px 14px", fontSize: "11px", color: animal.color, fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase", display: "inline-block", marginBottom: "6px" }}>{animal.category}</div>
                  <h1 style={{ fontSize: "36px", fontWeight: 900, color: "white", margin: 0, lineHeight: 1 }}>{animal.name}</h1>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <div style={{ background: `${statusConfig.color}22`, border: `2px solid ${statusConfig.color}66`, borderRadius: "16px", padding: "8px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: "18px", lineHeight: 1, marginBottom: "4px" }}>{statusConfig.emoji}</div>
                  <div style={{ fontSize: "9px", fontWeight: 900, color: statusConfig.color, textTransform: "uppercase", letterSpacing: "0.5px", lineHeight: 1.3, maxWidth: "80px" }}>{animal.status}</div>
                </div>

                <button
                  onClick={() => toggle(animal.name)}
                  style={{
                    background: mounted && isFavorite(animal.name) ? "rgba(255,107,157,0.9)" : "rgba(255,255,255,0.1)",
                    border: mounted && isFavorite(animal.name) ? "2px solid #FF6B9D" : "2px solid rgba(255,255,255,0.2)",
                    borderRadius: "50px", padding: "8px 16px", cursor: "pointer",
                    fontFamily: "'Nunito', Arial, sans-serif", fontWeight: 800, fontSize: "14px",
                    color: "white", display: "flex", alignItems: "center", gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {mounted && isFavorite(animal.name) ? "❤️ Saved" : "🤍 Save"}
                </button>
              </div>
            </div>

            <div style={{ fontSize: "14px", color: animal.color, fontWeight: 700, marginBottom: "12px" }}>aka "{animal.nickname}"</div>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0, fontWeight: 600 }}>{animal.description}</p>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "20px", padding: "20px 24px", marginBottom: "12px", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `4px solid ${animal.color}` }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: animal.color, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px" }}>🤩 Fun Facts</div>
          {animal.funFacts.map((fact, i) => (
            <div key={i} style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", fontWeight: 600, lineHeight: 1.6, padding: "10px 0", borderBottom: i < animal.funFacts.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>{fact}</div>
          ))}
        </div>

        <div style={{ background: `linear-gradient(135deg, ${animal.color}18, ${animal.color}08)`, borderRadius: "20px", padding: "20px 24px", marginBottom: "16px", border: `1px solid ${animal.color}33` }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: animal.color, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>✦ Creation Wonder</div>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", fontWeight: 600, lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>{animal.creationNote}</p>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px" }}>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 600, lineHeight: 1.7, margin: "0 0 6px", fontStyle: "italic" }}>"How many are your works, Lord! In wisdom you made them all; the earth is full of your creatures."</p>
            <div style={{ fontSize: "12px", color: animal.color, fontWeight: 800 }}>— Psalm 104:24</div>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "20px", padding: "20px", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px" }}>🗺️ Habitat Map</div>
          <HabitatMap lat={animal.lat} lng={animal.lng} animalName={animal.name} region={animal.regions[0]} color={animal.color} />
        </div>

        <Link href="/animals" style={{ display: "block", background: `linear-gradient(135deg, ${animal.color}, ${animal.color}99)`, color: "white", borderRadius: "50px", padding: "20px", textAlign: "center", textDecoration: "none", fontWeight: 900, fontSize: "20px" }}>🐾 Explore More Animals</Link>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "32px", fontStyle: "italic" }}>"The heavens declare the glory of God" — Psalm 19:1</p>

      </div>
    </main>
  );
}