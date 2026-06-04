'use client';

import { create } from 'zustand';

export type Language = 'en' | 'hi' | 'mr' | 'pa' | 'bn' | 'bh' | 'raj' | 'gu' | 'ta' | 'te' | 'kn' | 'zh' | 'ja' | 'ar' | 'fr' | 'de' | 'es';

export const LANGUAGES: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  pa: 'ਪੰਜਾਬੀ',
  bn: 'বাংলা',
  bh: 'भोजपुरी',
  raj: 'राजस्थानी',
  gu: 'ગુજરાતી',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  zh: '中文',
  ja: '日本語',
  ar: 'العربية',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
};

// Languages served by static translations.ts (no API call needed)
export const STATIC_LANGUAGES: Language[] = ['en', 'hi', 'mr', 'pa', 'bn', 'bh', 'raj'];

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageStore>((set) => ({
  language: 'en',
  setLanguage: (language: Language) => set({ language }),
}));
