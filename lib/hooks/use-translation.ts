'use client';

import { useLanguage } from '@/lib/store/language';
import { translations } from '@/data/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string): string => {
    return translations[language]?.[key] 
      || translations['en']?.[key] 
      || key;
  };

  return { t, language };
}
