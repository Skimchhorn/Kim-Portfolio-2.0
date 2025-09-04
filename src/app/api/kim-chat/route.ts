// app/api/kim-chat/route.ts
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs"; // ensures Node runtime (good for server SDKs)

type Turn = { role: "user" | "assistant"; content: string };

// ---- 1) Model & client ----
const MODEL = "gemini-2.5-flash-lite"; // <- ensure this model exists in your account/region
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

// ---- 2) Your static context (PROFILE + few-shots) ----
const PROFILE = `
Kim Chhorn Sambath — Last updated: 2025-05
Summary: CS student interested in AI, blockchain, web & game development.
Education: SFU (Computing Science); previously Langara (Assoc. of Science).
Research: Undergrad RA (TypeScript static analysis with ts-morph; async anti-patterns; testability metrics; LLM-assisted code transforms).
Skills: Node.js, React/Next.js, TypeScript/JavaScript, Tailwind, Postgres, Git, Docker.
Projects: Deep Phishing (Next.js + OpenAI), Countries Explorer (Express + MongoDB), etc.
Availability: Spring 2025 co-op.
`;

const FEW_SHOTS: Array<{ user: string; assistant: string }> = [
  {
    user: "What are Kim's core skills?",
    assistant:
      "Core strengths: TypeScript/JavaScript, React/Next.js, Node.js, Tailwind, Git, and Docker. Experience with Postgres and building small full-stack apps.",
  },
  {
    user: "Is Kim doing research?",
    assistant:
      "Yes—Kim is an undergrad research assistant working on TypeScript static analysis (ts-morph), detecting async anti-patterns, and LLM-assisted code refactoring.",
  },
  {
    user: "Is Kim available for co-op soon?",
    assistant:
      "Kim is targeting Spring 2025 co-op. If you have a role, feel free to reach out.",
  },
];

const RULES = `
You are Kim's AI assistant. Use the PROFILE & examples as truth.
Keep answers ≤120 words; be concise, positive, and professional.
If unsure, say you don't know.
`;

// ---- 3) Very small in-memory session store (replace w/ Redis/DB in prod) ----
const SESSIONS = new Map<string, Turn[]>();

async function getSessionId() {
  const jar = await cookies();
  let sid = jar.get("kim_chat_sid")?.value;
  if (!sid) {
    sid = Math.random().toString(36).slice(2);
    jar.set("kim_chat_sid", sid, { httpOnly: true, sameSite: "lax", path: "/" });
  }
  return sid;
}

function getHistory(sid: string) {
  if (!SESSIONS.has(sid)) SESSIONS.set(sid, []);
  return SESSIONS.get(sid)!;
}

function pushAndTrim(history: Turn[], turn: Turn, maxTurns = 8) {
  history.push(turn);
  if (history.length > maxTurns) history.splice(0, history.length - maxTurns);
}

// Helper: map your few-shots to the SDK's "contents" format
function fewShotContents() {
  return FEW_SHOTS.flatMap((ex) => [
    { role: "user" as const,  parts: [{ text: ex.user }] },
    // NOTE: in @google/generative-ai the assistant role is "model"
    { role: "model" as const, parts: [{ text: ex.assistant }] },
  ]);
}

// Helper: map live session turns to contents
function liveContents(history: Turn[]) {
  return history.map((t) => ({
    role: t.role === "user" ? ("user" as const) : ("model" as const),
    parts: [{ text: t.content }],
  }));
}

// ---- 4) API handler ----
export async function POST(req: NextRequest) {
  try {
    const { message } = (await req.json()) as { message: string };
    if (!message || !message.trim()) {
      return new Response(JSON.stringify({ reply: "Please enter a message." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sid = getSessionId();
    const history = getHistory(sid);

    // add user's message to session history
    pushAndTrim(history, { role: "user", content: message.trim() });

    // Build model with system instruction (rules + profile)
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: `${RULES}\n\nPROFILE:\n${PROFILE}`,
    });

    // Compose final contents: few-shots + live short window
    const contents = [...fewShotContents(), ...liveContents(history)];

    const resp = await model.generateContent({
      contents,
      generationConfig: {
        maxOutputTokens: 220,
        temperature: 0.6,
      },
    });

    const text = resp.response.text(); // <- convenient helper

    // append assistant turn to session history
    pushAndTrim(history, { role: "assistant", content: text });

    return new Response(JSON.stringify({ reply: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ reply: "Sorry—something went wrong." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
