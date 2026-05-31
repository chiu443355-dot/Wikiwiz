'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState(100);
  const [targetPrice, setTargetPrice] = useState(150);
  const [stopLoss, setStopLoss] = useState(80);

  const profit = targetPrice - entryPrice;
  const loss = entryPrice - stopLoss;
  const ratio = loss > 0 ? (profit / loss).toFixed(2) : '0.00';
  const profitPercent = ((profit / entryPrice) * 100).toFixed(2);
  const lossPercent = ((loss / entryPrice) * 100).toFixed(2);

  const breakEvenWinRate = loss > 0 ? (100 / (1 + parseFloat(ratio))).toFixed(2) : '0.00';
  const dailyPL = [
    { trade: 1, account: 100000, pl: profit > 0 ? 100000 + profit * 100 : 100000 - loss * 100 },
    { trade: 5, account: 100000, pl: (parseFloat(ratio) > 1 ? 100000 + profit * 100 * 3 : 100000 - loss * 100 * 3) },
    { trade: 10, account: 100000, pl: (parseFloat(ratio) > 1 ? 100000 + profit * 100 * 6 : 100000 - loss * 100 * 6) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-lg border border-border bg-card p-8 space-y-8"
    >
      <div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Risk-Reward Calculator</h3>
        <p className="text-muted-foreground">Formula: (Target - Entry) / (Entry - Stop)</p>
      </div>

      <div className="space-y-8">
        {/* Entry Price */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Entry Price: ₹{entryPrice}</label>
            <span className="text-sm text-primary font-mono">{entryPrice}</span>
          </div>
          <Slider
            value={[entryPrice]}
            onValueChange={(val) => setEntryPrice(val[0])}
            min={10}
            max={500}
            step={1}
            className="w-full"
          />
        </div>

        {/* Target Price */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Target Price: ₹{targetPrice}</label>
            <span className="text-sm text-accent font-mono">{targetPrice}</span>
          </div>
          <Slider
            value={[targetPrice]}
            onValueChange={(val) => setTargetPrice(val[0])}
            min={entryPrice + 1}
            max={1000}
            step={1}
            className="w-full"
          />
        </div>

        {/* Stop Loss */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Stop Loss: ₹{stopLoss}</label>
            <span className="text-sm text-destructive font-mono">{stopLoss}</span>
          </div>
          <Slider
            value={[stopLoss]}
            onValueChange={(val) => setStopLoss(val[0])}
            min={1}
            max={entryPrice - 1}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg bg-primary/10 border border-primary/30 p-6 space-y-6"
      >
        <h4 className="font-serif font-bold text-foreground text-lg">Risk-Reward Analysis</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Profit Potential</p>
            <p className="text-2xl font-mono font-bold text-accent">₹{profit.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">{profitPercent}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Risk Amount</p>
            <p className="text-2xl font-mono font-bold text-destructive">₹{loss.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-1">{lossPercent}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Risk-Reward</p>
            <p className="text-2xl font-mono font-bold text-primary">1:{ratio}</p>
            {parseFloat(ratio) > 1 ? (
              <p className="text-xs text-accent mt-1">Good Risk-Reward</p>
            ) : (
              <p className="text-xs text-destructive mt-1">Poor Risk-Reward</p>
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Win Rate Needed</p>
            <p className="text-2xl font-mono font-bold text-primary">{breakEvenWinRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">For breakeven</p>
          </div>
        </div>
      </motion.div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyPL}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="trade" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid var(--color-border)`,
                borderRadius: '0.5rem',
                color: 'var(--color-foreground)',
              }}
              formatter={(value: number) => `₹${value.toLocaleString()}`}
            />
            <Legend />
            <Line type="monotone" dataKey="pl" stroke="var(--color-primary)" strokeWidth={2} name="Account Value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
