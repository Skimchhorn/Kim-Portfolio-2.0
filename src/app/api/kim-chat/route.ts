// app/api/kim-chat/route.ts
import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

type Turn = { role: "user" | "assistant"; content: string };

const ANTHROPIC_MODEL = "claude-3-haiku-20240307";


const RULES = `
You are Kim's AI assistant. Use the PROFILE & examples as truth.
Keep answers ≤120 words; be concise, positive, and professional.
If unsure, say you don't know.
`;
const PROFILE = `Kimchhorn Sambath — Last updated: 2025-11
Summary: CS student at Simon Fraser University (transfer from Langara), focused on AI, blockchain, web, and game development. Currently building Drip.ai (AI fashion assistant) and KeyGod (repurposes phones/tablets as PC keyboards).
Research: RA with Prof. Saba Alimadadi on TypeScript static analysis, async anti-patterns, testability metrics, and LLM-assisted repairs.
Skills: Node.js, React/Next.js, TypeScript/JavaScript, Tailwind, Postgres, Docker, Git/GitHub/GitLab, Azure, CI/CD, TDD; also C++, Java, Python, Unity ML-Agents.
Projects:
Drip.ai (done): AI-powered styling assistant (Next.js, Tailwind, LLMs); exploring scalable partner/brand model.
KeyGod (in development): iPad/phone → PC keyboard (Rust, Swift, WebSocket, Enigo, Tokio); expands low-cost access and reduces e-waste.
AI NPC Conversation System (done): Godot 4 game where player must calm down an angry girlfriend NPC through natural conversation to reach a score of 100. Features LLM-driven dialogue, dynamic mood/relationship states, sentiment-based mood engine (Trust, Patience, Calm metrics), built-in safety guardrails to prevent toxic responses, short-term + long-term memory, visible mood UI + feedback system, and mood-driven animations. Built in 4-person hackathon team with focus on respectful, safe interactions.
Portfolio 2.0 (done)— Next.js + Anthropic API (Vercel)
Ceasefire.com (in development) — Next.js + Postgres, Docker, AWS
RL Shooter Agent (done) — Unity + ML-Agents
Deep Phishing (done) — Best Project Award; AI phishing detection
Calculator App (done) — JavaFx Java OOP project
Interests & Lifestyle: Fishing, gym, hiking/camping, soccer, volleyball, guitar (R&B/pop). Likes tacos, sushi/sashimi, Asian & Mexican food. No coffee/sweet drinks. Drives (Class 7).
Personal Traits: Long-term thinker, committed, proactive, takes initiative, funny.
Travel: Asia experience (China—Beijing, Hong Kong, Shanghai, Shenzhen, Macau; Thailand, Cambodia, Vietnam, Laos, Malaysia, Singapore).
Experience: Langara Global volunteer (student support, events, communications).
`;

const FEW_SHOTS: Array<{ user: string; assistant: string }> = [
  { user: "What are Kim's core skills?",
    assistant: "Core strengths: Java, TypeScript/JavaScript, React/Next.js, Node.js, Tailwind, Git, and Docker. Experience with Postgres and building small full-stack apps." },
  { user: "Is Kim doing research?",
    assistant: "Yes—Kim is an undergrad research assistant working on TypeScript static analysis (ts-morph), detecting async anti-patterns, and LLM-assisted code refactoring." },
  { user: "Is Kim available for co-op soon?",
    assistant: "Kim is targeting Winter 2026 co-op. If you have a role, feel free to reach out." },
];

function fewShotsAsMessages() {
  return FEW_SHOTS.flatMap((ex) => ([
    { role: "user" as const, content: ex.user },
    { role: "assistant" as const, content: ex.assistant },
  ]));
}

function historyAsMessages(history: Turn[]) {
  return history.slice(-8).map(m => ({
    role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
    content: m.content,
  }));
}

async function askAnthropic(message: string, history: Turn[]) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY");
  }

  const anthropic = new Anthropic({ apiKey });
  const result = await anthropic.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 220,
    temperature: 0.6,
    system: [
      { type: "text", text: RULES },
      { type: "text", text: `PROFILE:\n${PROFILE}`, cache_control: { type: "ephemeral" } },
    ],
    messages: [
      ...fewShotsAsMessages(),
      ...historyAsMessages(history),
      { role: "user", content: message },
    ],
  });

  const text = result.content?.[0]?.type === "text" ? result.content[0].text : "";
  return text || "I could not generate a response right now.";
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = (await req.json()) as { message?: string; history?: Turn[] };
    const msg = (message ?? "").trim();
    if (!msg) return Response.json({ reply: "Please enter a message." }, { status: 400 });

    const safeHistory = Array.isArray(history)
      ? history.filter((t): t is Turn =>
          t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string"
        )
      : [];

    const hasAnthropic = Boolean(process.env.ANTHROPIC_API_KEY);

    if (!hasAnthropic) {
      return Response.json(
        {
          reply: "Server is missing API key. Add ANTHROPIC_API_KEY in your environment.",
        },
        { status: 500 }
      );
    }

    const reply = await askAnthropic(msg, safeHistory);

    return Response.json({ reply });
  } catch (e) {
    console.error(e);
    return Response.json(
      { reply: "Sorry-something went wrong on the server. Please try again." },
      { status: 500 }
    );
  }
}
