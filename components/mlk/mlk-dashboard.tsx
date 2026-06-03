'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ScatterChart,
  Scatter,
} from 'recharts';
import { IRPEngine, MarketState, PredictionType } from '@/lib/irp-engine';
import { AlertCircle, Play, Zap, Brain, TrendingUp, TrendingDown } from 'lucide-react';

// Gold price simulation data
const generateGoldPriceData = () => {
  const data = [];
  let price = 4500;
  for (let i = 0; i < 60; i++) {
    price += (Math.random() - 0.5) * 20;
    data.push({
      time: `${String(Math.floor(i / 4)).padStart(2, '0')}:${String((i % 4) * 15).padStart(2, '0')}`,
      price: Math.round(price),
      sma20: price + (Math.random() - 0.5) * 30,
      resistance: 4550,
      support: 4450,
    });
  }
  return data;
};

interface AnalysisResult {
  state: MarketState;
  goldPrice: number;
  priceChange: number;
  resistance: number;
  support: number;
}

export function MLKDashboard() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setPriceData] = useState(generateGoldPriceData());
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const aiResponseRef = useRef<HTMLDivElement>(null);

  const engineRef = useRef(new IRPEngine());

  const runAnalysis = () => {
    setIsLoading(true);
    setShowAI(false);
    setAiResponse('');
    
    // Simulate processing delay
    setTimeout(() => {
      const state = engineRef.current.run();
      const goldPrice = 4300 + Math.random() * 400;
      const priceChange = (Math.random() - 0.5) * 100;
      const resistance = goldPrice + 50;
      const support = goldPrice - 50;

      setAnalysisResult({
        state,
        goldPrice: Math.round(goldPrice),
        priceChange: Math.round(priceChange * 10) / 10,
        resistance: Math.round(resistance),
        support: Math.round(support),
      });

      // Regenerate price data for reactive updates
      setPriceData(generateGoldPriceData());
      setIsLoading(false);
    }, 800);
  };

  const askAI = async () => {
    if (!analysisResult) return;

    const prompt = `Based on this market analysis:
- Market Load: ${(analysisResult.state.rho * 100).toFixed(1)}%
- Direction Score: ${(analysisResult.state.directionScore * 100).toFixed(1)}%
- Market Condition Index: ${(analysisResult.state.mci * 100).toFixed(1)}%
- Prediction: ${analysisResult.state.prediction}
- Gold Price: $${analysisResult.goldPrice} (Change: ${analysisResult.priceChange > 0 ? '+' : ''}${analysisResult.priceChange.toFixed(2)}%)

What's the trading outlook? Provide brief, actionable insights.`;

    setAiLoading(true);
    setAiResponse('');
    setShowAI(true);

    try {
      const response = await fetch('/api/nvidia-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // Process complete lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.trim()) {
            // Filter out reasoning tags and keep content
            const content = line
              .replace(/\[REASONING\].*?\[\/REASONING\]/gs, '')
              .trim();
            
            if (content && content !== 'data: [DONE]') {
              setAiResponse((prev) => prev + content);
            }
          }
        }
      }

      // Process any remaining buffer
      if (buffer.trim()) {
        const content = buffer
          .replace(/\[REASONING\].*?\[\/REASONING\]/gs, '')
          .trim();
        if (content) {
          setAiResponse((prev) => prev + content);
        }
      }
    } catch (error) {
      console.error('AI request error:', error);
      setAiResponse('Error connecting to AI service. Please check your API configuration and try again.');
    } finally {
      setAiLoading(false);
    }

    // Auto-scroll to response
    setTimeout(() => {
      aiResponseRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const phaseInfo =
    analysisResult && engineRef.current.getMarketPhaseInfo(analysisResult.state.rho);
  const predictionDetails =
    analysisResult && engineRef.current.getPredictionDetails(analysisResult.state.prediction);

  return (
    <div className="w-full bg-background text-foreground space-y-8 py-8">
      {/* ════════════ DISCLAIMER ════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10 flex gap-3">
          <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1 text-sm">
            <p className="font-bold text-red-300">⚠️ CRITICAL DISCLAIMER</p>
            <p className="text-red-200/80">
              This is <strong>NOT a get-rich-quick</strong> system. Trading involves{' '}
              <strong>substantial risk of loss</strong>. Markets are inherently uncertain and probability-based.
              Past performance does not guarantee future results. <strong>You may lose your entire investment.</strong>{' '}
              Only trade with money you can afford to lose. This tool is for educational analysis only.
              <strong> Take full responsibility for your own trading decisions.</strong>
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ════════════ CONTROL PANEL ════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 flex-wrap"
        >
          <button
            onClick={runAnalysis}
            disabled={isLoading}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={18} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Running Analysis...' : 'Run IRP Analysis'}
          </button>

          {analysisResult && (
            <button
              onClick={askAI}
              disabled={aiLoading}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Brain size={18} className={aiLoading ? 'animate-spin' : ''} />
              {aiLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          )}
        </motion.div>

        {analysisResult && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* ════════════ TRADINGVIEW CHART ════════════ */}
              <motion.div
                key={`chart-${analysisResult.goldPrice}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl border border-border bg-card/50"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Gold Spot / USD · NANDA</h3>
                    <p className="text-sm text-muted-foreground mt-1">Reactive real-time market analysis</p>
                  </div>
                  <div className="text-right">
                    <motion.div 
                      key={`price-${analysisResult.goldPrice}`}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold text-amber-400"
                    >
                      ${analysisResult.goldPrice.toLocaleString()}
                    </motion.div>
                    <motion.div
                      key={`change-${analysisResult.priceChange}`}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`text-sm font-semibold ${
                        analysisResult.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {analysisResult.priceChange >= 0 ? '▲' : '▼'} {Math.abs(analysisResult.priceChange).toFixed(2)}%
                    </motion.div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={priceData}>
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0 0)" />
                    <XAxis dataKey="time" stroke="oklch(0.5 0 0)" />
                    <YAxis stroke="oklch(0.5 0 0)" domain={['dataMin - 50', 'dataMax + 50']} />
                    <Tooltip
                      contentStyle={{
                        background: 'oklch(0.08 0 0)',
                        border: '1px solid oklch(0.3 0 0)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#fbbf24' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      fill="url(#goldGradient)"
                      stroke="#fbbf24"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={true}
                    />
                    <Line dataKey="sma20" stroke="#60a5fa" strokeWidth={1} strokeDasharray="5 5" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <motion.div 
                    key={`resistance-${analysisResult.resistance}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 rounded-lg bg-green-500/10 border border-green-500/30"
                  >
                    <p className="text-xs text-muted-foreground">Resistance</p>
                    <p className="text-lg font-bold text-green-400">${analysisResult.resistance}</p>
                  </motion.div>
                  <motion.div 
                    key={`support-${analysisResult.support}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                  >
                    <p className="text-xs text-muted-foreground">Support</p>
                    <p className="text-lg font-bold text-red-400">${analysisResult.support}</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* ════════════ IRP ANALYSIS - REACTIVE ════════════ */}
              <motion.div
                key={`analysis-${analysisResult.state.prediction}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Market Condition */}
                <div className="p-6 rounded-2xl border border-border bg-card/50">
                  <h3 className="text-lg font-bold text-foreground mb-4">Market Condition</h3>

                  <motion.div 
                    key={`phase-${phaseInfo?.phase}`}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-xl border mb-4 ${phaseInfo?.color}`}
                  >
                    <p className="text-xs font-mono uppercase tracking-widest opacity-70 mb-1">Market Phase</p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl font-bold"
                    >
                      {phaseInfo?.phase}
                    </motion.p>
                    <p className="text-xs mt-2">{phaseInfo?.description}</p>
                  </motion.div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Market Load (ρ)</span>
                        <motion.span 
                          key={`rho-${analysisResult.state.rho}`}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-mono font-bold text-primary"
                        >
                          {(analysisResult.state.rho * 100).toFixed(1)}%
                        </motion.span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          key={`rho-bar-${analysisResult.state.rho}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${analysisResult.state.rho * 100}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full ${
                            analysisResult.state.rho > 0.85
                              ? 'bg-red-500'
                              : analysisResult.state.rho > 0.65
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Priority Decay Φ(ρ)</span>
                        <motion.span 
                          key={`priority-${analysisResult.state.priority}`}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-mono font-bold text-cyan-400"
                        >
                          {(analysisResult.state.priority * 100).toFixed(1)}%
                        </motion.span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          key={`priority-bar-${analysisResult.state.priority}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${analysisResult.state.priority * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="h-full bg-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Direction Score</span>
                        <motion.span 
                          key={`direction-${analysisResult.state.directionScore}`}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-mono font-bold text-amber-400"
                        >
                          {(analysisResult.state.directionScore * 100).toFixed(1)}%
                        </motion.span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          key={`direction-bar-${analysisResult.state.directionScore}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${analysisResult.state.directionScore * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Market Condition Index</span>
                        <motion.span 
                          key={`mci-${analysisResult.state.mci}`}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-mono font-bold text-purple-400"
                        >
                          {(analysisResult.state.mci * 100).toFixed(1)}%
                        </motion.span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <motion.div
                          key={`mci-bar-${analysisResult.state.mci}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${analysisResult.state.mci * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full bg-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prediction & Scenarios - REACTIVE */}
                <div className="p-6 rounded-2xl border border-border bg-card/50">
                  <h3 className="text-lg font-bold text-foreground mb-4">Market Prediction</h3>

                  <motion.div 
                    key={`pred-${analysisResult.state.prediction}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl border mb-4 bg-gradient-to-r ${
                      analysisResult.state.prediction === 'STRONG_BULL'
                        ? 'from-green-500/20 to-emerald-500/20 border-green-500/50'
                        : analysisResult.state.prediction === 'BULL'
                          ? 'from-green-500/10 to-green-500/10 border-green-500/30'
                          : analysisResult.state.prediction === 'SIDEWAYS'
                            ? 'from-yellow-500/20 to-yellow-500/20 border-yellow-500/50'
                            : analysisResult.state.prediction === 'BEAR'
                              ? 'from-orange-500/10 to-orange-500/10 border-orange-500/30'
                              : 'from-red-500/20 to-red-500/20 border-red-500/50'
                    }`}
                  >
                    <p className="text-xs font-mono uppercase tracking-widest opacity-70 mb-1">Prediction</p>
                    <div className="flex items-center gap-2">
                      <motion.span 
                        key={`emoji-${predictionDetails?.emoji}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl"
                      >
                        {predictionDetails?.emoji}
                      </motion.span>
                      <div>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-xl font-bold text-foreground"
                        >
                          {predictionDetails?.label}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                      Scenario Analysis (3 Outcomes)
                    </p>
                    <AnimatePresence mode="wait">
                      {analysisResult.state.scenarios.map((scenario, idx) => (
                        <motion.div
                          key={`scenario-${idx}-${scenario.probability}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="p-3 rounded-lg border border-border/50 bg-background/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-foreground">{scenario.name}</span>
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="text-sm font-bold text-primary"
                            >
                              {scenario.probability}%
                            </motion.span>
                          </div>
                          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mb-1">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${scenario.probability}%` }}
                              transition={{ duration: 0.8, delay: 0.5 + idx * 0.1 }}
                              className="h-full bg-primary"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">{scenario.description}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* ════════════ DETAILED METRICS ════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl border border-border bg-card/50"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">Trading Factors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Liquidity', value: analysisResult.state.liquidity, color: 'text-blue-400' },
                    { label: 'Volume', value: analysisResult.state.volume, color: 'text-green-400' },
                    { label: 'Momentum', value: analysisResult.state.momentum, color: 'text-purple-400' },
                    { label: 'Volatility', value: analysisResult.state.volatility, color: 'text-red-400' },
                  ].map((metric) => (
                    <motion.div 
                      key={`${metric.label}-${metric.value}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 rounded-lg bg-background/50 border border-border/50"
                    >
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{metric.label}</p>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className={`text-2xl font-bold ${metric.color}`}
                      >
                        {(metric.value * 100).toFixed(0)}%
                      </motion.div>
                      <div className="w-full h-1 bg-border rounded-full overflow-hidden mt-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value * 100}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full ${metric.color.replace('text-', 'bg-')}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ════════════ AI ANALYSIS ════════════ */}
              {showAI && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl border border-cyan-500/50 bg-cyan-500/10"
                  ref={aiResponseRef}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Brain size={20} className="text-cyan-400" />
                    <h3 className="text-lg font-bold text-cyan-400">AI Analysis</h3>
                  </div>

                  {aiLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="animate-spin">
                        <Zap size={16} />
                      </div>
                      <span>AI is thinking...</span>
                    </div>
                  )}

                  {aiResponse && !aiLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-sm leading-relaxed text-foreground whitespace-pre-wrap"
                    >
                      {aiResponse}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {!analysisResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <Zap size={48} className="mx-auto text-primary/40 mb-4" />
            <p className="text-muted-foreground font-mono text-sm">
              Click "Run IRP Analysis" to start the market simulation
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
