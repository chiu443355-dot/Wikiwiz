'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function InflationCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [inflationRate, setInflationRate] = useState(5);
  const [years, setYears] = useState(10);

  const calculations = useMemo(() => {
    const data = [];

    for (let year = 0; year <= years; year++) {
      const purchasingPower = amount / Math.pow(1 + inflationRate / 100, year);
      data.push({
        year,
        original: amount,
        purchasingPower: Math.round(purchasingPower),
      });
    }

    const finalPower = amount / Math.pow(1 + inflationRate / 100, years);
    const loss = amount - finalPower;
    const lossPercent = (loss / amount) * 100;

    return { data, finalPower, loss, lossPercent };
  }, [amount, inflationRate, years]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="space-y-8 p-6 rounded-lg border border-border bg-card"
    >
      <div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Inflation Calculator</h3>
        <p className="text-sm text-muted-foreground">See how inflation erodes your purchasing power</p>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Amount */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">Starting Amount: ₹{amount.toLocaleString()}</label>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(val) => setAmount(val[0])}
            min={100000}
            max={10000000}
            step={100000}
            className="w-full"
          />
        </div>

        {/* Inflation Rate */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">Annual Inflation Rate: {inflationRate.toFixed(1)}%</label>
          </div>
          <Slider
            value={[inflationRate]}
            onValueChange={(val) => setInflationRate(val[0])}
            min={0}
            max={15}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Years */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">Time Period: {years} years</label>
          </div>
          <Slider
            value={[years]}
            onValueChange={(val) => setYears(val[0])}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-lg bg-background border border-border"
        >
          <p className="text-xs text-muted-foreground mb-1">Original Amount</p>
          <p className="text-xl font-bold text-primary">₹{(amount / 100000).toFixed(2)}L</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-background border border-border"
        >
          <p className="text-xs text-muted-foreground mb-1">Purchasing Power</p>
          <p className="text-xl font-bold text-accent">₹{(calculations.finalPower / 100000).toFixed(2)}L</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-lg bg-background border border-destructive/20 bg-destructive/5"
        >
          <p className="text-xs text-muted-foreground mb-1">Purchasing Power Loss</p>
          <p className="text-xl font-bold text-destructive">{calculations.lossPercent.toFixed(1)}%</p>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={calculations.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.15 0 0)" />
            <XAxis dataKey="year" stroke="oklch(0.6 0 0)" />
            <YAxis stroke="oklch(0.6 0 0)" tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'oklch(0.10 0 0)', border: '1px solid oklch(0.15 0 0)' }}
              formatter={(value: any) => `₹${(value / 100000).toFixed(2)}L`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="original"
              stroke="oklch(0.65 0.15 40)"
              strokeWidth={2}
              name="Nominal Amount"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="purchasingPower"
              stroke="oklch(0.75 0.20 25)"
              strokeWidth={2}
              name="Real Purchasing Power"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Info */}
      <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-sm text-muted-foreground">
        <p className="mb-2 font-semibold text-destructive">Why This Matters</p>
        <p>If inflation is 5% and your savings earn 3%, you&apos;re actually losing 2% in purchasing power annually. This is why investing is essential!</p>
      </div>
    </motion.div>
  );
}
