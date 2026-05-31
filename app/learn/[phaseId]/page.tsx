'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/wikiwiz/navbar';
import { chapters } from '@/data/chapters';
import { phases } from '@/data/phases';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function PhasePage() {
  const params = useParams();
  const phaseId = params.phaseId as string;
  const phase = phases.find((p) => p.id === phaseId);

  if (!phase) return null;

  const phaseChapters = chapters
    .filter((c) => c.phaseId === phaseId)
    .sort((a, b) => a.number - b.number);

  const phaseIndex = phases.findIndex((p) => p.id === phaseId);
  const prevPhase = phaseIndex > 0 ? phases[phaseIndex - 1] : null;
  const nextPhase = phaseIndex < phases.length - 1 ? phases[phaseIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-20 sm:px-6 lg:px-8 border-b border-border"
        >
          <div className="max-w-5xl mx-auto">
            <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8">
              <ArrowLeft size={16} /> Back to Roadmap
            </Link>
            <div className="text-sm font-mono text-primary/70 mb-3 tracking-wider uppercase">Phase {phase.number}</div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">{phase.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{phase.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Clock size={16} className="text-primary" />
              {phase.duration}
            </div>
            {phaseChapters.length > 0 && (
              <Link
                href={`/learn/${phaseId}/${phaseChapters[0].id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
              >
                <BookOpen size={18} /> Start Learning <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </motion.section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Chapters in this Phase</h2>
            <div className="space-y-4">
              {phaseChapters.map((ch, index) => (
                <motion.div key={ch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ x: 4 }}>
                  <Link
                    href={`/learn/${phaseId}/${ch.id}`}
                    className="group flex items-center gap-6 p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {String(ch.number + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">{ch.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{ch.script.slice(0, 120).replace(/[#*]/g, '')}...</p>
                    </div>
                    <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto flex justify-between">
            {prevPhase ? (
              <Link href={`/learn/${prevPhase.id}`} className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition">
                <ArrowLeft size={18} />
                <div><div className="text-xs text-muted-foreground">Previous Phase</div><div className="font-medium">{prevPhase.title}</div></div>
              </Link>
            ) : <div />}
            {nextPhase ? (
              <Link href={`/learn/${nextPhase.id}`} className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition text-right">
                <div><div className="text-xs text-muted-foreground">Next Phase</div><div className="font-medium">{nextPhase.title}</div></div>
                <ArrowRight size={18} />
              </Link>
            ) : <div />}
          </div>
        </section>
      </main>
    </>
  );
}
