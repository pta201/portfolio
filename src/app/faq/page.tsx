"use client";
import { parseAsBoolean, useQueryState } from "nuqs";
import FAQClient from "./FAQClient";

export default function Page() {
  const [debug] = useQueryState("debug", parseAsBoolean.withDefault(false));
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        FAQ — Ask me anything (in order to get to know me ofc) 🤓
      </h1>
      <FAQClient isDebug={!!debug} />
    </main>
  );
}
