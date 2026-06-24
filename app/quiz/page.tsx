"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ANIMALS } from "../../data/animals";

type Question = {
  question: string;
  answers: string[];
  correct: number;
  type: "multiple" | "truefalse";
};

function generateQuestions(): Question[] {
  const questions: Question[] = [];
  const shuffled = [...ANIMALS].sort(() => Math.random() - 0.5);

  shuffled.slice(0, 10).forEach((animal, i) => {
    const others = ANIMALS.filter(a => a.name !== animal.name);
    const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3);

    if (i % 3 === 0) {
      // True or False
      const fact = animal.funFacts[0];
      const isTrue = Math.random() > 0.5;
      questions.push({
        type: "truefalse",
        question: isTrue
          ? `True or False: ${fact}`
          : `True or False: The ${animal.name} is known as "${wrong[0].nickname}"`,
        answers: ["True", "False"],
        correct: isTrue ? 0 : 1,
      });
    } else {
      // Multiple choice — nickname or region
      const useRegion = i % 2 === 0;
      if (useRegion) {
        const wrongAnswers = wrong.map(a => a.regions[0]);
        const allAnswers = [animal.regions[0], ...wrongAnswers].sort(() => Math.random() - 0.5);
        questions.push({
          type: "multiple",
          question: `Where does the ${animal.name} live in the wild?`,
          answers: allAnswers,
          correct: allAnswers.indexOf(animal.regions[0]),
        });
      } else {
        const wrongAnswers = wrong.map(a => a.nickname);
        const allAnswers = [animal.nickname, ...wrongAnswers].sort(() => Math.random() - 0.5);
        questions.push({
          type: "multiple",
          question: `What is the ${animal.name}'s nickname?`,
          answers: allAnswers,
          correct: allAnswers.indexOf(animal.nickname),
        });
      }
    }
  });

  return questions;
}

function getBadge(score: number, total: number) {
  const pct = score / total;
  if (pct === 1) return { title: "Creation Master! 🏆", color: "#FFD700", desc: "Perfect score! You know God's creatures inside and out." };
  if (pct >= 0.8) return { title: "Animal Expert! 🌟", color: "#FF9F43", desc: "Incredible! You really know your animals." };
  if (pct >= 0.6) return { title: "Junior Naturalist! 🐾", color: "#00B894", desc: "Great job! You're becoming a real animal explorer." };
  if (pct >= 0.4) return { title: "Curious Explorer! 🔍", color: "#6C5CE7", desc: "Good effort! Keep exploring and you'll learn even more." };
  return { title: "Brave Beginner! 🌱", color: "#81ECEC", desc: "Every expert started somewhere. Try again!" };
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bonusFact, setBonusFact] = useState("");

  useEffect(() => {
    setQuestions(generateQuestions());
    const random = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    setBonusFact(`Did you know? ${random.funFacts[Math.floor(Math.random() * random.funFacts.length)]} — ${random.name}`);
  }, []);

  function handleAnswer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
    }, 900);
  }

  function restart() {
    setQuestions(generateQuestions());
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    const random = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    setBonusFact(`Did you know? ${random.funFacts[Math.floor(Math.random() * random.funFacts.length)]} — ${random.name}`);
  }

  if (questions.length === 0) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', Arial, sans-serif" }}>
        <div style={{ color: "white", fontSize: "24px", fontWeight: 800 }}>Loading quiz...</div>
      </main>
    );
  }

  const q = questions[current];
  const badge = getBadge(score, questions.length);
  const progress = ((current) / questions.length) * 100;

  if (finished) {
    return (
      <main style={{
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Nunito', Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>

          {/* Badge */}
          <div style={{
            background: `linear-gradient(135deg, ${badge.color}33, ${badge.color}11)`,
            border: `2px solid ${badge.color}66`,
            borderRadius: "28px",
            padding: "40px 32px",
            marginBottom: "20px",
          }}>
            <div style={{ fontSize: "80px", marginBottom: "16px" }}>🏅</div>
            <h1 style={{
              fontSize: "36px",
              fontWeight: 900,
              color: badge.color,
              margin: "0 0 8px",
            }}>{badge.title}</h1>
            <p style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
              margin: "0 0 20px",
            }}>{badge.desc}</p>
            <div style={{
              fontSize: "48px",
              fontWeight: 900,
              color: "white",
            }}>{score} / {questions.length}</div>
          </div>

          {/* Bonus fact */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "20px 24px",
            marginBottom: "24px",
            textAlign: "left",
          }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "8px",
            }}>✦ Your Bonus Fact</div>
            <p style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.8)",
              fontWeight: 600,
              lineHeight: 1.6,
              margin: 0,
              fontStyle: "italic",
            }}>{bonusFact}</p>
          </div>

          {/* Buttons */}
          <button onClick={restart} style={{
            display: "block",
            width: "100%",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "20px",
            fontSize: "20px",
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: "'Nunito', Arial, sans-serif",
            marginBottom: "12px",
          }}>🔄 Try Again</button>

          <Link href="/animals" style={{
            display: "block",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            borderRadius: "50px",
            padding: "16px",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "16px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>🐾 Back to Animals</Link>

          <p style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "12px",
            marginTop: "32px",
            fontStyle: "italic",
          }}>Psalm 19:1</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "'Nunito', Arial, sans-serif",
    }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <Link href="/" style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50px",
            padding: "10px 20px",
            color: "white",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "14px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}>← Home</Link>
          <div style={{
            color: "rgba(255,255,255,0.5)",
            fontWeight: 800,
            fontSize: "14px",
          }}>{current + 1} / {questions.length}</div>
        </div>

        {/* Progress bar */}
        <div style={{
          background: "rgba(255,255,255,0.08)",
          borderRadius: "50px",
          height: "8px",
          marginBottom: "32px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #6C5CE7, #81ECEC)",
            borderRadius: "50px",
            transition: "width 0.4s ease",
          }} />
        </div>

        {/* Score */}
        <div style={{
          textAlign: "right",
          color: "rgba(255,255,255,0.4)",
          fontSize: "13px",
          fontWeight: 800,
          marginBottom: "16px",
          letterSpacing: "0.5px",
        }}>Score: {score}</div>

        {/* Question card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "28px 24px",
          marginBottom: "20px",
        }}>
          <div style={{
            fontSize: "11px",
            fontWeight: 800,
            color: q.type === "truefalse" ? "#81ECEC" : "#FF9F43",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: "12px",
          }}>{q.type === "truefalse" ? "True or False" : "Multiple Choice"}</div>
          <p style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.4,
            margin: 0,
          }}>{q.question}</p>
        </div>

        {/* Answer buttons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}>
          {q.answers.map((answer, idx) => {
            let bg = "rgba(255,255,255,0.06)";
            let border = "1px solid rgba(255,255,255,0.12)";
            let color = "white";

            if (selected !== null) {
              if (idx === q.correct) {
                bg = "rgba(0,184,148,0.25)";
                border = "1px solid #00B894";
                color = "#00B894";
              } else if (idx === selected && selected !== q.correct) {
                bg = "rgba(225,112,85,0.25)";
                border = "1px solid #E17055";
                color = "#E17055";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                style={{
                  background: bg,
                  border,
                  borderRadius: "16px",
                  padding: "18px 24px",
                  fontSize: "17px",
                  fontWeight: 800,
                  color,
                  cursor: selected !== null ? "default" : "pointer",
                  fontFamily: "'Nunito', Arial, sans-serif",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                {answer}
              </button>
            );
          })}
        </div>

      </div>
    </main>
  );
}