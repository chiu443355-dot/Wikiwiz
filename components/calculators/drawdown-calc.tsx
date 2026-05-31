'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DrawdownCalculator() {
  const [peakValue, setPeakValue] = useState(1000000);
  const [currentValue, setCurrentValue] = useState(700000);

  // Calculate drawdown
  const drawdown = peakValue - currentValue;
  const drawdownPercent = ((drawdown / peakValue) * 100).toFixed(2);
  const recoveryNeeded = (drawdown / currentValue) * 100;

  // Simulate recovery scenarios
  const recoveryData = [];
  for (let i = 0; i <= 10; i++) {
    const scenarioLow = currentValue * Math.pow(1.05, i); // 5% monthly
    const scenarioMed = currentValue * Math.pow(1.08, i); // 8% monthly
    const scenarioHigh = currentValue * Math.pow(1.12, i); // 12% monthly

    recoveryData.push({
      month: i,
      value: currentValue,
      scenario5: Math.round(scenarioLow),
      scenario8: Math.round(scenarioMed),
      scenario12: Math.round(scenarioHigh),
      peak: peakValue,
    });
  }

  // Recovery time estimates
  const monthsRecovery5 = (Math.log(peakValue / currentValue) / Math.log(1.05)).toFixed(1);
  const monthsRecovery8 = (Math.log(peakValue / currentValue) / Math.log(1.08)).toFixed(1);
  const monthsRecovery12 = (Math.log(peakValue / currentValue) / Math.log(1.12)).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-lg border border-border bg-card p-8 space-y-8"
    >
      <div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Drawdown Calculator</h3>
        <p className="text-muted-foreground">Formula: (Peak - Current) / Peak × 100</p>
      </div>

      <div className="space-y-8">
        {/* Peak Value */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Peak Value: ₹{peakValue.toLocaleString()}</label>
            <span className="text-sm text-primary font-mono">{peakValue}</span>
          </div>
          <Slider
            value={[peakValue]}
            onValueChange={(val) => setPeakValue(val[0])}
            min={100000}
            max={10000000}
            step={100000}
            className="w-full"
          />
        </div>

        {/* Current Value */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Current Value: ₹{currentValue.toLocaleString()}</label>
            <span className="text-sm text-destructive font-mono">{currentValue}</span>
          </div>
          <Slider
            value={[currentValue]}
            onValueChange={(val) => setCurrentValue(val[0])}
            min={10000}
            max={peakValue}
            step={10000}
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
        <h4 className="font-serif font-bold text-foreground text-lg">Drawdown Analysis</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Loss Amount</p>
            <p className="text-2xl font-mono font-bold text-destructive">₹{drawdown.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Drawdown %</p>
            <p className="text-2xl font-mono font-bold text-destructive">{drawdownPercent}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Recovery Gain</p>
            <p className="text-2xl font-mono font-bold text-primary">{recoveryNeeded.toFixed(2)}%</p>
          </div>
        </div>

        {/* Recovery scenarios */}
        <div className="space-y-3 pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground">Recovery Timeline</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">at 5% monthly</p>
              <p className="text-lg font-mono font-bold text-primary">{monthsRecovery5} months</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">at 8% monthly</p>
              <p className="text-lg font-mono font-bold text-accent">{monthsRecovery8} months</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">at 12% monthly</p>
              <p className="text-lg font-mono font-bold text-secondary">{monthsRecovery12} months</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={recoveryData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }} />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid var(--color-border)`,
                borderRadius: '0.5rem',
                color: 'var(--color-foreground)',
              }}
              formatter={(value: number) => `₹${(value / 1000000).toFixed(2)}M`}
            />
            <Area
              type="monotone"
              dataKey="scenario12"
              stroke="var(--color-secondary)"
              fill="var(--color-secondary)"
              fillOpacity={0.1}
              name="12% Monthly"
            />
            <Area
              type="monotone"
              dataKey="scenario8"
              stroke="var(--color-accent)"
              fill="var(--color-accent)"
              fillOpacity={0.1}
              name="8% Monthly"
            />
            <Area
              type="monotone"
              dataKey="scenario5"
              stroke="var(--color-primary)"
              fill="url(#colorValue)"
              name="5% Monthly"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
