'use client';
 
import { motion } from 'framer-motion';
import { Navbar } from '@/components/wikiwiz/navbar';
import { chapters } from '@/data/chapters';
import { phases } from '@/data/phases';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Star, Lock } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
 
function PhaseContent({ phaseId }: { phaseId: string }) {
  const phase = phases.find((p) => p.id === phaseId);
  const phaseChapters = chapters
    .filter((c) => c.phaseId === phaseId)
    .sort((a, b) => a.number - b.number);
 
  if (!phase) {
    notFound();
  }
 
  const phaseIndex = phases.findIndex((p) => p.id === phaseId);
  const prevPhase = phaseIndex > 0 ? phases[phaseIndex - 1] : null;
  const nextPhase = phaseIndex < phases.length - 1 ? phases[phaseIndex + 1] : null;
 
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 border-b border-border"
        >
          {/* Background glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
          </div>
 
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8"
              >
                <ArrowLeft size={16} />
                Back to Roadmap
              </Link>
            </motion.div>
 
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-sm font-mono text-primary/70 mb-3 tracking-wider uppercase">
                  Phase {phase.number}
                </div>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
                  {phase.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {phase.description}
                </p>
 
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    {phase.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} className="text-primary" />
                    {phaseChapters.length} chapters
                  </span>
                </div>
 
                {phaseChapters.length > 0 && (
                  <Link
                    href={`/learn/${phaseId}/${phaseChapters[0].id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
                  >
                    <BookOpen size={18} />
                    Start Learning
                    <ArrowRight size={18} />
                  </Link>
                )}
              </motion.div>
 
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20"
              >
                <div className="text-xs text-primary font-semibold mb-3 uppercase tracking-wider">
                  Gita Wisdom for this Phase
                </div>
                <blockquote className="font-serif text-base text-foreground italic leading-relaxed mb-4">
                  "{phase.gitaShloka.verse}"
                </blockquote>
                <p className="text-sm text-muted-foreground">{phase.gitaShloka.meaning}</p>
              </motion.div>
            </div>
 
            {/* Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap gap-2"
            >
              {phase.topics.map((topic, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                >
                  {topic}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.section>
 
        {/* Chapters Grid */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-serif font-bold text-foreground mb-8"
            >
              {phaseChapters.length > 0 ? 'Chapters in this Phase' : 'Coming Soon'}
            </motion.h2>
 
            {phaseChapters.length > 0 ? (
              <div className="space-y-4">
                {phaseChapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      href={`/learn/${phaseId}/${chapter.id}`}
                      className="group flex items-center gap-6 p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                    >
                      {/* Chapter Number */}
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {String(chapter.number + 1).padStart(2, '0')}
                      </div>
 
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {chapter.script.slice(0, 120).replace(/[#*]/g, '')}...
                        </p>
                      </div>
 
                      {/* Arrow */}
                      <ArrowRight
                        size={20}
                        className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-muted-foreground"
              >
                <BookOpen size={48} className="mx-auto mb-4 text-primary/30" />
                <p className="text-lg">Content for this phase is being prepared.</p>
                <p className="text-sm mt-2">Check back soon!</p>
              </motion.div>
            )}
          </div>
        </section>
 
        {/* Phase Navigation */}
        <section className="px-4 py-12 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between">
            {prevPhase ? (
              <Link
                href={`/learn/${prevPhase.id}`}
                className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs text-muted-foreground">Previous Phase</div>
                  <div className="font-medium text-foreground">{prevPhase.title}</div>
                </div>
              </Link>
            ) : <div />}
 
            {nextPhase ? (
              <Link
                href={`/learn/${nextPhase.id}`}
                className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group text-right"
              >
                <div>
                  <div className="text-xs text-muted-foreground">Next Phase</div>
                  <div className="font-medium text-foreground">{nextPhase.title}</div>
                </div>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </section>
      </main>
    </>
  );
}
 
export default function PhasePage() {
  const params = useParams();
  const phaseId = params.phaseId as string;
  return <PhaseContent phaseId={phaseId} />;
}
