'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage, STATIC_LANGUAGES, type Language } from '@/lib/store/language';
import { translations } from '@/data/translations';

// In-memory cache: lang -> (key -> translatedString)
const apiCache = new Map<string, Map<string, string>>();

export function useTranslation() {
  const { language } = useLanguage();
  const [apiTranslations, setApiTranslations] = useState<Map<string, string>>(new Map());
  const fetchedLang = useRef<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const isStatic = STATIC_LANGUAGES.includes(language as Language);

  useEffect(() => {
    // English or static language — no API call needed
    if (isStatic || language === 'en') {
      setApiTranslations(new Map());
      fetchedLang.current = '';
      return;
    }

    // Already fetched this language
    if (fetchedLang.current === language) return;

    // Check in-memory cache
    const cached = apiCache.get(language);
    if (cached && cached.size > 0) {
      setApiTranslations(new Map(cached));
      fetchedLang.current = language;
      return;
    }

    // Build parallel arrays: keys[] and values[] from English baseline
    const enMap = translations['en'] as Record<string, string> | undefined;
    if (!enMap) return;

    const allKeys = Object.keys(enMap);
    const allValues = allKeys.map(k => enMap[k] || k);

    setIsLoading(true);

    // Batch in chunks of 40 to stay within token limits
    const CHUNK = 40;
    const batches: Array<{ keys: string[]; texts: string[] }> = [];
    for (let i = 0; i < allKeys.length; i += CHUNK) {
      batches.push({
        keys: allKeys.slice(i, i + CHUNK),
        texts: allValues.slice(i, i + CHUNK),
      });
    }

    Promise.all(
      batches.map(batch =>
        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            keys: batch.keys,
            texts: batch.texts,
            targetLang: language,
          }),
        })
          .then(r => r.json())
          .then(data => data.translations as Record<string, string>)
          .catch(err => {
            console.error('[useTranslation] batch error:', err);
            // Return original English values for this batch on error
            const fallback: Record<string, string> = {};
            batch.keys.forEach((k, i) => { fallback[k] = batch.texts[i]; });
            return fallback;
          })
      )
    )
      .then(results => {
        // Merge all batch results into one map
        const merged = new Map<string, string>();
        results.forEach(obj => {
          Object.entries(obj).forEach(([k, v]) => merged.set(k, v));
        });
        apiCache.set(language, merged);
        setApiTranslations(new Map(merged));
        fetchedLang.current = language;
      })
      .finally(() => setIsLoading(false));

  }, [language, isStatic]);

  const t = (key: string): string => {
    if (language === 'en') {
      return (translations['en'] as Record<string, string>)?.[key] ?? key;
    }

    if (isStatic) {
      return (
        (translations[language as keyof typeof translations] as Record<string, string>)?.[key] ??
        (translations['en'] as Record<string, string>)?.[key] ??
        key
      );
    }

    // API-translated language
    return (
      apiTranslations.get(key) ??
      (translations['en'] as Record<string, string>)?.[key] ??
      key
    );
  };

  return { t, language, isLoading };
}
