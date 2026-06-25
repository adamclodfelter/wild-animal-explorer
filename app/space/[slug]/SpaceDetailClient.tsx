"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SPACE_ITEMS, slugifyExplore } from "../../../data/explore";

const UNSPLASH_KEY = "8h_-JU-VsjZC2oL0rw5Rb9X_qQIbU1kxuahd1-YS3FA";

function ExploreGallery({ query, color, name }: { query: string; color: string; name: string }) {
  const [images, setImages] = useState<{ url: string; credit: string }[]>([]);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    )
      .then(r => r.json())
      .then(data => {
        const results = (data.results || []).map((p: any) => ({ url: p.urls.regular, credit: `© ${p.user.name} on Unsplash` }));
        if (results.length > 0) setImages(results);
        else setErrored(true);
      })
      .catch(() => setErrored(true));
  }, [query]);

  const prev = () => { setLoaded(false); setCurrent(i => (i - 1 + images.length) % images.length); };
  const next = () => { setLoaded(false); setCurrent(i => (i + 1) % images.length); };

  return (
    <div style={{ height: "300px", background: "#0d0d1a", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: color, zIndex: 2 }} />
      {images.length === 0 && !errored && <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)", fontWeight: 700, fontFamily: "'Nunito', Arial, sans-serif" }}>Loading photos...</div>}
      {errored && <div style={{ fontSize: "64px" }}>🔭</div>}
      {images.length > 0 && (
        <>
          <img key={current} src={images[current].url} alt={name} onLoad={() => setLoaded(true)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", zIndex: 2 }} />
          {images[current].credit && <div style={{ position: "absolute", bottom: "8px", left: "12px", fontSize: "10px", color: "rgba(255,255,255,0.35)", fontWeight: 600, zIndex: 3 }}>{images[current].credit}</div>}
          {images.length > 1 && (
            <>
              <button onClick={prev} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "20px", color: "white", cursor: "pointer", zIndex: 3 }}>‹</button>
              <button onClick={next} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "20px", color: "white", cursor: "pointer", zIndex: 3 }}>›</button>
              <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(0,0,0,0.5)", borderRadius: "50px", padding: "4px 12px", fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.6)", zIndex: 3 }}>{current + 1} / {images.length}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function SpaceDetailClient({ slug }: { slug: string }) {
  const item = SPACE_ITEMS.find(i => slugifyExplore(i.name) === slug);

  if (!item) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', Arial, sans-serif", color: "white" }}>
        <div style={{ fontSize: "64px" }}>🔭</div>
        <h1 style={{ fontSize: "32px", fontWeight: 900 }}>Not found!</h1>
        <Link href="/space" style={{ marginTop: "20px", background: "#6C5CE7", color: "white", borderRadius: "50px", padding: "14px 32px", textDecoration: "none", fontWeight: 800 }}>← Back to Space</Link>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Nunito', Arial, sans-serif" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <Link href="/space" style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", borderRadius: "50px", padding: "12px 28px", fontWeight: 800, fontSize: "16px", color: "white", textDecoration: "none", marginBottom: "24px", border: "1px solid rgba(255,255,255,0.2)" }}>← Back to Space</Link>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "28px", overflow: "hidden", border: `2px solid ${item.color}66`, marginBottom: "16px" }}>
          <ExploreGallery query={item.imageQuery} color={item.color} name={item.name} />
          <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "48px" }}>{item.emoji}</span>
              <div>
                <div style={{ background: `${item.color}33`, border: `1px solid ${item.color}66`, borderRadius: "50px", padding: "4px 14px", fontSize: "11px", color: item.color, fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase", display: "inline-block", marginBottom: "6px" }}>{item.category}</div>
                <h1 style={{ fontSize: "36px", fontWeight: 900, color: "white", margin: 0, lineHeight: 1 }}>{item.name}</h1>
              </div>
            </div>
            <div style={{ fontSize: "14px", color: item.color, fontWeight: 700, marginBottom: "12px" }}>aka "{item.nickname}"</div>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0, fontWeight: 600 }}>{item.description}</p>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "20px", padding: "20px 24px", marginBottom: "12px", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `4px solid ${item.color}` }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: item.color, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px" }}>🤩 Fun Facts</div>
          {item.funFacts.map((fact, i) => (
            <div key={i} style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", fontWeight: 600, lineHeight: 1.6, padding: "10px 0", borderBottom: i < item.funFacts.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>{fact}</div>
          ))}
        </div>

        <div style={{ background: `linear-gradient(135deg, ${item.color}18, ${item.color}08)`, borderRadius: "20px", padding: "20px 24px", marginBottom: "24px", border: `1px solid ${item.color}33` }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: item.color, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>✦ Creation Wonder</div>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", fontWeight: 600, lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>{item.creationNote}</p>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px" }}>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 600, lineHeight: 1.7, margin: "0 0 6px", fontStyle: "italic" }}>"The heavens declare the glory of God; the skies proclaim the work of his hands."</p>
            <div style={{ fontSize: "12px", color: item.color, fontWeight: 800 }}>— Psalm 19:1</div>
          </div>
        </div>

        <Link href="/space" style={{ display: "block", background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`, color: "white", borderRadius: "50px", padding: "20px", textAlign: "center", textDecoration: "none", fontWeight: 900, fontSize: "20px" }}>🚀 Explore More Space</Link>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "32px", fontStyle: "italic" }}>"The heavens declare the glory of God" — Psalm 19:1</p>
      </div>
    </main>
  );
}