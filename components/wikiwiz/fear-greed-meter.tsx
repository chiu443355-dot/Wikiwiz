'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FearGreedData {
  value: string;
  value_classification: string;
}

export function FearGreedMeter() {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSentiment() {
      try {
        const res = await fetch('https://api.alternative.me/fng/');
        const json = await res.json();
        if (json.data && json.data[0]) {
          setData(json.data[0]);
        }
      } catch (err) {
        console.error('Failed fetching live sentiment telemetry data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSentiment();
  }, []);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl border border-border bg-card text-center h-[240px] flex items-center justify-center">
        <span className="text-sm text-muted-foreground animate-pulse font-mono">Syncing market sentiment metrics...</span>
      </div>
    );
  }

  if (!data) return null;
  const score = parseInt(data.value) || 50;

  return (
    <div className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif font-bold text-xl text-foreground tracking-wide">Fear & Greed Sentiment</h3>
          <span className="text-xs font-mono px-2 py-1 bg-primary/10 rounded-md text-primary border border-primary/20">Live API Feed</span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Current State</span>
              <div className="text-2xl font-serif font-bold text-foreground mt-0.5">{data.value_classification}</div>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Score</span>
              <div className="text-4xl font-mono font-black text-primary">{score}<span className="text-sm font-normal text-muted-foreground">/100</span></div>
            </div>
          </div>

          {/* Dynamic Progress Indicator Bar */}
          <div className="w-full bg-muted h-3 rounded-full overflow-hidden relative border border-border/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6 leading-relaxed border-t border-border/40 pt-4 font-serif italic">
        "He whose mind is untroubled in the midst of sorrows and free from desire amid pleasures... he is a sage of settled intelligence." — Bhagavad Gita 2.56
      </p>
    </div>
  );
}
