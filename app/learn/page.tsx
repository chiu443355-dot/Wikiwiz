'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from '@/components/wikiwiz/navbar';
import { PhaseCard } from '@/components/wikiwiz/phase-card';
import { useTranslation } from '@/lib/hooks/use-translation';
import { phases } from '@/data/phases';
import { ChevronDown } from 'lucide-react';

export default function LearnPage() {
  const { t } = useTranslation();
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-16 sm:px-6 lg:px-8 border-b border-border"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
              {t('learn.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('learn.description')}
            </p>
          </div>
        </motion.section>

        {/* Content */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Grid view for phase cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {phases.map((phase, index) => (
                <PhaseCard key={phase.id} phase={phase} index={index} />
              ))}
            </div>

            {/* Expandable accordion view as alternative */}
            <div className="mt-20 pt-12 border-t border-border">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
                Phase Details
              </h2>

              <div className="space-y-3">
                {phases.map((phase) => (
                  <motion.div
                    key={phase.id}
                    initial={false}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedPhase(expandedPhase === phase.id ? null : phase.id)
                      }
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition"
                    >
                      <div className="text-left flex-1">
                        <div className="font-mono text-sm text-primary/70">
                          Phase {phase.number}
                        </div>
                        <h3 className="font-serif font-bold text-foreground">
                          {phase.title}
                        </h3>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-primary transition-transform ${
                          expandedPhase === phase.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedPhase === phase.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-4 bg-card/30 border-t border-border space-y-4"
                      >
                        <p className="text-muted-foreground">{phase.description}</p>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Topics</h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.topics.map((topic, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-background/40 p-4 rounded-lg border border-border">
                          <p className="text-sm text-muted-foreground mb-2 italic">
                            Gita Wisdom:
                          </p>
                          <p className="text-foreground font-serif">
                            {phase.gitaShloka.verse}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {phase.gitaShloka.meaning}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-primary">
                          <span>⏱</span>
                          <span>{phase.duration}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8 bg-card/30">
          <div className="max-w-7xl mx-auto text-center text-muted-foreground">
            <p>WikiWiz Learning Roadmap - 15 Phases to Financial Mastery</p>
          </div>
        </footer>
      </main>
    </>
  );
}
