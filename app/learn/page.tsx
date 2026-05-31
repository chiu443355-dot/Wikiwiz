'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/wikiwiz/navbar';
import { phases } from '@/data/phases';
import { chapters } from '@/data/chapters';
import Link from 'next/link';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-16 sm:px-6 lg:px-8 border-b border-border"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
              Learning Roadmap
            </h1>
            <p className="text-lg text-muted-foreground">
              From financial literacy to quantitative mastery — 15 phases
            </p>
          </div>
        </motion.section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phases.map((phase, index) => {
                const phaseChapters = chapters.filter((c) => c.phaseId === phase.id);
                const firstChapter = phaseChapters.sort((a, b) => a.number - b.number)[0];
                return (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <Link
                      href={firstChapter ? `/learn/${phase.id}/${firstChapter.id}` : `/learn/${phase.id}`}
                      className="group block h-full p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {String(phase.number).padStart(2, '0')}
                        </div>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {phase.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {phaseChapters.length} chapter{phaseChapters.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {phase.topics.slice(0, 2).map((t, j) => (
                          <span key={j} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary/80 border border-primary/20">
                            {t}
                          </span>
                        ))}
                        {phase.topics.length > 2 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                            +{phase.topics.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                        Start Learning <ArrowRight size={14} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
