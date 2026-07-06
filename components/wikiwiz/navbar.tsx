'use client';

import Link from 'next/link';
import { useLanguage, LANGUAGES } from '@/lib/store/language';
import { useTranslation } from '@/lib/hooks/use-translation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { t, isLoading } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" stroke="#D4A853" strokeWidth="1.5"/>
              <text x="16" y="21" textAnchor="middle" fill="#D4A853" fontSize="16" fontFamily="Crimson Pro, serif" fontWeight="700">W</text>
            </svg>
            <span className="text-2xl font-serif font-bold text-primary group-hover:opacity-80 transition">WikiWiz</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground/80 hover:text-primary transition">
              {t('nav.home')}
            </Link>
            <Link href="/learn" className="text-foreground/80 hover:text-primary transition">
              {t('nav.learn')}
            </Link>
            <Link href="/calculators" className="text-foreground/80 hover:text-primary transition">
              {t('nav.calculators')}
            </Link>
            <Link href="/mlk-lab" className="text-foreground/80 hover:text-primary transition">
              {t('nav.mlk')}
            </Link>
          </div>

          {/* Language Selector & CTA */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-card transition text-sm disabled:opacity-50"
              >
                <span className="text-primary font-medium">{LANGUAGES[language]}</span>
                <ChevronDown size={16} className={isLoading ? 'animate-spin' : ''} />
              </button>

              {showLangMenu && (
                <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
                  {Object.entries(LANGUAGES).map(([lang, name]) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as any);
                        setShowLangMenu(false);
                      }}
                      disabled={isLoading}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-background transition disabled:opacity-50 ${
                        language === lang ? 'text-primary font-medium' : 'text-foreground/80'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/learn"
              className="hidden sm:block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium text-sm"
            >
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
