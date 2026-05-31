'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const calculations = useMemo(() => {
    const data = [];
    let amount = principal;

    for (let year = 0; year <= years; year++) {
      data.push({
        year,
        amount: Math.round(amount),
      });
      amount = principal * Math.pow(1 + rate / 100, year + 1);
    }

    const finalAmount = principal * Math.pow(1 + rate / 100, years);
    const totalInterest = finalAmount - principal;

    return { data, finalAmount, totalInterest };
  }, [principal, rate, years]);

  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(2)}L`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="space-y-8 p-6 rounded-lg border border-border bg-card"
    >
      <div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Compound Interest Calculator</h3>
        <p className="text-sm text-muted-foreground">See how your investments grow over time</p>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Principal */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">Initial Investment: ₹{principal.toLocaleString()}</label>
          </div>
          <Slider
            value={[principal]}
            onValueChange={(val) => setPrincipal(val[0])}
            min={10000}
            max={1000000}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Rate */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">Annual Return Rate: {rate}%</label>
          </div>
          <Slider
            value={[rate]}
            onValueChange={(val) => setRate(val[0])}
            min={0}
            max={30}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Years */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">Investment Period: {years} years</label>
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
          <p className="text-xs text-muted-foreground mb-1">Principal</p>
          <p className="text-xl font-bold text-primary">₹{(principal / 100000).toFixed(2)}L</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-background border border-border"
        >
          <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
          <p className="text-xl font-bold text-secondary">₹{(calculations.totalInterest / 100000).toFixed(2)}L</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-lg bg-background border border-primary/20 bg-primary/5"
        >
          <p className="text-xs text-muted-foreground mb-1">Final Amount</p>
          <p className="text-xl font-bold text-primary">₹{(calculations.finalAmount / 100000).toFixed(2)}L</p>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={calculations.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.15 0 0)" />
            <XAxis dataKey="year" stroke="oklch(0.6 0 0)" />
            <YAxis 
              stroke="oklch(0.6 0 0)" 
              tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'oklch(0.10 0 0)', border: '1px solid oklch(0.15 0 0)' }}
              formatter={(value: any) => `₹${(value / 100000).toFixed(2)}L`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="oklch(0.65 0.15 40)"
              strokeWidth={2}
              name="Total Amount"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Formula */}
      <div className="p-4 rounded-lg bg-background/40 border border-border text-sm text-muted-foreground">
        <p className="font-mono mb-2">Formula: A = P(1 + r)^t</p>
        <p>Where A = Final Amount, P = Principal, r = Rate of Interest, t = Time in years</p>
      </div>
    </motion.div>
  );
}
