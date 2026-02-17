// app/api/kim-chat/route.ts
import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

type Turn = { role: "user" | "assistant"; content: string };

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const MODEL = "claude-3-5-haiku-20241022"; // pick your current model


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

    const result = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 220,
      temperature: 0.6,
      system: [
        { type: "text", text: RULES },
        { type: "text", text: `PROFILE:\n${PROFILE}`, cache_control: { type: "ephemeral" } },
      ],
      messages: [
        ...fewShotsAsMessages(),
        ...historyAsMessages(safeHistory),
        { role: "user", content: msg }, // append the new turn ONCE
      ],
    });

    const reply = result.content?.[0]?.type === "text" ? result.content[0].text : "";
    return Response.json({ reply  });
  } catch (e) {
    console.error(e);
    return Response.json({ reply: "Sorry—something went wrong." }, { status: 500 });
  }
}


// // app/api/kim-chat/route.ts
// import { NextRequest } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const runtime = "nodejs";

// type Turn = { role: "user" | "assistant"; content: string };

// const MODEL = "gemini-2.5-flash-lite";
// const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

// // ---- Static (effectively "cached") prompt bits ----
// const PROFILE = `
// Kim Chhorn Sambath — Last updated: 2025-05
// Summary: CS student interested in AI, blockchain, web & game development.
// Education: SFU (Computing Science); previously Langara (Assoc. of Science).
// Research: Undergrad RA (TypeScript static analysis with ts-morph; async anti-patterns; testability metrics; LLM-assisted code transforms).
// Skills: Node.js, React/Next.js, TypeScript/JavaScript, Tailwind, Postgres, Git, Docker.
// Projects: Deep Phishing (Next.js + OpenAI), Countries Explorer (Express + MongoDB), etc.
// Availability: Spring 2025 co-op.
// `;

// const FEW_SHOTS: Array<{ user: string; assistant: string }> = [
//   { user: "What are Kim's core skills?",
//     assistant: "Core strengths: TypeScript/JavaScript, React/Next.js, Node.js, Tailwind, Git, and Docker. Experience with Postgres and building small full-stack apps." },
//   { user: "Is Kim doing research?",
//     assistant: "Yes—Kim is an undergrad research assistant working on TypeScript static analysis (ts-morph), detecting async anti-patterns, and LLM-assisted code refactoring." },
//   { user: "Is Kim available for co-op soon?",
//     assistant: "Kim is targeting Spring 2025 co-op. If you have a role, feel free to reach out." },
// ];

// const RULES = `
// You are Kim's AI assistant. Use the PROFILE & examples as truth.
// Keep answers ≤120 words; be concise, positive, and professional.
// If unsure, say you don't know.
// `;

// // helpers
// function fewShotContents() {
//   return FEW_SHOTS.flatMap((ex) => [
//     { role: "user" as const,  parts: [{ text: ex.user }] },
//     { role: "model" as const, parts: [{ text: ex.assistant }] },
//   ]);
// }
// function liveContents(history: Turn[]) {
//   return history.map((t) => ({
//     role: t.role === "user" ? ("user" as const) : ("model" as const),
//     parts: [{ text: t.content }],
//   }));
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { message, history } = (await req.json()) as {
//       message: string;
//       history?: Turn[];
//     };

//     if (!message?.trim()) {
//       return Response.json({ reply: "Please enter a message." }, { status: 400 });
//     }

//     // Guard: accept only last 8 turns from client (stateless window)
//     const safeHistory = Array.isArray(history) ? history.slice(-8) : [];

//     // Compose prompt: server-owned systemInstruction + few-shots + client history + new user msg
//     const model = genAI.getGenerativeModel({
//       model: MODEL,
//       systemInstruction: `${RULES}\n\nPROFILE:\n${PROFILE}`,
//     });

//     const contents = [
//       ...fewShotContents(),
//       ...liveContents(safeHistory),
//       { role: "user" as const, parts: [{ text: message.trim() }] },
//     ];

//     const resp = await model.generateContent({
//       contents,
//       generationConfig: { maxOutputTokens: 220, temperature: 0.6 },
//     });

//     const text = resp.response.text();
//     return Response.json({ reply: text });
//   } catch (e) {
//     console.error(e);
//     return Response.json({ reply: "Sorry—something went wrong." }, { status: 500 });
//   }
// }
