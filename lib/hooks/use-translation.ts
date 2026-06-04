'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage, STATIC_LANGUAGES, type Language } from '@/lib/store/language';
import { translations } from '@/data/translations';

// In-memory cache: lang -> (key -> translated)
const apiCache = new Map<string, Map<string, string>>();

// Collect all keys that have been registered across renders
const registeredKeys = new Set<string>();

export function useTranslation() {
  const { language } = useLanguage();
  const [apiTranslations, setApiTranslations] = useState<Map<string, string>>(new Map());
  const fetchedLang = useRef<string>('');

  const isStatic = STATIC_LANGUAGES.includes(language as Language);

  // For static languages, use translations.ts as before
  // For API languages, fetch from /api/translate
  useEffect(() => {
    if (isStatic || language === 'en') {
      setApiTranslations(new Map());
      return;
    }
    if (fetchedLang.current === language) return;

    // Check cache first
    const cached = apiCache.get(language);
    if (cached && cached.size > 0) {
      setApiTranslations(new Map(cached));
      fetchedLang.current = language;
      return;
    }

    // Gather all known translation keys from translations.ts (en baseline)
    const allKeys = Object.keys(translations['en'] || {});
    allKeys.forEach(k => registeredKeys.add(k));
    const values = allKeys.map(k => translations['en'][k] || k);

    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: values, targetLang: language }),
    })
      .then(r => r.json())
      .then(data => {
        const result = new Map<string, string>();
        (data.translations as string[]).forEach((translated, i) => {
          result.set(allKeys[i], translated);
        });
        apiCache.set(language, result);
        setApiTranslations(new Map(result));
        fetchedLang.current = language;
      })
      .catch(err => {
        console.error('[useTranslation] API error, falling back to English', err);
        fetchedLang.current = language;
      });
  }, [language, isStatic]);

  const t = (key: string): string => {
    registeredKeys.add(key);

    if (language === 'en') {
      return translations['en']?.[key] || key;
    }

    if (isStatic) {
      // Use static translations.ts
      return translations[language as keyof typeof translations]?.[key]
        || translations['en']?.[key]
        || key;
    }

    // Use API translation
    return apiTranslations.get(key) || translations['en']?.[key] || key;
  };

  return { t, language };
}
