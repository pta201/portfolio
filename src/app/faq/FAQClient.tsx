"use client";

import { useState } from "react";

type ApiResponse = {
  question: string;
  context: string;
  persona: string;
  answer: string;
};

export default function FAQClient({ isDebug = false }: { isDebug?: boolean }) {
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setData(null);
    if (!q.trim()) {
      setError("Please enter a question.");
      return;
    }
    setLoading(true);
    try {
      const encoded = encodeURIComponent(q.trim());
      const res = await fetch(`/api/google?q=${encoded}`);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`${res.status} — ${txt}`);
      }
      const json: ApiResponse = await res.json();
      setData(json);
    } catch (err: any) {
      setError(String(err.message ?? err));
    } finally {
      setLoading(false);
    }
  }

  const renderDebug = () => {
    if (!isDebug || !data) return null;
    return (
      <>
        <details>
          <summary className="cursor-pointer">Context (top matches)</summary>
          <pre className="p-3 bg-gray-50 border rounded mt-2 text-sm whitespace-pre-wrap">
            {data.context}
          </pre>
        </details>
        <details>
          <summary className="cursor-pointer">Persona (system prompt)</summary>
          <pre className="p-3 bg-gray-50 border rounded mt-2 text-sm whitespace-pre-wrap">
            {data.persona}
          </pre>
        </details>
      </>
    );
  };
  return (
    <section className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          aria-label="Ask a question"
          className="border rounded px-3 py-2 flex-1"
          placeholder="Ask something like: 'What is your primary focus as a developer'"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
          disabled={loading}
        >
          {loading ? "Asking…" : "Ask"}
        </button>
      </form>

      {error && <div className="text-sm text-red-600">Error: {error}</div>}

      {data && (
        <div className="mt-4 space-y-3">
          <div>
            <strong>Question:</strong> {data.question}
          </div>
          <div>
            <strong>Answer:</strong>
            <div className="p-3 bg-gray-50 border rounded mt-1 whitespace-pre-wrap">
              {data.answer}
            </div>
          </div>
          {renderDebug()}
        </div>
      )}
    </section>
  );
}
