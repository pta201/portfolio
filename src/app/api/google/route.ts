import { loadEmbeddings } from "@/lib/ai/embed";
import { google } from "@ai-sdk/google";
import { cosineSimilarity, embed, generateText } from "ai";
import fs from "fs";

const model = google("gemini-2.5-flash");
const embedModel = google.textEmbeddingModel("gemini-embedding-001");

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q");
  if (!q) return new Response("Missing query parameter 'q'", { status: 400 });

  const db = await loadEmbeddings();

  const { embedding } = await embed({
    model: embedModel,
    value: q,
  });
  if (db) {
    const results = db
      .map((item) => ({
        document: item,
        similarity: cosineSimilarity(embedding, item.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);

    const context = results.map((r) => `${r.document.value}`).join("\n\n");

    const persona = fs
      .readFileSync(process.cwd() + "/src/lib/ai/knowledge.md", "utf8")
      .split("\n")
      .join("\n");

    const { text } = await generateText({
      model,
      system: persona,
      prompt: `Answer based on the following context:\n\n${context}\n\nQuestion: ${q}`,
    });

    return new Response(
      JSON.stringify(
        {
          question: q,
          context,
          persona,
          answer: text,
        },
        null,
        5
      )
    );
  }
  return new Response("No knowledge database found.", { status: 500 });
}
