import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kallos Cosmos",
    template: "%s | Kallos Cosmos",
  },
  description: "Explore the wonders of God's creation — animals, dinosaurs, space and more. A free Christian homeschool learning app for kids.",
  keywords: ["Christian homeschool", "kids animals", "creation science", "educational app for kids", "homeschool science", "animal facts for kids"],
  verification: {
    verification: {
    google: "DaZRSVTBLEcE94WJxKc4eu8UUsZaX1qGDIO9-byvwwQ",
  },
  },
  openGraph: {
    title: "Kallos Cosmos",
    description: "Explore the wonders of God's creation — animals, dinosaurs, space and more.",
    siteName: "Kallos Cosmos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kallos Cosmos",
    description: "Explore the wonders of God's creation — animals, dinosaurs, space and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ margin: 0, padding: 0, background: "#0f0c29" }}>

        <div style={{
          position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none",
        }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }}>
            {[
              [8,12],[15,45],[23,78],[31,23],[42,67],[51,34],[63,89],[72,12],[84,56],[91,34],
              [6,90],[17,61],[28,38],[39,82],[48,15],[57,74],[68,29],[77,51],[88,93],[95,7],
              [3,55],[11,28],[19,71],[27,44],[36,88],[44,19],[52,62],[61,37],[69,80],[78,25],
              [86,48],[93,72],[5,33],[13,66],[21,9],[29,52],[37,76],[45,41],[53,84],[62,16],
              [70,59],[79,32],[87,75],[94,20],[7,47],[16,83],[24,26],[32,69],[40,13],[49,57],
              [58,91],[66,35],[74,78],[82,22],[90,65],[2,40],[10,73],[18,17],[26,60],[34,95],
              [43,50],[50,85],[59,28],[67,71],[75,14],[83,58],[92,42],[4,87],[12,31],[20,64],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r={i % 5 === 0 ? "1.5" : i % 3 === 0 ? "1" : "0.6"}
                fill="white"
                opacity={i % 4 === 0 ? "0.9" : i % 3 === 0 ? "0.6" : "0.35"}
              />
            ))}
          </svg>

          <div style={{ position: "absolute", top: "6%", left: "5%", width: "80px", height: "80px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #fffde7, #f9a825 60%, #e65100)", boxShadow: "0 0 40px 10px rgba(249,168,37,0.25), 0 0 80px 20px rgba(249,168,37,0.1)", opacity: 0.85 }} />

          <div style={{ position: "absolute", top: "8%", right: "6%", width: "70px", height: "70px" }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "radial-gradient(circle at 38% 35%, #ffe0b2, #ff8f00 55%, #e65100)", boxShadow: "0 0 30px 8px rgba(255,143,0,0.2)", position: "absolute", top: 0, left: 0 }} />
            <div style={{ position: "absolute", top: "28px", left: "-22px", width: "114px", height: "18px", borderRadius: "50%", border: "4px solid rgba(255,200,100,0.5)", transform: "rotateX(70deg)", pointerEvents: "none" }} />
          </div>

          <div style={{ position: "absolute", bottom: "12%", left: "8%", width: "28px", height: "28px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #b2ebf2, #0097a7)", boxShadow: "0 0 16px 4px rgba(0,151,167,0.2)", opacity: 0.6 }} />

          <div style={{ position: "absolute", top: "30%", left: "60%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "60%", left: "20%", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,184,148,0.08) 0%, transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </div>

      </body>
    </html>
  );
}