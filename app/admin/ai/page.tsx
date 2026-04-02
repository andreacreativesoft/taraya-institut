"use client";

import { useState, useRef, useEffect } from "react";

type Usage  = { input: number; output: number; cost: number };
type Message = { role: "user" | "assistant"; content: string; usage?: Usage };

const EXAMPLES = [
  "Change le prix de la Manucure à 38€",
  "Désactive le service Épilations",
  "Mets à jour le texte de la section À propos",
  "Liste tous les blocs de contenu du site",
];

function SparkleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Erreur réseau");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") break;
          try {
            const parsed = JSON.parse(raw);
            if (parsed.text) {
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + parsed.text,
                };
                return updated;
              });
            }
            if (parsed.usage) {
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  usage: parsed.usage as Usage,
                };
                return updated;
              });
            }
          } catch { /* ignore parse errors */ }
        }
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: "❌ Une erreur est survenue. Veuillez réessayer.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col max-w-[860px] h-[calc(100vh-160px)]">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#cab3a0]/20 flex items-center justify-center text-[#44312b]">
          <SparkleIcon />
        </div>
        <div>
          <h1 className="text-[22px] font-heading font-bold text-[#251d1b] leading-none">Assistant Claude</h1>
          <p className="text-[13px] text-[#746e6b] mt-0.5">
            Modifiez le contenu du site en langage naturel — réservé au Super Admin
          </p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#dad5cd] p-5 flex flex-col gap-4 mb-3">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-8">
            <div className="w-14 h-14 rounded-full bg-[#cab3a0]/20 flex items-center justify-center text-[#44312b]">
              <SparkleIcon />
            </div>
            <div className="text-center">
              <p className="font-heading text-[#251d1b] text-[17px] font-bold">Comment puis-je vous aider ?</p>
              <p className="font-body text-[#746e6b] text-[13px] mt-1">
                Je peux modifier les services, les tarifs et les paramètres du site.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-[560px]">
              {EXAMPLES.map(ex => (
                <button key={ex} onClick={() => sendMessage(ex)}
                  className="text-left px-4 py-2.5 rounded-lg border border-[#dad5cd] hover:border-[#cab3a0] hover:bg-[#fbf8ef] transition-all font-body text-[13px] text-[#251d1b]">
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#cab3a0]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#44312b]">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                )}
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[14px] font-body leading-[1.6] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[#44312b] text-white rounded-tr-sm"
                    : "bg-[#f5f3ee] text-[#251d1b] rounded-tl-sm"
                }`}>
                  {msg.content
                    ? msg.content
                    : loading && i === messages.length - 1
                    ? <span className="flex gap-1 items-center py-0.5">
                        <span className="w-1.5 h-1.5 bg-[#cab3a0] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-[#cab3a0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-[#cab3a0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    : ""}
                </div>
              </div>
              {/* Cost badge — shown on assistant messages that have usage data */}
              {msg.role === "assistant" && msg.usage && (
                <div className="ml-10 flex items-center gap-1.5 text-[11px] font-body text-[#9e9691]">
                  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {msg.usage.input.toLocaleString()} in · {msg.usage.output.toLocaleString()} out
                    {" · "}
                    <span className="text-[#cab3a0] font-medium">
                      ~${msg.usage.cost < 0.001
                        ? msg.usage.cost.toFixed(4)
                        : msg.usage.cost.toFixed(3)}
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 items-end bg-white border border-[#dad5cd] rounded-xl p-3 focus-within:border-[#cab3a0] focus-within:ring-2 focus-within:ring-[#cab3a0]/20 transition-all">
        <textarea
          ref={textareaRef}
          rows={1}
          className="flex-1 resize-none font-body text-[14px] text-[#251d1b] placeholder:text-[#9e9691] bg-transparent focus:outline-none leading-[1.5]"
          placeholder="Demandez une modification… (Entrée pour envoyer, Shift+Entrée pour saut de ligne)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
          style={{ maxHeight: "120px" }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="shrink-0 w-8 h-8 bg-[#44312b] text-white rounded-lg flex items-center justify-center hover:bg-[#5a3f37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
