'use client';

import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Phase } from '@/data/phases';

interface PhaseCardProps {
  phase: Phase;
  index: number;
}

export function PhaseCard({ phase, index }: PhaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div className="h-full p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors duration-300">
        {phase.locked && (
          <div className="absolute top-3 right-3 p-2 rounded-full bg-destructive/20">
            <Lock size={16} className="text-destructive" />
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm font-mono text-primary/70">Phase {phase.number}</div>
            <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition">
              {phase.title}
            </h3>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-sm text-muted-foreground">{phase.description}</p>
          
          <div className="flex items-center gap-2 text-xs text-primary/70 font-mono">
            <span>⏱</span>
            <span>{phase.duration}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {phase.topics.slice(0, 2).map((topic, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded bg-primary/10 text-primary/80 border border-primary/20"
              >
                {topic}
              </span>
            ))}
            {phase.topics.length > 2 && (
              <span className="px-2 py-1 text-xs rounded bg-muted/20 text-muted-foreground">
                +{phase.topics.length - 2} more
              </span>
            )}
          </div>
        </div>

        {!phase.locked && (
          <Link
            href={`/learn/${phase.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
          >
            Start Learning
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
