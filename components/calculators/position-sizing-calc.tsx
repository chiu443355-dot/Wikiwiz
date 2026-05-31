'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PositionSizingCalculator() {
  const [accountSize, setAccountSize] = useState(100000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLoss, setStopLoss] = useState(90);

  const riskAmount = (accountSize * riskPercent) / 100;
  const priceDifference = entryPrice - stopLoss;
  const positionSize = priceDifference > 0 ? Math.floor(riskAmount / priceDifference) : 0;
  const investmentNeeded = positionSize * entryPrice;

  const chartData = [
    { name: 'Account', value: accountSize },
    { name: 'Risk Amount', value: riskAmount },
    { name: 'Position Value', value: investmentNeeded },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-lg border border-border bg-card p-8 space-y-8"
    >
      <div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Position Sizing Calculator</h3>
        <p className="text-muted-foreground">Formula: (Account × Risk%) / (Entry - Stop Loss)</p>
      </div>

      <div className="space-y-8">
        {/* Account Size */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Account Size: ₹{accountSize.toLocaleString()}</label>
            <span className="text-sm text-primary font-mono">{accountSize}</span>
          </div>
          <Slider
            value={[accountSize]}
            onValueChange={(val) => setAccountSize(val[0])}
            min={10000}
            max={10000000}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Risk Percentage */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Risk per Trade: {riskPercent}%</label>
            <span className="text-sm text-primary font-mono">₹{riskAmount.toLocaleString()}</span>
          </div>
          <Slider
            value={[riskPercent]}
            onValueChange={(val) => setRiskPercent(val[0])}
            min={0.5}
            max={5}
            step={0.5}
            className="w-full"
          />
        </div>

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
          <p className="text-xs text-muted-foreground">Risk: ₹{priceDifference.toFixed(2)} per share</p>
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-lg bg-primary/10 border border-primary/30 p-6 space-y-4"
      >
        <h4 className="font-serif font-bold text-foreground text-lg">Position Sizing Result</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Number of Shares</p>
            <p className="text-3xl font-mono font-bold text-primary">{positionSize.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Capital Required</p>
            <p className="text-3xl font-mono font-bold text-primary">₹{investmentNeeded.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Loss</p>
            <p className="text-2xl font-mono font-bold text-destructive">₹{riskAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Profit Potential</p>
            <p className="text-2xl font-mono font-bold text-accent">
              ₹{(positionSize * (entryPrice - stopLoss)).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
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
            <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
