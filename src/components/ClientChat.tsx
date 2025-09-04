"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ClientChat({
  endpoint = "/api/kim-chat",
  starter = "Hi! Ask me anything about Kim.",
  className = "",
}: {
  endpoint?: string;
  starter?: string;
  className?: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: starter }]);
  const [input, setInput] = useState("hello");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // auto-scroll to bottom
  useEffect(() => {
    const el = listRef.current; 
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function send(text?: string) {
    const prompt = (text ?? input).trim();
    if (!prompt || loading) return;

    setInput("");
    const next = [...messages, { role: "user", content: prompt } as Msg];
    setMessages(next);
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "Request failed");
        throw new Error(errText);
      }

      // Try streaming; if not, fall back to JSON { reply }
      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        setMessages((m) => [...m, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((m) => {
            const copy = m.slice();
            copy[copy.length - 1] = { role: "assistant", content: acc };
            return copy;
          });
        }

        // Some APIs stream JSON lines; if yours sends a final JSON, you can parse here.
      } else {
        const data = (await res.json()) as { reply: string };
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch (e) {
      console.error(e);
      setMessages((m) => [...m, { role: "assistant", content: "Sorry—something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send();
  }

  function stop() {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
  }

  return (
    <div className={className}>
      {/* messages */}
        <div
        ref={listRef}
        className="h-[380px] overflow-y-auto overflow-x-hidden space-y-3 pr-2 nice-scrollbar"
        aria-live="polite"
        >
        {messages.map((m, i) => (
            <Bubble key={i} role={m.role} text={m.content} />
        ))}
        {loading && <Typing />}
        </div>
      {/* input */}
      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about skills, projects, education, experience....."
          className="flex-1 resize-none rounded-xl bg-[#0f1016] border border-white/10 px-3 py-2 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
        />
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-[1rem] bg-[var(--accent)] text-black font-semibold px-4 py-2 disabled:opacity-50"
          >
            Send
          </button>
          {loading && (
            <button
              type="button"
              onClick={stop}
              className="rounded-[1rem] bg-[#1a1b22] border border-white/10 px-4 py-2 text-sm"
            >
              Stop
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* --- Bubbles & bits --- */

// Bubble — add wrapping classes: whitespace-pre-wrap + break-words + break-all
function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          "whitespace-pre-wrap break-words break-all", // ← important for long content
          isUser
            ? "bg-[var(--accent)] text-black"
            : "bg-[#0f1016] border border-white/10 text-white",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}


function Typing() {
  return (
    <div className="flex items-center gap-2 text-[var(--muted)] text-sm">
      <span className="inline-block h-2 w-2 rounded-full bg-white/40 animate-bounce" />
      <span className="inline-block h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:120ms]" />
      <span className="inline-block h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:240ms]" />
      <span className="sr-only">Assistant is typing…</span>
    </div>
  );
}

/* QuickPrompt chip you can place above the chat */
export function QuickPrompt({ children }: { children: string }) {
  // This child component is only for markup; ClientChat reads its text if you wire it.
  return (
    <button
      type="button"
      data-quick-prompt
      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold"
      onClick={() => {
        // Optional: dispatch an event the main component can listen for.
        document.dispatchEvent(new CustomEvent("use-quick-prompt", { detail: String(children) }));
      }}
    >
      {children}
    </button>
  );
}

// Attach as a static property so you can import/use <ClientChat.QuickPrompt>
(ClientChat as any).QuickPrompt = QuickPrompt;
