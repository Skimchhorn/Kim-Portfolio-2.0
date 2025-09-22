// "use client";

// import { useEffect, useRef, useState } from "react";

// type Msg = { role: "user" | "assistant"; content: string };
// const MAX_WORDS = 40; 

// export default function ClientChat({
//   endpoint = "/api/kim-chat",
//   starter = "Hi! Ask me anything about Kim.",
//   className = "",
// }: {
//   endpoint?: string;
//   starter?: string;
//   className?: string;
// }) {
  
//   const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: starter }]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const listRef = useRef<HTMLDivElement>(null);
//   const abortRef = useRef<AbortController | null>(null);
//   const [error, setError] = useState<string>("");
//   const words = countWords(input);
//   const overLimit = words > MAX_WORDS;

//   // <-- whatever you want

//   function countWords(s: string) {
//   // split on whitespace, ignore empty
//   return s.trim().split(/\s+/).filter(Boolean).length;
// }

//   // auto-scroll to bottom
//   useEffect(() => {
//     const el = listRef.current; 
//     if (el) el.scrollTop = el.scrollHeight;
//   }, [messages, loading]);
//   const prompt = (text ?? input).trim();
// if (!prompt || loading) return;

// if (countWords(prompt) > MAX_WORDS) {
//   setError(`Please keep it under ${MAX_WORDS} words (you typed ${countWords(prompt)}).`);
//   return;
// }
// setError("");

//   async function send(text?: string) {
//     const prompt = (text ?? input).trim();
//     if (!prompt || loading) return;

//     setInput("");
//     const next = [...messages, { role: "user", content: prompt } as Msg];
//     setMessages(next);
//     setLoading(true);

//     abortRef.current?.abort();
//     const controller = new AbortController();
//     abortRef.current = controller;

//     try {
//       const res = await fetch(endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         message: prompt,            // new user text
//         history: last8(messages),       // last 8 turns only
//       }),
//       signal: controller.signal,
//     });


//       if (!res.ok) {
//         const errText = await res.text().catch(() => "Request failed");
//         throw new Error(errText);
//       }

//       // Try streaming; if not, fall back to JSON { reply }
//       if (res.body) {
//         const reader = res.body.getReader();
//         const decoder = new TextDecoder();
//         let acc = "";
//         setMessages((m) => [...m, { role: "assistant", content: "" }]);

//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           acc += decoder.decode(value, { stream: true });
//           setMessages((m) => {
//             const copy = m.slice();
//             copy[copy.length - 1] = { role: "assistant", content: acc };
//             return copy;
//           });
//         }

//         // Some APIs stream JSON lines; if yours sends a final JSON, you can parse here.
//       } else {
//         const data = (await res.json()) as { reply: string };
//         setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
//       }
//     } catch (e) {
//       console.error(e);
//       setMessages((m) => [...m, { role: "assistant", content: "Sorry—something went wrong." }]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     void send();
//   }

//   function stop() {
//     abortRef.current?.abort();
//     abortRef.current = null;
//     setLoading(false);
//   }

//   return (
//     <div className={className}>
//       {/* messages */}
//         <div
//         ref={listRef}
//         className="h-[380px] overflow-y-auto overflow-x-hidden space-y-3 pr-2 nice-scrollbar"
//         aria-live="polite"
//         >
//         {messages.map((m, i) => (
//             <Bubble key={i} role={m.role} text={m.content} />
//         ))}
//         {loading && <Typing />}
//         </div>
//       {/* input */}
//       <form onSubmit={onSubmit} className="mt-3 flex gap-2">
//         <textarea
//           rows={2}
//           value={input}
//           onChange={(e) => setInput(e.target.value) 
//             setInput(v);
//            if (countWords(v) <= MAX_WORDS) setError("");
//           }
//           placeholder="Ask about skills, projects, education, experience....."
//           className="flex-1 resize-none rounded-xl bg-[#0f1016] border border-white/10 px-3 py-2 text-sm"
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               void send();
//             }
//           }}
//         />
//         <div className="flex flex-col gap-2">
//           <button
//             type="submit"
//             disabled={loading || !input.trim()}
//             className="rounded-[1rem] bg-[var(--accent)] text-black font-semibold px-4 py-2 disabled:opacity-50"
//           >
//             Send
//           </button>
//           {loading && (
//             <button
//               type="button"
//               onClick={stop}
//               className="rounded-[1rem] bg-[#1a1b22] border border-white/10 px-4 py-2 text-sm"
//             >
//               Stop
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// /* --- Bubbles & bits --- */

// // Bubble — add wrapping classes: whitespace-pre-wrap + break-words + break-all
// function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
//   const isUser = role === "user";
//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={[
//           "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
//           "whitespace-pre-wrap break-words break-all", // ← important for long content
//           isUser
//             ? "bg-[var(--accent)] text-black"
//             : "bg-[#0f1016] border border-white/10 text-white",
//         ].join(" ")}
//       >
//         {text}
//       </div>
//     </div>
//   );
// }


// function Typing() {
//   return (
//     <div className="flex items-center gap-2 text-[var(--muted)] text-sm">
//       <span className="inline-block h-2 w-2 rounded-full bg-white/40 animate-bounce" />
//       <span className="inline-block h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:120ms]" />
//       <span className="inline-block h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:240ms]" />
//       <span className="sr-only">Assistant is typing…</span>
//     </div>
//   );
// }

// /* QuickPrompt chip you can place above the chat */
// export function QuickPrompt({ children }: { children: string }) {
//   // This child component is only for markup; ClientChat reads its text if you wire it.
//   return (
//     <button
//       type="button"
//       data-quick-prompt
//       className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold"
//       onClick={() => {
//         // Optional: dispatch an event the main component can listen for.
//         document.dispatchEvent(new CustomEvent("use-quick-prompt", { detail: String(children) }));
//       }}
//     >
//       {children}
//     </button>
//   );
// }

// // Attach as a static property so you can import/use <ClientChat.QuickPrompt>
// (ClientChat as any).QuickPrompt = QuickPrompt;

// function last8(history: Msg[]) {
//   // drop the very first assistant starter bubble
//   const convo = history.slice(1);
//   // keep only last 8 turns
//   return convo.slice(-8);
// }
"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

// ---- word limit config ----
const MAX_WORDS = 40; // ← change this
function countWords(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

export default function ClientChat({
  endpoint = "/api/kim-chat",
  starter = "Hi! Ask me anything about Kim.",
  className = "",
}: {
  endpoint?: string;
  starter?: string;
  className?: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: starter },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

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

    // enforce word limit
    const words = countWords(prompt);
    if (words > MAX_WORDS) {
      setError(
        `Please keep it under ${MAX_WORDS} words (you typed ${words}).`
      );
      return;
    }
    setError("");

    setInput("");
    const next = [...messages, { role: "user", content: prompt } as Msg];
    setMessages(next);
    setLoading(true);

    // latest-wins: cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt, // new user text
          history: last8(messages), // prior turns only
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "Request failed");
        throw new Error(errText);
      }

      // Try streaming; if not, fall back to JSON { reply }
      // if (res.body) {
      //   const reader = res.body.getReader();
      //   const decoder = new TextDecoder();
      //   let acc = "";
      //   setMessages((m) => [...m, { role: "assistant", content: "" }]);

      //   while (true) {
      //     const { done, value } = await reader.read();
      //     if (done) break;
      //     acc += decoder.decode(value, { stream: true });
      //     setMessages((m) => {
      //       const copy = m.slice();
      //       copy[copy.length - 1] = { role: "assistant", content: acc };
      //       return copy;
      //     });
      //   }
      // } else {
      //   const data = (await res.json()) as { reply: string };
      //   setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      // }
      // replace the whole streaming block:
      
      const data = (await res.json()) as { reply: string };
      console.log(data)
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);

    } catch (e: unknown) {
      // Detect user-initiated cancel (AbortController)
      const isAbort =
        typeof e === "object" &&
        e !== null &&
        // DOMException in browsers has name === "AbortError"
        "name" in e &&
        (e as { name?: string }).name === "AbortError";

      if (isAbort) {
        // user canceled; ignore
        return;
      }

      console.error(e);

      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry—something went wrong." },
      ]);
    }
    finally {
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

  const words = countWords(input);
  const overLimit = words > MAX_WORDS;

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
          onChange={(e) => {
            const v = e.target.value;
            setInput(v);
            // clear error while typing back under the limit
            if (countWords(v) <= MAX_WORDS) setError("");
          }}
          placeholder="Ask about skills, projects, education, experience....."
          className="flex-1 resize-none rounded-xl bg-[#0f1016] border border-white/10 px-3 py-2 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
        />
        <div className="flex flex-col gap-2 items-end">
          <div className="text-xs text-white/60">
            {words}/{MAX_WORDS} words{" "}
            {overLimit && <span className="text-red-400">• over limit</span>}
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim() || overLimit}
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

      {error && <div className="mt-2 text-xs text-red-400">{error}</div>}
    </div>
  );
}

/* --- Bubbles & bits --- */

function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          "whitespace-pre-wrap break-words",
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

// Attach as a static property so you can import/use <ClientChat.QuickPrompt>
export function QuickPrompt({ children }: { children: string }) {
  return (
    <button
      type="button"
      data-quick-prompt
      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold"
      onClick={() => {
        document.dispatchEvent(
          new CustomEvent("use-quick-prompt", { detail: String(children) })
        );
      }}
    >
      {children}
    </button>
  );
}
ClientChat.QuickPrompt = QuickPrompt;

// keep only last 8 turns (skip starter bubble at index 0)
function last8(history: Msg[]) {
  const convo = history.slice(1);
  return convo.slice(-8);
}
