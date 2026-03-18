"use client";

import { useState } from "react";

type PersonalityKey = "bold-adventurer" | "cozy-classic" | "sweet-enthusiast" | "night-owl";

interface Question {
  text: string;
  category: string;
  options: { emoji: string; label: string; personality: PersonalityKey }[];
}


const questions: Question[] = [
  {
    text: "Seu fim de semana ideal começa com:",
    category: "Estilo de Vida",
    options: [
      { emoji: "🏃", label: "Uma corrida cedo — o dia não vai esperar por mim", personality: "bold-adventurer" },
      { emoji: "🛋️", label: "Café na cama com uma série — sem pressa", personality: "cozy-classic" },
      { emoji: "🎂", label: "Brunch animado com amigos", personality: "sweet-enthusiast" },
      { emoji: "🌙", label: "Acordar tarde e aproveitar a noite que vai até de madrugada", personality: "night-owl" },
    ],
  },
  {
    text: "Qual série você maratona?",
    category: "Pop Culture",
    options: [
      { emoji: "⚡", label: "Breaking Bad ou The Bear — intensidade total", personality: "bold-adventurer" },
      { emoji: "🍂", label: "Gilmore Girls ou Schitt's Creek — conforto puro", personality: "cozy-classic" },
      { emoji: "💕", label: "Emily in Paris ou Sex Education — leve e divertido", personality: "sweet-enthusiast" },
      { emoji: "🌑", label: "Dark ou Black Mirror — quanto mais sombrio, melhor", personality: "night-owl" },
    ],
  },
  {
    text: "Se você fosse um horário do dia:",
    category: "Mundo Abstrato",
    options: [
      { emoji: "🌅", label: "6h da manhã — cheio de energia", personality: "bold-adventurer" },
      { emoji: "☀️", label: "10h — o dia começou bem", personality: "cozy-classic" },
      { emoji: "🌤️", label: "15h — depois do almoço, no pique", personality: "sweet-enthusiast" },
      { emoji: "🌙", label: "2h da madrugada — quando o mundo dorme e eu floresço", personality: "night-owl" },
    ],
  },
  {
    text: "No trabalho, você é o tipo que:",
    category: "Estilo de Vida",
    options: [
      { emoji: "🎯", label: "Define metas agressivas e não para até atingir", personality: "bold-adventurer" },
      { emoji: "📋", label: "Tem rotina organizada e segue o plano", personality: "cozy-classic" },
      { emoji: "🤝", label: "Trabalha melhor em equipe, adora colaborar", personality: "sweet-enthusiast" },
      { emoji: "🦉", label: "Produz mais à noite quando todo mundo já foi embora", personality: "night-owl" },
    ],
  },
  {
    text: "Você escolhe um personagem para ser:",
    category: "Pop Culture",
    options: [
      { emoji: "🔥", label: "Tony Stark / Ron Weasley — determinado e direto", personality: "bold-adventurer" },
      { emoji: "🏡", label: "Bilbo Bolseiro — prefere o lar ao perigo", personality: "cozy-classic" },
      { emoji: "✨", label: "Leslie Knope — otimista e apaixonada por tudo", personality: "sweet-enthusiast" },
      { emoji: "🦇", label: "Batman — trabalha melhor nas sombras", personality: "night-owl" },
    ],
  },
  {
    text: "Você está perdido numa ilha. O que leva?",
    category: "Mundo Abstrato",
    options: [
      { emoji: "🔪", label: "Facão — vou sobreviver e sair daqui", personality: "bold-adventurer" },
      { emoji: "📚", label: "Livro favorito — se vou ficar, que seja confortável", personality: "cozy-classic" },
      { emoji: "🍫", label: "Chocolate — a vida sem prazer não vale", personality: "sweet-enthusiast" },
      { emoji: "🔭", label: "Telescópio — vou observar as estrelas a noite toda", personality: "night-owl" },
    ],
  },
];

interface Personality {
  name: string;
  drink: string;
  drinkEmoji: string;
  tagline: string;
  emoji: string;
  color: string;
  gradient: string;
  reward: string;
}

const personalities: Record<PersonalityKey, Personality> = {
  "bold-adventurer": {
    name: "The Bold Adventurer",
    drink: "Double Espresso",
    drinkEmoji: "☕",
    tagline: "Você não tem tempo pra perder — viva no limite, um gole de cada vez.",
    emoji: "⚡",
    color: "#6B4226",
    gradient: "linear-gradient(135deg, #3D1F0D 0%, #6B4226 60%, #A0714F 100%)",
    reward: "Ganhe 1 Double Espresso grátis na sua próxima visita!",
  },
  "cozy-classic": {
    name: "The Cozy Classic",
    drink: "Café Coado Médio",
    drinkEmoji: "☕",
    tagline: "Simples, confortável e sempre reconfortante — como um abraço em xícara.",
    emoji: "🏡",
    color: "#8B6914",
    gradient: "linear-gradient(135deg, #C9A84C 0%, #8B6914 60%, #5C4209 100%)",
    reward: "Ganhe 1 Café Coado grátis na sua próxima visita!",
  },
  "sweet-enthusiast": {
    name: "The Sweet Enthusiast",
    drink: "Latte de Caramelo",
    drinkEmoji: "🥛",
    tagline: "A vida é melhor com um toque de doçura. Você espalha alegria por onde passa.",
    emoji: "🧁",
    color: "#A0714F",
    gradient: "linear-gradient(135deg, #F5D08A 0%, #C9956A 60%, #A0714F 100%)",
    reward: "Ganhe 1 Latte de Caramelo grátis na sua próxima visita!",
  },
  "night-owl": {
    name: "The Night Owl",
    drink: "Red Eye",
    drinkEmoji: "🌑",
    tagline: "Enquanto o mundo dorme, você cria. A madrugada é sua hora mágica.",
    emoji: "🌙",
    color: "#4A3728",
    gradient: "linear-gradient(135deg, #1A0F0A 0%, #2D1B12 60%, #4A3728 100%)",
    reward: "Ganhe 1 Red Eye grátis na sua próxima visita!",
  },
};

const TIEBREAK_ORDER: PersonalityKey[] = [
  "bold-adventurer",
  "night-owl",
  "sweet-enthusiast",
  "cozy-classic",
];

function calculateResult(answers: PersonalityKey[]): PersonalityKey {
  const counts: Record<PersonalityKey, number> = {
    "bold-adventurer": 0,
    "cozy-classic": 0,
    "sweet-enthusiast": 0,
    "night-owl": 0,
  };
  for (const a of answers) counts[a]++;
  const max = Math.max(...Object.values(counts));
  return TIEBREAK_ORDER.find((k) => counts[k] === max)!;
}

export default function Home() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<PersonalityKey[]>([]);
  const [selected, setSelected] = useState<PersonalityKey | null>(null);
  const [result, setResult] = useState<PersonalityKey | null>(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  function startQuiz() {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setRewardClaimed(false);
    setScreen("quiz");
  }

  function handleSelect(personality: PersonalityKey) {
    setSelected(personality);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    if (currentQ + 1 < questions.length) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      const winner = calculateResult(newAnswers);
      setResult(winner);
      setScreen("result");
    }
  }

  const cardStyle: React.CSSProperties = {
    background: "var(--card-bg)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(107, 66, 38, 0.12)",
    padding: "40px",
    maxWidth: "560px",
    width: "100%",
  };

  const btnPrimaryStyle: React.CSSProperties = {
    background: "var(--brown)",
    color: "#FFFDF8",
    border: "none",
    borderRadius: "9999px",
    padding: "14px 36px",
    fontSize: "16px",
    fontFamily: "var(--font-inter)",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  };

  // ── INTRO ────────────────────────────────────────────────────────────────
  if (screen === "intro") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>☕</div>
            <h1 style={{ fontFamily: "var(--font-lora)", fontSize: "32px", fontWeight: 700, color: "var(--brown)", marginBottom: "12px", lineHeight: 1.3 }}>
              Qual é a sua personalidade de café?
            </h1>
            <p style={{ fontFamily: "var(--font-inter)", color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.7, marginBottom: "8px" }}>
              Descubra seu perfil com 6 perguntas rápidas e receba uma recomendação personalizada da Basecamp Coffee — feita especialmente pra você.
            </p>
            <p style={{ fontFamily: "var(--font-inter)", color: "var(--caramel-light)", fontSize: "14px", marginBottom: "32px" }}>
              Leva menos de 2 minutos ✨
            </p>
            <button
              style={btnPrimaryStyle}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={startQuiz}
            >
              Descobrir minha personalidade
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={cardStyle}>
          {/* Progress bar */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {q.category}
              </span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "var(--text-secondary)" }}>
                {currentQ + 1} / {questions.length}
              </span>
            </div>
            <div style={{ background: "#E8D5B7", borderRadius: "9999px", height: "6px", overflow: "hidden" }}>
              <div style={{ background: "var(--caramel)", height: "100%", borderRadius: "9999px", width: `${progress}%`, transition: "width 0.3s ease" }} />
            </div>
          </div>

          {/* Question */}
          <h2 style={{ fontFamily: "var(--font-lora)", fontSize: "22px", fontWeight: 600, color: "var(--brown)", marginBottom: "24px", lineHeight: 1.4 }}>
            {q.text}
          </h2>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {q.options.map((opt) => {
              const isSelected = selected === opt.personality;
              return (
                <button
                  key={opt.personality}
                  onClick={() => handleSelect(opt.personality)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid var(--caramel)" : "2px solid #E8D5B7",
                    background: isSelected ? "#FFF3E6" : "#FFFDF8",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    fontFamily: "var(--font-inter)",
                    fontSize: "15px",
                    color: isSelected ? "var(--brown)" : "var(--text-secondary)",
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  <span style={{ fontSize: "24px", flexShrink: 0 }}>{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <div style={{ textAlign: "right" }}>
            <button
              onClick={handleNext}
              disabled={!selected}
              style={{
                ...btnPrimaryStyle,
                opacity: selected ? 1 : 0.4,
                cursor: selected ? "pointer" : "not-allowed",
              }}
            >
              {currentQ + 1 === questions.length ? "Ver resultado" : "Próxima →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ───────────────────────────────────────────────────────────────
  if (screen === "result" && result) {
    const p = personalities[result];

    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center" }}>

            {/* Coffee image card */}
            <div style={{
              background: p.gradient,
              borderRadius: "16px",
              height: "180px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              gap: "8px",
              boxShadow: `0 4px 20px ${p.color}40`,
            }}>
              <span style={{ fontSize: "56px" }}>{p.drinkEmoji}</span>
              <span style={{ fontFamily: "var(--font-lora)", fontSize: "18px", fontWeight: 600, color: "#FFFDF8", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                {p.drink}
              </span>
            </div>

            <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "var(--caramel)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px", fontWeight: 600 }}>
              Sua personalidade é
            </p>
            <h2 style={{ fontFamily: "var(--font-lora)", fontSize: "28px", fontWeight: 700, color: "var(--brown)", marginBottom: "12px", lineHeight: 1.3 }}>
              {p.emoji} {p.name}
            </h2>

            <p style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "24px", fontStyle: "italic" }}>
              &ldquo;{p.tagline}&rdquo;
            </p>

            {/* Reward section */}
            {rewardClaimed ? (
              <div style={{
                background: "#F0FFF4",
                border: "2px solid #68C97A",
                borderRadius: "12px",
                padding: "16px 20px",
                marginBottom: "24px",
              }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "22px", marginBottom: "6px" }}>🎉</p>
                <p style={{ fontFamily: "var(--font-lora)", fontSize: "16px", fontWeight: 600, color: "#2D6A37", marginBottom: "4px" }}>
                  Recompensa resgatada!
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#4A8C57" }}>
                  {p.reward} Mostre este código para o barista: <strong>BC-{result.toUpperCase().slice(0, 4)}-2026</strong>
                </p>
              </div>
            ) : (
              <div style={{
                background: `${p.color}10`,
                border: `1px solid ${p.color}30`,
                borderRadius: "12px",
                padding: "14px 20px",
                marginBottom: "24px",
              }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "var(--text-secondary)" }}>
                  🎁 {p.reward}
                </p>
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={startQuiz}
                style={{
                  ...btnPrimaryStyle,
                  background: "transparent",
                  color: "var(--brown)",
                  border: "2px solid var(--brown)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#6B422210")}
                onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Fazer de novo
              </button>
              {!rewardClaimed && (
                <button
                  onClick={() => setRewardClaimed(true)}
                  style={btnPrimaryStyle}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Resgatar recompensa
                </button>
              )}
            </div>

            <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "var(--caramel-light)", marginTop: "24px" }}>
              Basecamp Coffee — o café que sabe seu nome ☕
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
