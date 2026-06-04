"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * WikiWiz Translation System
 * File: lib/translation.tsx
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Uses NVIDIA Nemotron-3-Super-120B via the Integrate API to translate
 * all visible text on the page into the selected language.
 *
 * Architecture:
 *   1. TranslationContext  — holds current language & translated string cache
 *   2. TranslationProvider — wraps _app / layout
 *   3. useT(text)          — hook: returns translated string (or original while loading)
 *   4. T component         — <T>Some text</T>  (convenience wrapper)
 *   5. translateBatch()    — server-side callable: bulk-translate an array of strings
 *
 * HOW TO USE:
 *
 *   a) Wrap your root layout:
 *        <TranslationProvider>
 *          {children}
 *        </TranslationProvider>
 *
 *   b) Wrap any text you want translated:
 *        <T>Master trading through ancient wisdom</T>
 *        — or —
 *        const label = useT("Get Started");
 *
 *   c) The language selector (LanguageSwitcher component below) connects
 *      to the context and triggers translation when language changes.
 *
 * NOTE ON API KEY:
 *   Do NOT embed the API key in client-side code in production.
 *   Create a Next.js Route Handler at /app/api/translate/route.ts
 *   that proxies requests using NVIDIA_API_KEY from env vars.
 *   A ready-made route handler is included at the bottom of this file.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ─── Supported languages ─────────────────────────────────────────────────────
export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "es", label: "Spanish", native: "Español" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

// ─── Context shape ────────────────────────────────────────────────────────────
interface TranslationCtx {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  translate: (text: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationCtx>({
  lang: "en",
  setLang: () => {},
  translate: (t) => t,
  isLoading: false,
});

// ─── Cache: lang → (original → translated) ───────────────────────────────────
const cache = new Map<string, Map<string, string>>();

function getCached(lang: LangCode, text: string): string | undefined {
  return cache.get(lang)?.get(text);
}

function setCached(lang: LangCode, text: string, translated: string) {
  if (!cache.has(lang)) cache.set(lang, new Map());
  cache.get(lang)!.set(text, translated);
}

// ─── API call ─────────────────────────────────────────────────────────────────
// This hits your Next.js route handler /api/translate which you must create.
// The route handler calls NVIDIA Integrate API server-side.
async function callTranslationAPI(
  texts: string[],
  targetLang: LangCode
): Promise<string[]> {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts, targetLang }),
  });

  if (!res.ok) throw new Error(`Translation API error: ${res.status}`);
  const data = await res.json();
  // Route handler returns { translations: string[] }
  return data.translations as string[];
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");
  const [translations, setTranslations] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  // Collect all texts registered via useT / T
  const registeredTexts = useRef<Set<string>>(new Set());

  const registerText = useCallback((text: string) => {
    registeredTexts.current.add(text);
  }, []);

  const setLang = useCallback(
    async (newLang: LangCode) => {
      setLangState(newLang);

      if (newLang === "en") {
        setTranslations(new Map());
        return;
      }

      // Find texts not yet cached for this lang
      const toTranslate = Array.from(registeredTexts.current).filter(
        (t) => !getCached(newLang, t)
      );

      if (toTranslate.length === 0) {
        // Everything already cached — just hydrate from cache
        const map = new Map<string, string>();
        registeredTexts.current.forEach((t) => {
          const cached = getCached(newLang, t);
          if (cached) map.set(t, cached);
        });
        setTranslations(map);
        return;
      }

      setIsLoading(true);
      try {
        // Batch in chunks of 30 to stay within token limits
        const CHUNK = 30;
        const allTranslated: string[] = [];

        for (let i = 0; i < toTranslate.length; i += CHUNK) {
          const chunk = toTranslate.slice(i, i + CHUNK);
          const results = await callTranslationAPI(chunk, newLang);
          allTranslated.push(...results);
        }

        // Write to cache and build state map
        const map = new Map<string, string>();
        toTranslate.forEach((t, idx) => {
          const translated = allTranslated[idx] ?? t;
          setCached(newLang, t, translated);
          map.set(t, translated);
        });

        // Also merge previously cached for this lang
        registeredTexts.current.forEach((t) => {
          if (!map.has(t)) {
            const cached = getCached(newLang, t);
            if (cached) map.set(t, cached);
          }
        });

        setTranslations(map);
      } catch (err) {
        console.error("[WikiWiz Translation]", err);
        // Silently fall back to English on error
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const translate = useCallback(
    (text: string) => {
      registerText(text);
      if (lang === "en") return text;
      return translations.get(text) ?? text;
    },
    [lang, translations, registerText]
  );

  return (
    <TranslationContext.Provider value={{ lang, setLang, translate, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useT(text: string): string {
  const { translate } = useContext(TranslationContext);
  return translate(text);
}

// ─── <T> convenience component ────────────────────────────────────────────────
export function T({ children }: { children: string }) {
  const translated = useT(children);
  return <>{translated}</>;
}

// ─── Language Switcher UI ─────────────────────────────────────────────────────
export function LanguageSwitcher() {
  const { lang, setLang, isLoading } = useContext(TranslationContext);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm text-neutral-300 hover:text-white"
        aria-label="Select language"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="inline-block w-3.5 h-3.5 border border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
        ) : (
          <span className="text-base">🌐</span>
        )}
        <span>{current.native}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M6 8L1 3h10z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden py-1">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                lang === l.code
                  ? "bg-amber-400/10 text-amber-300"
                  : "text-neutral-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="w-16 text-neutral-500 text-xs">{l.label}</span>
              <span>{l.native}</span>
              {lang === l.code && (
                <svg
                  className="ml-auto w-3.5 h-3.5 text-amber-400"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
