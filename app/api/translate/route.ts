/**
 * app/api/translate/route.ts
 * Translation proxy using NVIDIA Nemotron via Integrate API.
 *
 * Accepts two call shapes:
 *   Shape A (key-based):  { keys: string[], texts: string[], targetLang: string }
 *                         → { translations: Record<string, string> }   (key → translated)
 *   Shape B (array-only): { texts: string[], targetLang: string }
 *                         → { translations: string[] }
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";
const MODEL = "meta/llama-3.3-70b-instruct"; // reliable, fast, good multilingual

const LANG_NAMES: Record<string, string> = {
  hi: "Hindi", mr: "Marathi", gu: "Gujarati", ta: "Tamil",
  te: "Telugu", kn: "Kannada", bn: "Bengali", pa: "Punjabi",
  bh: "Bhojpuri", raj: "Rajasthani",
  zh: "Simplified Chinese", ja: "Japanese", ar: "Arabic",
  fr: "French", de: "German", es: "Spanish",
};

async function translateTexts(texts: string[], targetLang: string, apiKey: string): Promise<string[]> {
  const langName = LANG_NAMES[targetLang] ?? targetLang;

  const systemPrompt = `You are a translation engine for WikiWiz, an Indian financial education platform.
Translate the given JSON array of English UI strings into ${langName}.
Rules:
- Preserve proper nouns and brand names exactly: WikiWiz, NIFTY, NSE, BSE, MLK, Bhagavad Gita.
- Keep tone: professional, educational, slightly inspiring.
- Output ONLY a valid JSON array of translated strings, same order as input. No markdown, no explanation.`;

  const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(texts) },
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 4096,
      stream: false,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`NVIDIA API ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content: string = data?.choices?.[0]?.message?.content ?? "[]";

  // Strip accidental markdown fences
  const clean = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(clean);
  if (Array.isArray(parsed) && parsed.length === texts.length) {
    return parsed.map(String);
  }
  throw new Error("Response array length mismatch");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      texts: string[];
      keys?: string[];
      targetLang: string;
    };

    const { texts, keys, targetLang } = body;

    if (!Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: "texts must be a non-empty array" }, { status: 400 });
    }

    // English → return originals
    if (!targetLang || targetLang === "en") {
      if (keys) {
        const map: Record<string, string> = {};
        keys.forEach((k, i) => { map[k] = texts[i]; });
        return NextResponse.json({ translations: map });
      }
      return NextResponse.json({ translations: texts });
    }

    // Use env var; fall back to hardcoded key so Vercel works without dashboard setup
    const apiKey =
      process.env.NVIDIA_API_KEY ||
      "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";

    // Batch in chunks of 40 to avoid token limits
    const CHUNK = 40;
    const allTranslated: string[] = [];

    for (let i = 0; i < texts.length; i += CHUNK) {
      const chunk = texts.slice(i, i + CHUNK);
      try {
        const results = await translateTexts(chunk, targetLang, apiKey);
        allTranslated.push(...results);
      } catch (chunkErr) {
        console.error("[translate] chunk error, using originals:", chunkErr);
        allTranslated.push(...chunk); // fallback: keep originals for this chunk
      }
    }

    // Return key→translated map if keys provided (key-based system)
    if (keys && keys.length === texts.length) {
      const map: Record<string, string> = {};
      keys.forEach((k, i) => { map[k] = allTranslated[i] ?? texts[i]; });
      return NextResponse.json({ translations: map });
    }

    // Return plain array (array-based system)
    return NextResponse.json({ translations: allTranslated });

  } catch (err) {
    console.error("[translate] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
