'use client';

import { create } from 'zustand';

export type Language = 'en' | 'hi' | 'mr' | 'pa' | 'bn' | 'bh' | 'raj';

export const LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  pa: 'ਪੰਜਾਬੀ',
  bn: 'বাংলা',
  bh: 'भोजपुरी',
  raj: 'राजस्थानी',
};

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageStore>((set) => ({
  language: 'en',
  setLanguage: (language: Language) => set({ language }),
}));
