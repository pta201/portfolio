// utils/embed.ts
import { google } from "@ai-sdk/google";
import { embedMany } from "ai";
import fs from "fs";
import path from "path";

const embedModel = google.textEmbeddingModel("gemini-embedding-001");

const KNOWLEDGE_PATH = path.join(process.cwd(), "/src/lib/ai/knowledge.md");
const EMBED_PATH = path.join(process.cwd(), "/src/lib/ai/embeddings.json");

// Cache
let db: { embedding: number[]; value: string }[] | null = null;

/**
 * Split text into manageable chunks.
 */
function splitChunks(text: string) {
  return text
    .split(/\n{2,}|\./)
    .map((c) => c.trim())
    .filter(Boolean);
}

/**
 * Regenerate embeddings if missing or outdated.
 */
async function buildEmbeddings(): Promise<typeof db> {
  const text = fs.readFileSync(KNOWLEDGE_PATH, "utf8");
  const chunks = splitChunks(text);
  const { embeddings } = await embedMany({
    model: embedModel,
    values: chunks,
  });
  const newDb = embeddings.map((e, i) => ({
    embedding: e,
    value: chunks[i],
  }));
  fs.writeFileSync(EMBED_PATH, JSON.stringify(newDb));
  console.log(`✅ Updated embeddings.json with ${newDb.length} chunks.`);
  return newDb;
}

/**
 * Load embeddings from cache or regenerate when necessary.
 */
export async function loadEmbeddings() {
  // Use cached in-memory version if available
  if (db) return db;

  // Check timestamps
  const mdStat = fs.statSync(KNOWLEDGE_PATH);
  let jsonStat: fs.Stats | null = null;
  try {
    jsonStat = fs.statSync(EMBED_PATH);
  } catch {
    console.log("ℹ️ No embeddings file found, creating new one...");
  }

  // Build if file missing or outdated
  if (!jsonStat || mdStat.mtimeMs > jsonStat.mtimeMs) {
    db = await buildEmbeddings();
  } else {
    db = JSON.parse(fs.readFileSync(EMBED_PATH, "utf8"));
    if (!db) {
      console.log("ℹ️ No embeddings file found, creating new one...");
    } else console.log(`✅ Loaded embeddings.json (${db.length} chunks).`);
  }

  return db;
}
