"use client";

import Link from "next/link";
import { use } from "react";

const ANIMALS = [
  {
    name: "Axolotl", emoji: "🦎", color: "#FF6B9D", nickname: "the zombie lizard",
    superPower: "It can regrow its entire legs, heart, and even parts of its brain! 🤯",
    funFacts: ["Axolotls never really grow up — they stay in their baby water form their whole lives!", "Scientists study axolotls to learn how to help humans regrow body parts someday! 🔬", "Wild axolotls are critically endangered — there are more in pet tanks than in the wild! 😮"],
    whereItLives: "Lakes near Mexico City in Mexico 🇲🇽",
    whatItEats: "Worms, small fish, and little water bugs 🐛",
    sound: "Mostly silent — it's a sneaky swimmer! 🤫",
  },
  {
    name: "Quokka", emoji: "🐾", color: "#FF9F43", nickname: "the happiest animal",
    superPower: "Its face is always shaped into a big smile — it literally looks happy 24/7! 😁",
    funFacts: ["Quokkas are so friendly they'll walk right up to you for a selfie!", "Baby quokkas are called joeys and live in their mom's pouch — just like kangaroos! 🦘", "Quokkas can go months without drinking water — they get moisture from plants! 🌿"],
    whereItLives: "A small island called Rottnest Island in Australia 🇦🇺",
    whatItEats: "Leaves, grass, and plants 🌿",
    sound: "Soft grunts and squeaks 🐾",
  },
  {
    name: "Pangolin", emoji: "🦔", color: "#A29BFE", nickname: "the walking pinecone",
    superPower: "It rolls into a perfect armored ball when scared — nothing can crack it open! 🔮",
    funFacts: ["A pangolin's tongue is longer than its whole body!", "Pangolins are the most trafficked mammals on Earth — people need to protect them! 🙏", "Baby pangolins ride on their mom's tail when they travel — the cutest taxi ever! 🚕"],
    whereItLives: "Forests and grasslands in Africa and Asia 🌍",
    whatItEats: "Ants and termites — thousands every single day! 🐜",
    sound: "Hisses and puffs when nervous 💨",
  },
  {
    name: "Narwhal", emoji: "🦄", color: "#81ECEC", nickname: "the unicorn of the sea",
    superPower: "Its giant spiral tusk is actually a tooth that can sense temperature and salt in the water! 🌊",
    funFacts: ["Narwhals can dive deeper than 5,000 feet — deeper than most submarines!", "The narwhal's tusk can grow up to 10 feet long — that's taller than most ceilings! 📏", "Groups of narwhals are called a blessing — because seeing one really is lucky! 🍀"],
    whereItLives: "Icy Arctic oceans near Canada and Greenland ❄️",
    whatItEats: "Fish, squid, and shrimp 🦑",
    sound: "Clicks, whistles, and knocking sounds underwater 🔊",
  },
  {
    name: "Shoebill Stork", emoji: "🦅", color: "#E17055", nickname: "the dinosaur bird",
    superPower: "Its giant shoe-shaped beak can snap up a whole lungfish in one bite! 👟",
    funFacts: ["Shoebills can stand perfectly still for hours — like a statue waiting for fish!", "Shoebill storks bow to each other as a greeting — very polite birds! 🎩", "They sometimes cool their eggs by pouring water on them from their beak! 💧"],
    whereItLives: "Swamps in East Africa 🌿",
    whatItEats: "Big fish, frogs, and even baby crocodiles! 🐊",
    sound: "Claps its huge beak together like a machine gun — clack clack clack! 💥",
  },
  {
    name: "Capybara", emoji: "🦫", color: "#A1887F", nickname: "the friendliest giant",
    superPower: "Every animal loves it — birds, monkeys, and even crocodiles chill on capybaras peacefully! 🕊️",
    funFacts: ["Capybaras are the world's largest rodents — basically a giant friendly guinea pig the size of a dog!", "Every other animal seems to love capybaras — birds, monkeys, even crocodiles sit on them! 🐊", "Capybaras eat their own poop in the morning to get extra nutrients — yuck but effective! 💩"],
    whereItLives: "Riverbanks and wetlands of South America 🌿",
    whatItEats: "Grass and aquatic plants 🌾",
    sound: "Purrs, barks, whistles, and clicks — very chatty! 💬",
  },
  {
    name: "Platypus", emoji: "🦆", color: "#00B894", nickname: "the impossible animal",
    superPower: "It can sense electricity from other animals through its bill — like having a superpower detector! ⚡",
    funFacts: ["When scientists first saw a platypus they thought someone was playing a prank!", "Male platypuses have venomous spurs on their back legs — one of the few venomous mammals! ☠️", "Platypuses don't have stomachs — food goes straight from their esophagus to their intestines! 🤯"],
    whereItLives: "Rivers and streams of eastern Australia 🇦🇺",
    whatItEats: "Worms, insects, and shellfish it finds underwater 🪱",
    sound: "Soft growling sounds — surprisingly cute! 🥰",
  },
  {
    name: "Tardigrade", emoji: "🦠", color: "#FAB1A0", nickname: "the water bear",
    superPower: "It can survive in outer space, volcanos, and being completely frozen — it's nearly indestructible! 🚀",
    funFacts: ["Tardigrades are so tiny you need a microscope to see them, but they're one of the toughest animals ever!", "Tardigrades have survived five mass extinctions — they outlived the dinosaurs! 🦕", "NASA sent tardigrades to the International Space Station and they survived just fine! 🚀"],
    whereItLives: "Everywhere on Earth — even Antarctica and the top of mountains 🌍",
    whatItEats: "Tiny plants and bacteria 🌱",
    sound: "Too tiny to make any sound! 🤫",
  },
  {
    name: "Wolverine", emoji: "🦡", color: "#636E72", nickname: "the tiny grizzly",
    superPower: "It can take down animals 10 times its size and has a bite strong enough to crush frozen bones! 💀",
    funFacts: ["Wolverines travel up to 15 miles every single day through deep snow without getting tired!", "A wolverine once chased a black bear away from its food — it fears nothing! 😤", "Wolverines have a special tooth rotated 90 degrees just for ripping frozen meat! 🦷"],
    whereItLives: "Frozen forests and mountains of the Arctic 🏔️",
    whatItEats: "Deer, rabbits, and whatever it can find — it never gives up on a meal! 🍖",
    sound: "Loud growls, screams, and hisses 😤",
  },
  {
    name: "Dumbo Octopus", emoji: "🐙", color: "#FDCB6E", nickname: "the deep sea flapper",
    superPower: "It has ear-like fins it flaps to swim — just like Dumbo the elephant! 🐘",
    funFacts: ["It lives deeper in the ocean than almost any other octopus — in total darkness!", "Dumbo octopuses were only discovered recently — there's still so much we don't know! 🔍", "They don't have an ink sac like other octopuses — no need when you live that deep! 🌑"],
    whereItLives: "The very deep ocean all around the world 🌊",
    whatItEats: "Worms and tiny sea creatures it finds on the ocean floor 🪱",
    sound: "Silent — sound doesn't work well in the deep ocean 🤫",
  },
];

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function AnimalPage({ params }) {
  const { slug } = use(params);
  const animal = ANIMALS.find(a => slugify(a.name) === slug);

  if (!animal) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', Arial, sans-serif" }}>
        <div style={{ fontSize: "64px" }}>🤔</div>
        <h1 style={{ fontSize: "32px", fontWeight: 900 }}>Animal not found!</h1>
        <Link href="/animals" style={{ marginTop: "20px", background: "#6C5CE7", color: "white", borderRadius: "50px", padding: "14px 32px", textDecoration: "none", fontWeight: 800, fontSize: "18px" }}>← Back to Animals</Link>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8d7e3 0%, #ffeaa7 100%)",
      padding: "40px 20px",
      fontFamily: "'Nunito', Arial, sans-serif",
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Link href="/animals" style={{
          display: "inline-block",
          background: "white",
          borderRadius: "50px",
          padding: "10px 24px",
          fontWeight: 800,
          fontSize: "15px",
          color: "#636E72",
          textDecoration: "none",
          marginBottom: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}>← Back to Animals</Link>

        <div style={{ background: "white", borderRadius: "28px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", marginBottom: "16px", borderTop: `8px solid ${animal.color}` }}>
          <div style={{ background: animal.color + "22", height: "180px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "100px" }}>
            {animal.emoji}
          </div>
          <div style={{ padding: "24px" }}>
            <h1 style={{ fontSize: "40px", fontWeight: 900, color: "#2D3436", margin: "0 0 8px" }}>{animal.name}</h1>
            <div style={{ display: "inline-block", background: animal.color + "22", color: animal.color, borderRadius: "20px", padding: "4px 16px", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
              aka "{animal.nickname}"
            </div>
          </div>
        </div>

        {[
          { icon: "⚡", label: "Super Power", text: animal.superPower, color: "#6C5CE7" },
          { icon: "🍽️", label: "What It Eats", text: animal.whatItEats, color: "#E17055" },
          { icon: "📍", label: "Where It Lives", text: animal.whereItLives, color: "#00B894" },
          { icon: "🔊", label: "Its Sound", text: animal.sound, color: "#0984E3" },
        ].map((card, i) => (
          <div key={i} style={{ background: "white", borderRadius: "20px", padding: "18px 20px", marginBottom: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", display: "flex", gap: "14px", alignItems: "flex-start", borderLeft: `5px solid ${card.color}` }}>
            <span style={{ fontSize: "28px", lineHeight: 1, flexShrink: 0 }}>{card.icon}</span>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: card.color, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>{card.label}</div>
              <div style={{ fontSize: "16px", color: "#2D3436", fontWeight: 600, lineHeight: 1.5 }}>{card.text}</div>
            </div>
          </div>
        ))}

        <div style={{ background: "white", borderRadius: "20px", padding: "18px 20px", marginBottom: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", borderLeft: "5px solid #E84393" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#E84393", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px" }}>🤩 Fun Facts</div>
          {animal.funFacts.map((fact, i) => (
            <div key={i} style={{ fontSize: "15px", color: "#2D3436", fontWeight: 600, lineHeight: 1.5, padding: "10px 0", borderBottom: i < animal.funFacts.length - 1 ? "1px solid #F0F0F0" : "none" }}>
              {fact}
            </div>
          ))}
        </div>

        <Link href="/animals" style={{
          display: "block",
          background: "linear-gradient(135deg, #FF6B9D, #FF9F43)",
          color: "white",
          borderRadius: "50px",
          padding: "18px",
          textAlign: "center",
          textDecoration: "none",
          fontWeight: 900,
          fontSize: "20px",
          boxShadow: "0 6px 20px rgba(255,107,157,0.4)",
        }}>🐾 Explore More Animals!</Link>
      </div>
    </main>
  );
}