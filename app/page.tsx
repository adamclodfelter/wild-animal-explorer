"use client"

export default function Home() {
  const categories = [
    { name: "Animals", emoji: "🐾", color: "#FF6B9D", slug: "animals" },
    { name: "Dinosaurs", emoji: "🦕", color: "#FF9F43", slug: "dinosaurs" },
    { name: "Space", emoji: "🚀", color: "#6C5CE7", slug: "space" },
    { name: "Robots", emoji: "🤖", color: "#00CEC9", slug: "robots" },
    { name: "Vehicles", emoji: "🚜", color: "#BADC58", slug: "vehicles" },
  ];

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      fontFamily: "'Nunito', Arial, sans-serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "72px", marginBottom: "10px" }}>🌍</div>
        <h1 style={{
          fontSize: "clamp(40px, 8vw, 72px)",
          fontWeight: 900,
          color: "white",
          margin: "0 0 10px",
          textShadow: "0 4px 20px rgba(0,0,0,0.2)",
          letterSpacing: "-1px",
        }}>Kallos Cosmos</h1>
        <p style={{
          fontSize: "20px",
          color: "rgba(255,255,255,0.85)",
          fontWeight: 700,
          margin: 0,
        }}>Explore the beautiful universe! 🌟</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "900px",
        marginBottom: "40px",
      }}>
        {categories.map((cat) => (
          <a key={cat.slug} href={`/${cat.slug}`} style={{
            background: cat.color,
            borderRadius: "28px",
            padding: "36px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            textDecoration: "none",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            transform: "translateY(0)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
          }}>
            <span style={{ fontSize: "72px", lineHeight: 1 }}>{cat.emoji}</span>
            <span style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "white",
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}>{cat.name}</span>
          </a>
        ))}
      </div>

      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
        More worlds coming soon! 🪐
      </p>
    </main>
  );
}