/**
 * app/api/translate/route.ts
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Server-side proxy for NVIDIA Nemotron-3-Super-120B translation.
 *
 * Keeps the API key out of client bundles.
 *
 * Setup:
 *   1. Add to .env.local:
 *        NVIDIA_API_KEY=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
 *   2. Add to vercel.com project → Settings → Environment Variables (same key)
 *   3. This file lives at: app/api/translate/route.ts
 *
 * Request  (POST):  { texts: string[], targetLang: string }
 * Response:         { translations: string[] }
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // Use Node.js runtime (not Edge) for streaming

const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";
const MODEL = "nvidia/nemotron-3-super-120b-a12b";

// Language code → full language name for the prompt
const LANG_NAMES: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  gu: "Gujarati",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  bn: "Bengali",
  pa: "Punjabi",
  zh: "Simplified Chinese",
  ja: "Japanese",
  ar: "Arabic",
  fr: "French",
  de: "German",
  es: "Spanish",
};

export async function POST(req: NextRequest) {
  try {
    const { texts, targetLang } = (await req.json()) as {
      texts: string[];
      targetLang: string;
    };

    // Validate
    if (!Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: "texts must be a non-empty array" }, { status: 400 });
    }
    if (!targetLang || targetLang === "en") {
      // No-op: return originals
      return NextResponse.json({ translations: texts });
    }

    const langName = LANG_NAMES[targetLang] ?? targetLang;
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      console.error("[translate] NVIDIA_API_KEY not set");
      return NextResponse.json({ translations: texts }); // Fail gracefully
    }

    // Build a JSON-output prompt so we can parse the response reliably
    const systemPrompt = `You are a professional translation engine for a financial education website called WikiWiz.
Translate UI strings from English to ${langName}.
Rules:
- Preserve proper nouns, financial terms, and brand names (WikiWiz, NIFTY, NSE, BSE, Bhagavad Gita, etc.).
- Keep the same tone: professional, educational, slightly inspiring.
- Output ONLY a valid JSON array of translated strings, in the same order as the input.
- Do NOT include any explanation, preamble, or markdown fences.
- Example: ["translated1","translated2"]`;

    const userPrompt = JSON.stringify(texts);

    // Call NVIDIA Integrate API (non-streaming for cleaner JSON parsing)
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
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,   // Low temp for consistent translations
        top_p: 0.9,
        max_tokens: 4096,
        stream: false,
        // Enable thinking for better quality translation
        extra_body: {
          chat_template_kwargs: { enable_thinking: false }, // disable for faster response
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[translate] NVIDIA API error:", response.status, errText);
      return NextResponse.json({ translations: texts }); // Graceful fallback
    }

    const data = await response.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "[]";

    // Parse JSON array from response
    let translations: string[] = texts; // Default fallback
    try {
      // Strip any accidental markdown fences
      const clean = content
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed) && parsed.length === texts.length) {
        translations = parsed.map(String);
      } else {
        console.warn("[translate] Response array length mismatch, falling back");
      }
    } catch (e) {
      console.error("[translate] Failed to parse translation JSON:", e, content);
    }

    return NextResponse.json({ translations });
  } catch (err) {
    console.error("[translate] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
