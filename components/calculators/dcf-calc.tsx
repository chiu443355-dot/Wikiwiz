'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DCFCalculator() {
  const [initialCF, setInitialCF] = useState(1000000);
  const [growthRate, setGrowthRate] = useState(10);
  const [discountRate, setDiscountRate] = useState(12);
  const [years, setYears] = useState(5);

  // Calculate DCF
  let totalPV = 0;
  const cfData = [];

  for (let year = 1; year <= years; year++) {
    const cf = initialCF * Math.pow(1 + growthRate / 100, year);
    const pv = cf / Math.pow(1 + discountRate / 100, year);
    totalPV += pv;
    cfData.push({
      year: year.toString(),
      cf: Math.round(cf),
      pv: Math.round(pv),
    });
  }

  // Terminal value (5% growth after projection period)
  const terminalCF = initialCF * Math.pow(1 + growthRate / 100, years) * 1.05;
  const terminalValue = terminalCF / ((discountRate / 100 - 0.05) * Math.pow(1 + discountRate / 100, years));
  totalPV += terminalValue;

  const enterpriseValue = totalPV;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-lg border border-border bg-card p-8 space-y-8"
    >
      <div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">DCF Valuation Calculator</h3>
        <p className="text-muted-foreground">Formula: Σ CF/(1+r)^t + Terminal Value</p>
      </div>

      <div className="space-y-8">
        {/* Initial Cash Flow */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Initial Cash Flow: ₹{initialCF.toLocaleString()}</label>
            <span className="text-sm text-primary font-mono">{initialCF}</span>
          </div>
          <Slider
            value={[initialCF]}
            onValueChange={(val) => setInitialCF(val[0])}
            min={100000}
            max={10000000}
            step={100000}
            className="w-full"
          />
        </div>

        {/* Growth Rate */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Growth Rate: {growthRate}%</label>
            <span className="text-sm text-primary font-mono">{growthRate}</span>
          </div>
          <Slider
            value={[growthRate]}
            onValueChange={(val) => setGrowthRate(val[0])}
            min={0}
            max={30}
            step={1}
            className="w-full"
          />
        </div>

        {/* Discount Rate */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Discount Rate (WACC): {discountRate}%</label>
            <span className="text-sm text-primary font-mono">{discountRate}</span>
          </div>
          <Slider
            value={[discountRate]}
            onValueChange={(val) => setDiscountRate(val[0])}
            min={5}
            max={25}
            step={1}
            className="w-full"
          />
        </div>

        {/* Years */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium text-foreground">Projection Period: {years} years</label>
            <span className="text-sm text-primary font-mono">{years}</span>
          </div>
          <Slider
            value={[years]}
            onValueChange={(val) => setYears(val[0])}
            min={1}
            max={10}
            step={1}
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
        <h4 className="font-serif font-bold text-foreground text-lg">DCF Valuation Result</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">PV of Cash Flows</p>
            <p className="text-2xl font-mono font-bold text-primary">₹{Math.round(totalPV - terminalValue).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Terminal Value</p>
            <p className="text-2xl font-mono font-bold text-accent">₹{Math.round(terminalValue).toLocaleString()}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">Enterprise Value</p>
            <p className="text-3xl font-mono font-bold text-primary">₹{Math.round(enterpriseValue).toLocaleString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cfData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid var(--color-border)`,
                borderRadius: '0.5rem',
                color: 'var(--color-foreground)',
              }}
              formatter={(value: number) => `₹${(value / 1000000).toFixed(1)}M`}
            />
            <Bar dataKey="pv" fill="var(--color-primary)" radius={[8, 8, 0, 0]} name="Present Value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
