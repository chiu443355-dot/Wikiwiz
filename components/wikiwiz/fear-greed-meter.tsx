'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FearGreedData {
  value: number;
  valueText: string;
  lastUpdated: string;
  error?: string;
}

function getColor(value: number) {
  if (value <= 25) return { text: 'text-red-400', bar: 'from-red-600 to-red-400', label: 'Extreme Fear' };
  if (value <= 45) return { text: 'text-orange-400', bar: 'from-orange-600 to-orange-400', label: 'Fear' };
  if (value <= 55) return { text: 'text-yellow-400', bar: 'from-yellow-600 to-yellow-400', label: 'Neutral' };
  if (value <= 75) return { text: 'text-lime-400', bar: 'from-lime-600 to-lime-400', label: 'Greed' };
  return { text: 'text-green-400', bar: 'from-green-600 to-green-400', label: 'Extreme Greed' };
}

export function FearGreedMeter(_props?: { value?: number; size?: string }) {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/fear-greed');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch Fear & Greed:', err);
        setData({ value: 50, valueText: 'Neutral', lastUpdated: new Date().toISOString() });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl border border-border bg-card h-full flex items-center justify-center">
        <span className="text-sm text-muted-foreground animate-pulse font-mono">
          Fetching market sentiment...
        </span>
      </div>
    );
  }

  const score = data?.value ?? 50;
  const colors = getColor(score);

  return (
    <div className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <h3 className="font-serif font-bold text-xl text-foreground">Fear &amp; Greed</h3>
        <span className="text-xs font-mono px-2 py-1 bg-primary/10 rounded-md text-primary border border-primary/20">
          CNN Index
        </span>
      </div>

      {/* Score */}
      <div className="text-center py-4">
        <div className={`text-6xl font-mono font-black ${colors.text}`}>{score}</div>
        <div className="text-sm text-muted-foreground mt-1 font-mono">/100</div>
        <div className={`text-lg font-serif font-bold mt-2 ${colors.text}`}>
          {data?.valueText || colors.label}
        </div>
      </div>

      {/* Bar */}
      <div className="w-full bg-muted h-3 rounded-full overflow-hidden border border-border/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colors.bar}`}
        />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>Fear</span>
        <span>Neutral</span>
        <span>Greed</span>
      </div>

      <p className="text-xs text-muted-foreground border-t border-border/40 pt-3 font-serif italic leading-relaxed">
        "He whose mind is untroubled in the midst of sorrows and free from desire amid pleasures... he is a sage of settled intelligence." — BG 2.56
      </p>
    </div>
  );
}
