'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from '@/components/wikiwiz/navbar';
import { CompoundInterestCalc } from '@/components/calculators/compound-interest-calc';
import { SIPCalculator } from '@/components/calculators/sip-calculator';
import { InflationCalculator } from '@/components/calculators/inflation-calculator';
import { PositionSizingCalculator } from '@/components/calculators/position-sizing-calc';
import { RiskRewardCalculator } from '@/components/calculators/risk-reward-calc';
import { DCFCalculator } from '@/components/calculators/dcf-calc';
import { KellyCriterionCalculator } from '@/components/calculators/kelly-criterion-calc';
import { DrawdownCalculator } from '@/components/calculators/drawdown-calc';
import { useTranslation } from '@/lib/hooks/use-translation';

const calculators = [
  {
    id: 'compound',
    title: 'Compound Interest',
    description: 'Understand exponential growth through compound interest',
  },
  {
    id: 'sip',
    title: 'SIP Calculator',
    description: 'Plan your systematic monthly investments',
  },
  {
    id: 'inflation',
    title: 'Inflation Calculator',
    description: 'See how inflation affects your purchasing power',
  },
  {
    id: 'position-sizing',
    title: 'Position Sizing',
    description: 'Calculate optimal position sizes based on risk',
  },
  {
    id: 'risk-reward',
    title: 'Risk-Reward Ratio',
    description: 'Analyze your trade setups',
  },
  {
    id: 'dcf',
    title: 'DCF Valuation',
    description: 'Find intrinsic value of stocks',
  },
  {
    id: 'kelly',
    title: 'Kelly Criterion',
    description: 'Calculate optimal bet sizing',
  },
  {
    id: 'drawdown',
    title: 'Drawdown Calculator',
    description: 'Understand recovery periods',
  },
];

export default function CalculatorsPage() {
  const { t } = useTranslation();
  const [selectedCalc, setSelectedCalc] = useState('compound');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-16 sm:px-6 lg:px-8 border-b border-border"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
              Investment Calculators
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-time tools to help with your investment decisions
            </p>
          </div>
        </motion.section>

        {/* Content */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Calculator Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {calculators.map((calc) => (
                <motion.button
                  key={calc.id}
                  onClick={() => setSelectedCalc(calc.id)}
                  whileHover={{ y: -2 }}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    selectedCalc === calc.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                >
                  <h3 className={`font-serif font-bold mb-1 ${
                    selectedCalc === calc.id ? 'text-primary' : 'text-foreground'
                  }`}>
                    {calc.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{calc.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Active Calculator */}
            <motion.div
              key={selectedCalc}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedCalc === 'compound' && <CompoundInterestCalc />}
              {selectedCalc === 'sip' && <SIPCalculator />}
              {selectedCalc === 'inflation' && <InflationCalculator />}
              {selectedCalc === 'position-sizing' && <PositionSizingCalculator />}
              {selectedCalc === 'risk-reward' && <RiskRewardCalculator />}
              {selectedCalc === 'dcf' && <DCFCalculator />}
              {selectedCalc === 'kelly' && <KellyCriterionCalculator />}
              {selectedCalc === 'drawdown' && <DrawdownCalculator />}
            </motion.div>

            {/* Educational Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 pt-12 border-t border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-foreground">Why Use Calculators?</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span>Make informed investment decisions backed by math</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span>Understand the impact of each variable on outcomes</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span>Plan your financial future with confidence</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span>Remove emotions from the investment equation</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-foreground">Key Principles</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-secondary">→</span>
                      <span>Start small, think long-term, and stay consistent</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary">→</span>
                      <span>Inflation is your enemy; returns above inflation are your goal</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary">→</span>
                      <span>Time in the market beats timing the market</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary">→</span>
                      <span>Know your risk; measure your returns against it</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8 bg-card/30">
          <div className="max-w-7xl mx-auto text-center text-muted-foreground">
            <p className="mb-2">All calculators are educational tools for learning purposes</p>
            <p className="text-sm">Results are estimates based on assumptions. Actual returns may vary.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
