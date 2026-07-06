'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '@/components/wikiwiz/navbar';
import { phases } from '@/data/phases';
import Link from 'next/link';
import { ArrowRight, BookOpen, Star, Zap, Shield, TrendingUp, Award, ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { MarketPulseDashboard } from '@/components/home/market-pulse-dashboard';
import { useTranslation } from '@/lib/hooks/use-translation';

const FEATURED_PHASES = phases.slice(0, 3);

const STATS = [
  { value: '15', label: 'Learning Phases', key: 'home.stat.phases', icon: BookOpen },
  { value: '50+', label: 'Chapters', key: 'home.stat.chapters', icon: Star },
  { value: '40+', label: 'Hours of Content', key: 'home.stat.hours', icon: Zap },
  { value: '700+', label: 'Years of Gita Wisdom', key: 'home.stat.gita', icon: Shield },
];

const FEATURES = [
  {
    icon: BookOpen,
    title: 'features.gita.title',
    desc: 'features.gita.desc',
  },
  {
    icon: TrendingUp,
    title: 'features.mastery.title',
    desc: 'features.mastery.desc',
  },
  {
    icon: Shield,
    title: 'features.risk.title',
    desc: 'features.risk.desc',
  },
  {
    icon: Award,
    title: 'features.indian.title',
    desc: 'features.indian.desc',
  },
];

export default function HomePage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background overflow-hidden">

        {/* ═══════════ HERO ═══════════ */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity }}
          className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 -z-20 pointer-events-none">
            <div className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(oklch(0.18 0 0 / 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, oklch(0.18 0 0 / 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          </div>

          {/* Glow orbs */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, oklch(0.65 0.15 40 / 0.3) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, oklch(0.55 0.25 180 / 0.25) 0%, transparent 70%)' }}
            />
          </div>

          <motion.div
            style={{ y: heroY }}
            className="max-w-5xl mx-auto space-y-8 relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t('home.badge')}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] tracking-tight"
            >
              {t('home.hero.line1')}{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.65 0.15 40), oklch(0.75 0.20 25))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('home.hero.line2')}
              </span>
              <br />
              {t('home.hero.line3')}
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {t('home.hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
            >
              <Link
                href="/learn"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_oklch(0.65_0.15_40_[...]:"
                style={{ background: 'linear-gradient(135deg, oklch(0.65 0.15 40), oklch(0.75 0.20 25))', color: 'oklch(0.08 0 0)' }}
              >
                {t('home.cta1')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-primary/50 hover:bg-card text-foreground font-semibold text-base transition-all du[...]"
              >
                {t('home.cta2')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-mono uppercase tracking-widest">{t('home.explore')}</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ═══════════ STATS ═══════════ */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 border-y border-border relative overflow-hidden">
          <div className="absolute inset-0 -z-10"
            style={{ background: 'linear-gradient(135deg, oklch(0.65 0.15 40 / 0.03) 0%, transparent 60%)' }}
          />
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2"
              >
                <s.icon size={20} className="mx-auto text-primary/60" />
                <div className="text-4xl font-serif font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground">{t(s.key)}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════ FEATURED PHASES ═══════════ */}
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <div className="text-sm font-mono text-primary/70 mb-2 uppercase tracking-widest">{t('home.phases.start')}</div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                {t('home.phases.title')}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                {t('home.phases.desc')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {FEATURED_PHASES.map((phase, i) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="group relative"
                >
                  <Link
                    href={`/learn/${phase.id}`}
                    className="block h-full p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                    style={{ boxShadow: 'none' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px oklch(0.65 0.15 40 / 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono font-bold text-sm mb-4 group-hover[...]
                      {String(phase.number).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{phase.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {phase.topics.slice(0, 2).map((t, j) => (
                        <span key={j} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary/80 border border-primary/20">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                      {t('home.phases.start')} <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition font-medium"
              >
                {t('home.viewall')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ FEATURES ═══════════ */}
        <section className="px-4 py-24 sm:px-6 lg:px-8 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 -z-10"
            style={{ background: 'linear-gradient(135deg, oklch(0.55 0.25 180 / 0.03) 0%, transparent 60%)' }}
          />
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 text-center"
            >
              <div className="text-sm font-mono text-primary/70 mb-2 uppercase tracking-widest">{t('home.why')}</div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                {t('home.features')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shrink-0 group-hover:bg-primary/20 transition-colors">
                      <f.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-foreground mb-1 text-lg">{t(f.title)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t(f.desc)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="px-4 py-24 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                {t('home.cta.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('home.cta.subtitle')}
              </p>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_oklch(0.65_0.15_40_/_0.4)]"
                style={{ background: 'linear-gradient(135deg, oklch(0.65 0.15 40), oklch(0.75 0.20 25))', color: 'oklch(0.08 0 0)' }}
              >
                {t('home.ctalink')}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="oklch(0.65 0.15 40)" strokeWidth="1.5"/>
                <text x="16" y="21" textAnchor="middle" fill="oklch(0.65 0.15 40)" fontSize="16" fontFamily="Crimson Pro, serif" fontWeight="700">W</text>
              </svg>
              <span className="font-serif font-bold text-foreground">WikiWiz</span>
            </div>
            <span>{t('home.footer')}</span>
            <nav className="flex gap-6">
              <Link href="/learn" className="hover:text-primary transition">{t('nav.learn')}</Link>
              <Link href="/calculators" className="hover:text-primary transition">{t('nav.calculators')}</Link>
              <Link href="/mlk-lab" className="hover:text-primary transition">{t('nav.mlk')}</Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
