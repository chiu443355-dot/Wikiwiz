'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function KellyCriterionCalculator() {
  const [winRate, setWinRate] = useState(55);
  const [avgWin, setAvgWin] = useState(1.5);
  const [avgLoss, setAvgLoss] = useState(1);

  // Kelly Formula: f* = (bp - q) / b
  // f* = optimal fraction of bankroll to risk
  // b = ratio of win to loss (avgWin / avgLoss)
  // p = win probability
  // q = loss probability (1 - p)

  const p = winRate / 100;
  const q = 1 - p;
  const b = avgWin / avgLoss;

  const kellyFraction = (b * p - q) / b;
  const fractionalKelly = kellyFraction / 2; // Conservative: use half Kelly
  const kellySafe = Math.max(0, kellyFraction); // Ensure non-negative

  // Simulate portfolio growth
  const growthData = [];
  let account = 100000;

  for (let i = 0; i <= 100; i++) {
    growthData.push({
      trades: i,
      kelly: account,
      halfKelly: account,
      quarter: account,
    });

    // Calculate expected growth per trade
    const kellyGrowth = 1 + kellySafe * ((p * avgWin) - (q * avgLoss));
    const halfKellyGrowth = 1 + fractionalKelly * ((p * avgWin) - (q * avgLoss));
    const quarterKellyGrowth = 1 + (kellySafe / 4) * ((p * avgWin) - (q * avgLoss));

    account = 100000;
    for (let j = 0; j < i; j++) {
      account *= kellyGrowth;
    }
    growthData[i].kelly = Math.round(account);

    account = 100000;
    for (let j = 0; j < i; j++) {
      account *= halfKellyGrowth;
    }
    growthData[i].halfKelly = Math.round(account);

    account = 100000;
    for (let j = 0; j < i; j++) {
      account *= quarterKellyGrowth;
    }
    growthData[i].quarter = Math.round(account);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-lg border border-border bg-card p-8 space-y-8"
    >
      <div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Kelly Criterion Calculator</h3>
        <p className="text-muted-foreground">Formula: f* = (bp - q) / b</p>
      </div>

      <div className="space-y-8">
        {/* Win Rate */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Win Rate: {winRate}%</label>
            <span className="text-sm text-primary font-mono">{winRate}</span>
          </div>
          <Slider
            value={[winRate]}
            onValueChange={(val) => setWinRate(val[0])}
            min={10}
            max={90}
            step={1}
            className="w-full"
          />
        </div>

        {/* Average Win */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Avg Win per Trade: {avgWin}x</label>
            <span className="text-sm text-primary font-mono">{avgWin}</span>
          </div>
          <Slider
            value={[avgWin]}
            onValueChange={(val) => setAvgWin(val[0])}
            min={0.5}
            max={5}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Average Loss */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Avg Loss per Trade: {avgLoss}x</label>
            <span className="text-sm text-primary font-mono">{avgLoss}</span>
          </div>
          <Slider
            value={[avgLoss]}
            onValueChange={(val) => setAvgLoss(val[0])}
            min={0.1}
            max={3}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg bg-primary/10 border border-primary/30 p-6 space-y-4"
      >
        <h4 className="font-serif font-bold text-foreground text-lg">Kelly Criterion Results</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Full Kelly</p>
            <p className="text-3xl font-mono font-bold text-primary">{(kellySafe * 100).toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground mt-1">Aggressive</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Half Kelly</p>
            <p className="text-3xl font-mono font-bold text-accent">{(fractionalKelly * 100).toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground mt-1">Recommended</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Expectancy</p>
            <p className="text-3xl font-mono font-bold text-primary">
              {((p * avgWin - q * avgLoss) * 100).toFixed(2)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Per Trade</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground italic mt-4">
          🎯 Use Half Kelly for safety. Full Kelly can lead to large drawdowns.
        </p>
      </motion.div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData.slice(0, 50)}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="trades" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid var(--color-border)`,
                borderRadius: '0.5rem',
                color: 'var(--color-foreground)',
              }}
              formatter={(value: number) => `₹${(value / 100000).toFixed(1)}x`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="kelly"
              stroke="var(--color-primary)"
              strokeWidth={2}
              name="Full Kelly"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="halfKelly"
              stroke="var(--color-accent)"
              strokeWidth={2}
              name="Half Kelly"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="quarter"
              stroke="var(--color-secondary)"
              strokeWidth={2}
              name="Quarter Kelly"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
