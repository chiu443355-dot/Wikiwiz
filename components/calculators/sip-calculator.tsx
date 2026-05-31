'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const calculations = useMemo(() => {
    const data = [];
    let invested = 0;
    let corpus = 0;
    const monthlyRate = rate / 100 / 12;

    for (let month = 0; month <= years * 12; month++) {
      corpus = corpus * (1 + monthlyRate) + monthlyAmount;
      invested = month * monthlyAmount;

      if (month % 12 === 0) {
        data.push({
          year: month / 12,
          invested,
          corpus: Math.round(corpus),
          returns: Math.round(corpus - invested),
        });
      }
    }

    return { data, finalCorpus: corpus, totalInvested: invested, totalReturns: corpus - invested };
  }, [monthlyAmount, rate, years]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="space-y-8 p-6 rounded-lg border border-border bg-card"
    >
      <div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">SIP Calculator</h3>
        <p className="text-sm text-muted-foreground">Systematic Investment Plan - build wealth monthly</p>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Monthly Amount */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">Monthly Investment: ₹{monthlyAmount.toLocaleString()}</label>
          </div>
          <Slider
            value={[monthlyAmount]}
            onValueChange={(val) => setMonthlyAmount(val[0])}
            min={1000}
            max={100000}
            step={1000}
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
            max={40}
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
          <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
          <p className="text-xl font-bold text-primary">₹{(calculations.totalInvested / 100000).toFixed(2)}L</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-background border border-border"
        >
          <p className="text-xs text-muted-foreground mb-1">Wealth Gain</p>
          <p className="text-xl font-bold text-secondary">₹{(calculations.totalReturns / 100000).toFixed(2)}L</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-lg bg-background border border-primary/20 bg-primary/5"
        >
          <p className="text-xs text-muted-foreground mb-1">Final Corpus</p>
          <p className="text-xl font-bold text-primary">₹{(calculations.finalCorpus / 100000).toFixed(2)}L</p>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={calculations.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.15 0 0)" />
            <XAxis dataKey="year" stroke="oklch(0.6 0 0)" />
            <YAxis stroke="oklch(0.6 0 0)" tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'oklch(0.10 0 0)', border: '1px solid oklch(0.15 0 0)' }}
              formatter={(value: any) => `₹${(value / 100000).toFixed(2)}L`}
            />
            <Legend />
            <Bar dataKey="invested" fill="oklch(0.6 0.15 40)" name="Invested" />
            <Bar dataKey="returns" fill="oklch(0.75 0.20 25)" name="Wealth Gain" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Formula */}
      <div className="p-4 rounded-lg bg-background/40 border border-border text-sm text-muted-foreground">
        <p className="font-mono mb-2">Formula: FV = PMT × [(1+r)^n - 1] / r</p>
        <p>Where FV = Future Value, PMT = Monthly Payment, r = Monthly Rate, n = Number of Months</p>
      </div>
    </motion.div>
  );
}
