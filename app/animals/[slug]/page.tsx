"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ANIMALS, slugify } from "../../../data/animals";
import dynamic from "next/dynamic";
const HabitatMap = dynamic(() => import("../../components/HabitatMap"), { ssr: false });

function WikiImage({ query, color, animalName }: { query: string; color: string; animalName: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [flagged, setFlagged] = useState(false);

  useEffect(() => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages&pithumbsize=800&format=json&origin=*`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        const pages = data?.query?.pages;
        if (!pages) { setErrored(true); return; }
        const page = Object.values(pages)[0] as any;
        if (page?.thumbnail?.source) {
          setImgSrc(page.thumbnail.source);
        } else {
          setErrored(true);
        }
      })
      .catch(() => setErrored(true));
  }, [query]);

  return (
    <div style={{
      height: "280px",
      background: `#0d0d1a`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* top color accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "4px", background: color, zIndex: 2,
      }} />

      {/* loading state */}
      {!loaded && !errored && (
        <div style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.25)",
          fontWeight: 700,
          fontFamily: "'Nunito', Arial, sans-serif",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}>Loading photo...</div>
      )}

      {/* error/no photo state */}
      {errored && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
          <div style={{ fontSize: "64px" }}>🔍</div>
          <div style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 700,
            fontFamily: "'Nunito', Arial, sans-serif",
          }}>No photo found</div>
        </div>
      )}

      {/* actual image */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={animalName}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      )}

      {/* bad photo button — only shows when image loaded */}
      {loaded && (
        <button
          onClick={() => {
            setFlagged(true);
            console.log(`🚩 BAD PHOTO: ${animalName} | query: "${query}"`);
          }}
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            background: flagged ? "#E17055" : "rgba(0,0,0,0.65)",
            color: "white",
            border: flagged ? "none" : "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50px",
            padding: "8px 18px",
            fontSize: "13px",
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "'Nunito', Arial, sans-serif",
            zIndex: 3,
            transition: "all 0.2s ease",
            backdropFilter: "blur(4px)",
          }}
        >
          {flagged ? "🚩 Flagged!" : "👎 Bad Photo"}
        </button>
      )}
    </div>
  );
}

export default function AnimalPage({ params }: { params: any }) {
  const { slug } = use(params) as { slug: string };
  const animal = ANIMALS.find(a => slugify(a.name) === slug);

  if (!animal) {
    return (
      <main style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Nunito', Arial, sans-serif",
        
        color: "white",
      }}>
        <div style={{ fontSize: "64px" }}>🤔</div>
        <h1 style={{ fontSize: "32px", fontWeight: 900 }}>Animal not found!</h1>
        <Link href="/animals" style={{
          marginTop: "20px",
          background: "#6C5CE7",
          color: "white",
          borderRadius: "50px",
          padding: "14px 32px",
          textDecoration: "none",
          fontWeight: 800,
          fontSize: "18px",
        }}>← Back to Animals</Link>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: "100vh",
      
      padding: "40px 20px",
      fontFamily: "'Nunito', Arial, sans-serif",
    }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        {/* Back button */}
        <Link href="/animals" style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50px",
          padding: "12px 28px",
          fontWeight: 800,
          fontSize: "16px",
          color: "white",
          textDecoration: "none",
          marginBottom: "24px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>← Back to Animals</Link>

        {/* Main card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "28px",
          overflow: "hidden",
          border: `2px solid ${animal.color}66`,
          marginBottom: "16px",
        }}>
          <WikiImage query={animal.imageQuery} color={animal.color} animalName={animal.name} />

          <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "48px" }}>{animal.emoji}</span>
              <div>
                <div style={{
                  background: `${animal.color}33`,
                  border: `1px solid ${animal.color}66`,
                  borderRadius: "50px",
                  padding: "4px 14px",
                  fontSize: "11px",
                  color: animal.color,
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "6px",
                }}>{animal.category}</div>
                <h1 style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "white",
                  margin: 0,
                  lineHeight: 1,
                }}>{animal.name}</h1>
              </div>
            </div>

            <div style={{
              fontSize: "14px",
              color: animal.color,
              fontWeight: 700,
              marginBottom: "12px",
            }}>aka "{animal.nickname}"</div>

            <p style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 600,
            }}>{animal.description}</p>
          </div>
        </div>

        {/* Where it lives */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "20px 24px",
          marginBottom: "12px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: "4px solid #00B894",
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "32px", lineHeight: 1, flexShrink: 0 }}>📍</span>
          <div>
            <div style={{
              fontSize: "11px", fontWeight: 800, color: "#00B894",
              textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px",
            }}>Where It Lives</div>
            <div style={{
              fontSize: "15px", color: "rgba(255,255,255,0.8)",
              fontWeight: 600, lineHeight: 1.5,
            }}>{animal.habitat} · {animal.regions.join(", ")}</div>
          </div>
        </div>

        {/* Fun Facts */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "20px 24px",
          marginBottom: "12px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: `4px solid ${animal.color}`,
        }}>
          <div style={{
            fontSize: "11px", fontWeight: 800, color: animal.color,
            textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px",
          }}>🤩 Fun Facts</div>
          {animal.funFacts.map((fact, i) => (
            <div key={i} style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.8)",
              fontWeight: 600,
              lineHeight: 1.6,
              padding: "10px 0",
              borderBottom: i < animal.funFacts.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>{fact}</div>
          ))}
        </div>

        {/* Creation Fact */}
        <div style={{
          background: `linear-gradient(135deg, ${animal.color}18, ${animal.color}08)`,
          borderRadius: "20px",
          padding: "20px 24px",
          marginBottom: "16px",
          border: `1px solid ${animal.color}33`,
        }}>
          <div style={{
            fontSize: "11px", fontWeight: 800, color: animal.color,
            textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px",
          }}>✦ Creation Fact</div>
          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
            lineHeight: 1.6,
            margin: "0 0 10px",
            fontStyle: "italic",
          }}>{animal.creationNote}</p>
          <div style={{
            fontSize: "12px", color: "rgba(255,255,255,0.3)", fontWeight: 700,
          }}>Psalm 19:1</div>
        </div>

       {/* Habitat Map */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{
            fontSize: "11px",
            fontWeight: 800,
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: "12px",
          }}>🗺️ Habitat Map</div>
          <HabitatMap
            lat={animal.lat}
            lng={animal.lng}
            animalName={animal.name}
            region={animal.regions[0]}
            color={animal.color}
          />
        </div>

        {/* Explore more button */}
        <Link href="/animals" style={{
          display: "block",
          background: `linear-gradient(135deg, ${animal.color}, ${animal.color}99)`,
          color: "white",
          borderRadius: "50px",
          padding: "20px",
          textAlign: "center",
          textDecoration: "none",
          fontWeight: 900,
          fontSize: "20px",
        }}>🐾 Explore More Animals</Link>

        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.2)",
          fontSize: "12px",
          marginTop: "32px",
          fontStyle: "italic",
        }}>"The heavens declare the glory of God" — Psalm 19:1</p>

      </div>
    </main>
  );
}