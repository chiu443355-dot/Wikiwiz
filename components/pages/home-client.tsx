'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useTranslation } from '@/lib/hooks/use-translation';
import { FearGreedMeter } from '@/components/wikiwiz/fear-greed-meter';
import { PhaseCard } from '@/components/wikiwiz/phase-card';
import { EconomicCalendar } from '@/components/wikiwiz/economic-calendar';
import { phases } from '@/data/phases';

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[500px] bg-card animate-pulse rounded-lg" />;
  return <>{children}</>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HomePageClient() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.h1
              variants={itemVariants}
              className="text-balance text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6"
            >
              {t('home.hero.title')}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-pretty text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              {t('home.hero.subtitle')}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learn"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
              >
                {t('home.hero.cta1')}
              </Link>
              <Link
                href="/calculators"
                className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition"
              >
                {t('home.hero.cta2')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* TradingView Ticker Tape */}
      <ClientOnly>
        <section className="px-4 py-6 sm:px-6 lg:px-8 bg-card/50 border-b border-border">
          <div className="tradingview-widget-container" suppressHydrationWarning>
            <div className="tradingview-widget-container__widget"></div>
            <Script 
              src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
              strategy="lazyOnload"
              async
            />
            <Script
              id="tradingview-config"
              type="text/x-tradingview-widget"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  symbols: [
                    { proName: 'NSE:NIFTY50', title: 'Nifty 50' },
                    { proName: 'NSE:BANKNIFTY', title: 'Bank Nifty' },
                    { proName: 'FOREXCOM:XAUUSD', title: 'Gold' },
                    { proName: 'FX_IDC:USDINR', title: 'USD/INR' },
                    { proName: 'CRYPTO:BTCUSD', title: 'Bitcoin' }
                  ],
                  showSymbolLogo: true,
                  isTransparent: true,
                  displayMode: 'adaptive',
                  colorTheme: 'dark',
                  locale: 'en'
                })
              }}
            />
          </div>
        </section>
      </ClientOnly>

      {/* Fear & Greed Meter Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-4 py-20 sm:px-6 lg:px-8 border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.feargreed')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Current market sentiment analyzed through multiple indicators
            </p>
          </div>
          <div className="flex justify-center">
            <FearGreedMeter value={67} size="md" />
          </div>
        </div>
      </motion.section>

      {/* TradingView Chart Section */}
      <ClientOnly>
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 py-20 sm:px-6 lg:px-8 border-t border-border"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-12 text-center">Live Market Analysis</h2>
            <div id="tradingview_widget" style={{ height: '500px', width: '100%' }} />
            <Script 
              src="https://s3.tradingview.com/tv.js"
              strategy="afterInteractive"
              onLoad={() => {
                if ((window as any).TradingView) {
                  new (window as any).TradingView.widget({
                    width: "100%",
                    height: 500,
                    symbol: "NSE:NIFTY50",
                    interval: "D",
                    timezone: "Asia/Kolkata",
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    toolbar_bg: "#0A0A0F",
                    enable_publishing: false,
                    allow_symbol_change: true,
                    container_id: "tradingview_widget"
                  });
                }
              }}
            />
          </div>
        </motion.section>
      </ClientOnly>

      {/* Roadmap Preview Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-4 py-20 sm:px-6 lg:px-8 border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
              {t('home.roadmapTitle')}
            </h2>
            <p className="text-muted-foreground mb-2">{t('home.roadmapDesc')}</p>
          </div>

          {/* Phase cards grid - show first 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {phases.slice(0, 3).map((phase, index) => (
              <PhaseCard key={phase.id} phase={phase} index={index} />
            ))}
          </div>

          {/* View All button */}
          <div className="text-center">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              View All Phases →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Economic Calendar Section */}
      <EconomicCalendar />

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-4 py-20 sm:px-6 lg:px-8 border-t border-border"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Begin your journey towards financial mastery with our comprehensive curriculum combining ancient wisdom
            with modern investing strategies.
          </p>
          <Link
            href="/learn"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
          >
            Start Learning Now
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="mb-4">WikiWiz - Financial Education with Wisdom</p>
          <p className="text-sm">Educational platform for investment learning. Not financial advice.</p>
        </div>
      </footer>
    </main>
  );
}
