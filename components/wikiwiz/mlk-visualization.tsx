'use client';

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState, useEffect } from 'react';

interface MLKVisualizationProps {
  symbol: string;
  volatility: number;
}

// Internal CUIF framework (hidden from UI)
class CUIFFramework {
  private volatility: number;
  private liquidityStress: number;
  private regimeTransition: number;

  constructor(volatility: number) {
    this.volatility = volatility;
    this.liquidityStress = 0.3 + Math.random() * 0.4;
    this.regimeTransition = Math.sin(Date.now() / 50000) * 0.5 + 0.5;
  }

  // Calculate probabilistic paths based on hidden framework
  generateProbabilisticCone(periods: number = 12) {
    const cone = [];
    let baseValue = 100;
    
    for (let i = 0; i <= periods; i++) {
      const t = i / periods;
      const volatilityFactor = this.volatility * Math.sqrt(t);
      const stressFactor = this.liquidityStress * Math.cos(t * Math.PI * 2);
      
      // Pessimistic path (lower boundary)
      const pessimistic = baseValue * Math.exp(-volatilityFactor * 1.2 + stressFactor * 0.3);
      
      // Expected path (middle)
      const expected = baseValue * Math.exp(stressFactor * 0.2);
      
      // Optimistic path (upper boundary)
      const optimistic = baseValue * Math.exp(volatilityFactor * 1.2 + stressFactor * 0.2);
      
      cone.push({
        period: `${i * 30}d`,
        pessimistic: Math.round(pessimistic * 100) / 100,
        expected: Math.round(expected * 100) / 100,
        optimistic: Math.round(optimistic * 100) / 100,
      });
    }
    
    return cone;
  }

  // Detect regime based on CUIF logic
  detectRegime(): { name: string; color: string; intensity: number } {
    const stress = this.liquidityStress;
    const transition = this.regimeTransition;
    
    if (stress > 0.7) {
      return {
        name: 'Critical Liquidity State',
        color: 'text-red-500',
        intensity: 1
      };
    } else if (transition > 0.6) {
      return {
        name: 'Stress Regime',
        color: 'text-orange-500',
        intensity: 0.75
      };
    } else if (transition > 0.4) {
      return {
        name: 'Expansion Regime',
        color: 'text-blue-500',
        intensity: 0.5
      };
    } else {
      return {
        name: 'Stable Regime',
        color: 'text-green-500',
        intensity: 0.25
      };
    }
  }

  // Get volatility expansion metrics
  getVolatilityMetrics() {
    return {
      currentVol: Math.round(this.volatility * 100),
      expectedVol: Math.round(this.volatility * (1 + Math.sin(Date.now() / 30000) * 0.3) * 100),
      stressIndex: Math.round(this.liquidityStress * 100),
    };
  }
}

export function MLKVisualization({ symbol, volatility }: MLKVisualizationProps) {
  const [framework] = useState(() => new CUIFFramework(volatility));
  const [coneData, setConeData] = useState<any[]>([]);
  const [regime, setRegime] = useState<any>({});
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    setConeData(framework.generateProbabilisticCone(12));
    setRegime(framework.detectRegime());
    setMetrics(framework.getVolatilityMetrics());
  }, [framework, symbol]);

  return (
    <div className="space-y-8">
      {/* Regime Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="text-center">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Market Regime Forecast
          </h3>
          <motion.div
            key={regime.name}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-3xl font-serif font-bold ${regime.color} mb-2`}
          >
            {regime.name}
          </motion.div>
          <p className="text-sm text-muted-foreground">
            Based on probabilistic stress analysis
          </p>
        </div>

        {/* Stress Gauge */}
        <div className="flex justify-center">
          <div className="relative w-48 h-24">
            <svg className="w-full h-full" viewBox="0 0 200 100" style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.2))' }}>
              {/* Gauge background */}
              <path
                d="M 20 80 A 60 60 0 0 1 180 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border"
              />
              
              {/* Stress levels */}
              <path d="M 40 72 L 40 76" stroke="currentColor" strokeWidth="1" className="text-green-500" />
              <path d="M 100 20 L 100 24" stroke="currentColor" strokeWidth="1" className="text-orange-500" />
              <path d="M 160 72 L 160 76" stroke="currentColor" strokeWidth="1" className="text-red-500" />
              
              {/* Needle */}
              <motion.line
                x1="100"
                y1="80"
                x2={100 + 60 * Math.cos(Math.PI + (regime.intensity * Math.PI))}
                y2={80 - 60 * Math.sin(Math.PI + (regime.intensity * Math.PI))}
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary"
                animate={{
                  x2: 100 + 60 * Math.cos(Math.PI + (regime.intensity * Math.PI)),
                  y2: 80 - 60 * Math.sin(Math.PI + (regime.intensity * Math.PI))
                }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Center circle */}
              <circle cx="100" cy="80" r="4" fill="currentColor" className="text-primary" />
            </svg>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Current Vol</div>
            <div className="text-xl font-bold text-foreground">{metrics.currentVol}%</div>
          </div>
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Stress Index</div>
            <div className="text-xl font-bold text-foreground">{metrics.stressIndex}</div>
          </div>
          <div className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-1">Expected Vol</div>
            <div className="text-xl font-bold text-foreground">{metrics.expectedVol}%</div>
          </div>
        </div>
      </motion.div>

      {/* Probability Cone Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-sm uppercase tracking-widest text-muted-foreground">
          Probabilistic Path Expansion (30-day intervals)
        </h3>
        
        <div style={{ width: '100%', height: 300 }} className="rounded-lg bg-card border border-border p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={coneData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPessimistic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="period" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                formatter={(value: any) => Math.round(value as number * 100) / 100}
              />
              <ReferenceLine y={100} stroke="rgba(255,255,255,0.3)" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="optimistic" stroke="#10b981" fillOpacity={1} fill="url(#colorOptimistic)" />
              <Area type="monotone" dataKey="expected" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} />
              <Area type="monotone" dataKey="pessimistic" stroke="#ef4444" fillOpacity={1} fill="url(#colorPessimistic)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          Green = Optimistic scenario | Blue = Expected path | Red = Pessimistic scenario
        </p>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg"
      >
        <p className="text-xs text-amber-700 dark:text-amber-300">
          <strong>Disclaimer:</strong> WikiWiz MLK projections are probabilistic educational simulations for market stress visualization and regime forecasting. They are not guaranteed forecasts, investment advice, or predictive of future results. Use for educational purposes only. Always conduct your own research and consult financial advisors.
        </p>
      </motion.div>
    </div>
  );
}
